<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Document;
use App\Services\AuthService;
use Intervention\Image\Laravel\Facades\Image;

class DocumentController extends Controller
{
    protected $authService;

    private $imageTypes = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'bmp',
        'webp',
        'tif',
        'tiff',
    ];
    

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function store(Request $request) : JsonResponse
    {
        $request->validate([
            'file' => 'required|file',
        ]);

        $user = $this->getUserOrFail($request);

        $document = $this->createDocument($request->file('file'), $user);

        return response()->json(['message' => 'Document uploaded successfully', 'document' => $document], 200);
    }

    public function index(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $user = $this->getUserOrFail($request);

        $documents = $user->documents()->paginate($perPage);

        return response()->json($documents, 200);
    }

    public function find($id , Request $request)
    {
        $document = Document::findOrFail($id);

        $this->checkOwnership($document , $request);

        return response()->json(['document' => $document], 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $document = Document::findOrFail($id);
        $this->checkOwnership($document , $request);

        $request->validate([
            'file' => 'required|file',
        ]);

        $this->deleteFile($document->path);
        $document = $this->updateDocument($request->file('file'), $document);

        return response()->json(['message' => 'Document updated successfully', 'document' => $document], 200);
    }

    public function destroy($id , Request $request)
    {
        $document = Document::findOrFail($id);
        $this->checkOwnership($document , $request);

        $this->deleteFile($document->path);
        $document->delete();

        return response()->json(['message' => 'Document deleted successfully'], 200);
    }

    private function createDocument($file, $user)
    {

        $size = $file->getSize();
        $path = $file->store('public/documents');
        $fileName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();

        $width = request()->get('width' , 300);
        $height = request()->get('height' , 300);
            
        $mime = in_array($extension, $this->imageTypes) ? 'image/'.$extension : $file->getMimeType();
        
        $document = new Document();
        $document->name = $fileName;
        $document->user_id = $user->id;
        $document->path = str_replace('public/', '', $path);

        if (strpos($mime, 'image') !== false) {
            $image = Image::read(storage_path('app/'.$path));

            $image->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
            });
    
            $image->save(storage_path('app/'.$path), 100);
        }
        
        $document->url = $this->generateUrl($path);
        $document->size = $size;
        $document->mime = $mime;
        $document->save();
    
        return $document;
    }

    private function updateDocument($file, $document)
    {
        $path = $file->store('public/documents');
        $fileName = $file->getClientOriginalName();

        $this->deleteFile($document->path);

        $document->path = $path;
        $document->name = $fileName;
        $document->url = $this->generateUrl($path);
        $document->save();

        return $document;
    }

    private function checkOwnership($document , Request $request)
    {
        $user = $this->getUserOrFail($request);

        if ($document->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
    }
    private function getUserOrFail(Request $request)
    {
        $user = $this->authService->getUser($request);

        if (!$user) {
            abort(401, 'Unauthenticated');
        }

        return $user;
    }

    private function deleteFile($path)
    {
        Storage::delete($path);
    }

    private function generateUrl($path)
    {
        return url(Storage::url($path));
    }
}
