<?php

use App\Http\Controllers\Auth\AuthController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route to get user information
Route::middleware('auth:api')->get('/me', function (Request $request) {
    return User::with('roles', 'permissions')->find(auth()->user()->id);
});

// Authentication routes
Route::group(['middleware' => 'api', 'prefix' => 'auth'], function () {
    Route::post('/login', [AuthController::class, 'store'])->name('login');
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');
    Route::post('/register', [AuthController::class, 'register']);
    
    // Forgot password routes
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    Route::post('/change-password', [AuthController::class, 'updatePassword']);
});
