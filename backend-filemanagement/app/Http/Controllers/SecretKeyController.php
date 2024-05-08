<?php

namespace App\Http\Controllers;

use App\Services\SecretKeyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\SecretKey;
use App\Services\AuthService;

class SecretKeyController extends Controller
{
    protected $authService;
    protected SecretKeyService $secretKeyService;

    public function __construct(AuthService $authService , SecretKeyService $secretKeyService)
    {
        $this->authService = $authService;
        $this->secretKeyService = $secretKeyService;
    }
    /**
     * 
     * @OA\Tag(
     *    name="Secret Keys",
     *   description="Endpoints for managing secret keys"
     * )
     */

    /**
     * @OA\Get(
     *     path="api/secret-keys",
     *    operationId="indexSecretKeys",
     *   tags={"Secret Keys"},
     * summary="List all secret keys",
     * description="Returns a list of all secret keys",
     * @OA\Parameter(
     *    name="perPage",
     *  in="query",
     * description="Number of items per page",
     * required=false,
     * @OA\Schema(type="integer")
     * ),
     * @OA\Response(
     *   response=200,
     * description="Successful operation",
     * )
     * )
     */

    public function index(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $user = $this->getUserOrFail($request);

        $secretKeys = $this->secretKeyService->index($request->all(), $perPage , ['user_id' => $user->id] ,[] , []);

        return response()->json($secretKeys, 200);
    }

    /**
     * @OA\Post(
     *     path="api/secret-keys/generate",
     *    operationId="generate SecretKey",
     * tags={"Secret Keys"},
     * summary="Generate a new secret key",
     * description="Generates a new secret key",
     * @OA\Response(
     *   response=200,
     * description="Secret key generated successfully",
    *
    * )
    * )
    */


    public function generate(Request $request)
    {
        $secretKey = Str::random(32);

        $user = $this->getUserOrFail($request);

        $data = ['secret_key' => $secretKey , 'user_id' => $user->id];

        $this->secretKeyService->store($data);

        return response()->json(['secret_key' => $secretKey], 200);
       
    }
    /**
     * @OA\Delete(
     *    path="api/secret-keys/{id}",
     *  operationId="destroySecretKey",
     * tags={"Secret Keys"},
     * summary="Delete a secret key",
     * description="Deletes a secret key",
     * @OA\Response(
     *   response=200,
     * description="Secret key deleted successfully",
     * )
     * )
     * 
     */

    public function destroy(Request $request, $id)
    {
        $secretKey = $this->secretKeyService->show($id);

        if (!$secretKey) {
            return response()->json(['message' => 'Secret key not found'], 404);
        }

        $user = $this->getUserOrFail($request);

        if ($user && $secretKey->user_id !== $user->id ) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $this->secretKeyService->destroy($id);

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
