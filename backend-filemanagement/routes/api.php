<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth',
  ], function () {
    Route::post('/login', [AuthController::class, 'store'])->name('login');
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');
    Route::post('/register', [AuthController::class, 'register']);
  
    // forgot password routes
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    Route::post('/change-password', [AuthController::class, 'updatePassword']);
  
  });
