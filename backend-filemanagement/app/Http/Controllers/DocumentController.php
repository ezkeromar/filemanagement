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

    /**
     * @OA\Post(
     *      path="/api/documents/store",
     *      operationId="storeDocument",
     *      tags={"Documents"},
     *      summary="Upload a single document",
     *      description="Uploads a single document and returns the uploaded document details",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Document file to upload",
     *          @OA\MediaType(
     *              mediaType="multipart/form-data",
     *              @OA\Schema(
     *                  required={"file"},
     *                  @OA\Property(
     *                      property="file",
     *                      type="string",
     *                      format="binary"
     *                  )
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Document uploaded successfully",
     *          
     *      )
     * )
     */

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file',
        ]);

        $user = $this->getUserOrFail($request);

        $document = $this->createDocument($request->file('file'), $user);

        return response()->json(['message' => 'Document uploaded successfully', 'document' => $document], 200);
    }
    /**
     * @OA\Post(
     *      path="/api/documents/store-multiple",
     *      operationId="storeMultipleDocuments",
     *      tags={"Documents"},
     *      summary="Upload multiple documents",
     *      description="Uploads multiple documents and returns the uploaded documents details",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Array of document files to upload",
     *          @OA\MediaType(
     *              mediaType="multipart/form-data",
     *              @OA\Schema(
     *                  required={"files"},
     *                  @OA\Property(
     *                      property="files",
     *                      type="array",
     *                      @OA\Items(type="string", format="binary")
     *                  )
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Documents uploaded successfully",
     *          
     *      )
     * )
     */

    public function storeMultiple(Request $request): JsonResponse
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file',
        ]);

        $user = $this->getUserOrFail($request);

        $documents = [];

        foreach ($request->file('files') as $file) {
            $document = $this->createDocument($file, $user);
            $documents[] = $document;
        }

        return response()->json(['message' => 'Documents uploaded successfully', 'documents' => $documents], 200);
    }

    /**
     * @OA\Get(
     *      path="/api/documents",
     *      operationId="getDocuments",
     *      tags={"Documents"},
     *      summary="Get paginated list of user's documents",
     *      description="Returns a paginated list of documents belonging to the authenticated user",
     *      @OA\Parameter(
     *          name="perPage",
     *          in="query",
     *          description="Number of documents per page",
     *          required=false,
     *          @OA\Schema(type="integer", default=10)
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          
     *      )
     * )
     */


    public function index(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $user = $this->getUserOrFail($request);

        $documents = $user->documents()->paginate($perPage);

        return response()->json($documents, 200);
    }

    /**
     * @OA\Get(
     *      path="/api/documents/find/{id}",
     *      operationId="findDocumentById",
     *      tags={"Documents"},
     *      summary="Find document by ID",
     *      description="Returns a single document by its ID if the user owns it",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          description="ID of the document to retrieve",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Document found and returned",
     *          @OA\JsonContent(
     *              type="object",
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Document not found"
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Unauthorized to access the document"
     *      )
     * )
     */
    public function find($id, Request $request)
    {
        $document = Document::findOrFail($id);

        $this->checkOwnership($document, $request);

        return response()->json(['document' => $document], 200);
    }

    /**
     * @OA\Put(
     *      path="/documents/update/{id}",
     *      operationId="updateDocumentById",
     *      tags={"Documents"},
     *      summary="Update document by ID",
     *      description="Updates an existing document by its ID if the user owns it",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          description="ID of the document to update",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          description="New document file",
     *          @OA\MediaType(
     *              mediaType="multipart/form-data",
     *              @OA\Schema(
     *                  required={"file"},
     *                  @OA\Property(
     *                      property="file",
     *                      type="string",
     *                      format="binary"
     *                  )
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Document updated successfully",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="message", type="string", example="Document updated successfully"),
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Document not found"
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Unauthorized to update the document"
     *      )
     * )
     */

    public function update(Request $request, $id): JsonResponse
    {
        $document = Document::findOrFail($id);
        $this->checkOwnership($document, $request);

        $request->validate([
            'file' => 'required|file',
        ]);

        $this->deleteFile($document->path);
        $document = $this->updateDocument($request->file('file'), $document);

        return response()->json(['message' => 'Document updated successfully', 'document' => $document], 200);
    }

    /**
     * @OA\Delete(
     *      path="/documents/destroy/{id}",
     *      operationId="deleteDocumentById",
     *      tags={"Documents"},
     *      summary="Delete document by ID",
     *      description="Deletes an existing document by its ID if the user owns it",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          description="ID of the document to delete",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Document deleted successfully",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="message", type="string", example="Document deleted successfully")
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Document not found"
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Unauthorized to delete the document"
     *      )
     * )
     */

    public function destroy($id, Request $request)
    {
        $document = Document::findOrFail($id);
        $this->checkOwnership($document, $request);

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

        $width = request()->get('width', 300);
        $height = request()->get('height', 300);

        $mime = in_array($extension, $this->imageTypes) ? 'image/' . $extension : $file->getMimeType();

        $document = new Document();
        $document->name = $fileName;
        $document->user_id = $user->id;
        $document->path = str_replace('public/', '', $path);

        if (strpos($mime, 'image') !== false) {
            $image = Image::read(storage_path('app/' . $path));

            $image->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
            });

            $image->save(storage_path('app/' . $path), 100);
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

    private function checkOwnership($document, Request $request)
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
