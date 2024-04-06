<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\Models\SecretKey;

class AuthenticateWithApiOrSecretKey
{
    public function handle($request, Closure $next)
    {
        // Check if the user is authenticated via API token
        if (Auth::guard('api')->check()) {
            return $next($request); // User is authenticated via API token
        }

        // Check if the request contains a secret key
        $secretKey = $request->header('X-Secret-Key');

        if ($secretKey) {
            $user = SecretKey::where('secret_key', $secretKey)->first();

            if ($user) {
                Auth::login($user->user); 
                return $next($request); 
            }
        }

        return response()->json(['message' => 'Unauthenticated'], 401);
    }
}
