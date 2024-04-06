<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\SecretKeyController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route to get user information
Route::middleware('auth')->get('/me', function (Request $request) {
    return User::with('roles', 'permissions')->find(auth()->user()->id);
});

Route::group(['middleware' => "api", 'prefix' => 'auth'], function () {
    Route::post('/login', [AuthController::class, 'store'])->name('login');
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

    // Forgot password routes
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    Route::post('/change-password', [AuthController::class, 'updatePassword']);
});

Route::group(['middleware' => ['auth'] ], function () {

    Route::group(['prefix' => 'secret-keys'], function () {
        Route::post('/generate', [SecretKeyController::class, 'generate']);
        Route::delete('/destroy/{id}', [SecretKeyController::class, 'destroy']);
        Route::get('/', [SecretKeyController::class, 'index']);
    });

    Route::group(['prefix' => 'documents'], function () {
        Route::post('/store', [DocumentController::class, 'store']);
        Route::get('/', [DocumentController::class, 'index']);
        Route::get('/find/{id}', [DocumentController::class, 'find']);
        Route::put('/update/{id}', [DocumentController::class, 'update']);
        Route::delete('/destroy/{id}', [DocumentController::class, 'destroy']);
    });


    
});
