<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules;
use Illuminate\Routing\Middleware\ThrottleRequests;

class AuthController extends Controller
{
  public function store(LoginRequest $request): Response
  {
    $request->ensureIsNotRateLimited();

    $credentials = $request->only('email', 'password');

    if (!User::where('email', $credentials['email'])->first()) {
      throw ValidationException::withMessages([
        'email' => __('auth.failed'),
      ]);
    }

    if (!$token = auth()->attempt($credentials)) {
      RateLimiter::hit($request->throttleKey()); 

      throw ValidationException::withMessages([
        'email' => __('auth.failed'),
      ]);
    }
    RateLimiter::clear($request->throttleKey());

    return $this->respondWithToken($token);
  }

  /**
   * Log the user out of the application.
   */
  public function destroy(): Response
  {
    auth()->guard('api')->logout();

    return response(['message' => 'Déconnexion réussie']);
  }

  public function refresh(): Response
  {
    return $this->respondWithToken(auth()->refresh());
  }

  protected function respondWithToken(string $token): Response
  {
    $expires_at = auth("api")->factory()->getTTL() * 60;
    return response([
      "user" => auth()->user(),
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => $expires_at
    ]);
  }

  public function register(Request $request)
  {

    $validator = Validator::make($request->all(), [
      'name' => 'required|string|min:5|max:255',
      'email' => 'required|string|email|max:255|unique:users',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 402);
    }

    $data = [
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password ?? "password"),
    ];

    $user = User::create($data);
    return response()->json([
      'message' => 'You are successfully registered.',
      'user' => $user,
    ], 201);
  }

  public function updatePassword(Request $request): Response
  {

    $validator = Validator::make($request->all(), [
      'email' => ['required', 'email'],
      'current_password' => ['required'],
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 402);
    }


    if ($request->email != auth()->user()->email) {
      throw ValidationException::withMessages([
        'email' => ['L\'adresse email est incorrecte.'],
      ]);
    }

    $user = auth()->user();

    if (!Hash::check($request->current_password, $user->password)) {
      throw ValidationException::withMessages([
        'current_password' => ['Le mot de passe actuel est incorrect.'],
      ]);
    }

    $user->forceFill([
      'password' => Hash::make($request->password),
      'remember_token' => Str::random(60),
    ])->save();

    // logout user
    auth()->guard('api')->logout();
    return response(['message' => 'Déconnexion réussie']);
  }

  public function forgotPassword(Request $request)
  {
    $request->validate([
      'email' => ['required', 'email'],
    ]);

    // We will send the password reset link to this user. Once we have attempted
    // to send the link, we will examine the response then see the message we
    // need to show to the user. Finally, we'll send out a proper response.
    $status = Password::sendResetLink(
      $request->only('email')
    );

    if ($status != Password::RESET_LINK_SENT) {
      throw ValidationException::withMessages([
        'email' => [__($status)],
      ]);
    }

    return response()->json(['status' => __($status)]);
  }

  public function resetPassword(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'token' => ['required'],
      'email' => ['required', 'email'],
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 402);
    }
    
    $status = Password::reset(
      $request->only('email', 'password', 'password_confirmation', 'token'),
      function ($user) use ($request) {
        $user->forceFill([
          'password' => Hash::make($request->password),
          'remember_token' => Str::random(60),
        ])->save();

        event(new PasswordReset($user));
      }
    );

    if ($status != Password::PASSWORD_RESET) {
      throw ValidationException::withMessages([
        'email' => [__($status)],
      ]);
    }

    return response()->json(['status' => __($status)]);
  }
}