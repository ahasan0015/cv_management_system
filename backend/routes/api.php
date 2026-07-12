<?php

use App\Http\Controllers\Api\AttributeController;
use App\Http\Controllers\Api\AttributeTypeController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
    
// })->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
// Route::post('/attributes', [AttributeController::class, 'store']);
// Route::delete('/attributes/{id}', [AttributeController::class, 'destroy']);
// Route::put('/attributes/{id}', [AttributeController::class, 'update']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::middleware('auth:sanctum')->group(function () {
    Route::get('/attributes', [AttributeController::class, 'index']);
    Route::get('/attribute-types', [AttributeTypeController::class, 'index']);
    Route::post('/attributes', [AttributeController::class, 'store']);
    Route::put('/attributes/{id}', [AttributeController::class, 'update']);
    Route::delete('/attributes/{id}', [AttributeController::class, 'destroy']);
});
    
    Route::get('/user/profile', function (Request $request) {
        return $request->user();
        });
});
