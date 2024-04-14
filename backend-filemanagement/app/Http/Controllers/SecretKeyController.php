<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\SecretKey;
use App\Services\AuthService;

class SecretKeyController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }
    public function index(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $user = $this->getUserOrFail($request);

        $secretKeys = $user->secretKeys()->paginate($perPage);

        return response()->json($secretKeys, 200);
    }

    public function generate(Request $request)
    {
        $secretKey = Str::random(32);

        $user = $this->getUserOrFail($request);

        $user->secretKeys()->create(['secret_key' => $secretKey]);

        return response()->json(['secret_key' => $secretKey], 200);
       
    }

    public function destroy(Request $request, $id)
    {
        $secretKey = SecretKey::find($id);

        if (!$secretKey) {
            return response()->json(['message' => 'Secret key not found'], 404);
        }

        $user = $this->getUserOrFail($request);

        if ($user && $secretKey->user_id !== $user->id ) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $secretKey->delete();

        return response()->json(['message' => 'Secret key deleted successfully'], 200);
    }
    private function getUserOrFail(Request $request)
    {
        $user = $this->authService->getUser($request);

        if (!$user) {
            abort(401, 'Unauthenticated');
        }

        return $user;
    }
}
