<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Models\SecretKey;

class AuthService
{
    public static function getUser($request) {
        // Check if the request contains a secret key
        $secretKey = $request->header('X-Secret-Key');

        if ($secretKey ) {
            $user = SecretKey::where('secret_key', $secretKey)->first();

            if ($user) {
                return $user->user;
            }
           
        }
        else if (Auth::guard('api')->check()) {
            return Auth::user();
        }

        return null ;
    }
}
