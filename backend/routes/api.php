<?php

use App\Http\Controllers\Api\AttributeController;
use App\Http\Controllers\Api\AttributeTypeController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CandidateProfileController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PositionController;
use App\Http\Controllers\Api\ProjectController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// --- Public Routes ---
Route::post('/login', [AuthController::class, 'login']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/attributes', [AttributeController::class, 'index']);
Route::get('/attribute-types', [AttributeTypeController::class, 'index']);

// Position routes
Route::apiResource('positions', PositionController::class);
Route::post('positions/{id}/duplicate', [PositionController::class, 'duplicate']);


// --- Authenticated Routes (Sanctum Group) ---
Route::middleware('auth:sanctum')->group(function () {
    // Logout
    Route::post('/logout', [AuthController::class, 'logout']); 
    
    // User Profile 
    Route::get('/user/profile', function (Request $request) {
        return $request->user();
    });

    // Attributes Management
    Route::post('/attributes', [AttributeController::class, 'store']);
    Route::put('/attributes/{id}', [AttributeController::class, 'update']);
    Route::delete('/attributes/{id}', [AttributeController::class, 'destroy']);

    // Profile Routes
    Route::get('/candidate/profile', [CandidateProfileController::class, 'show']);
    Route::put('/candidate/profile', [CandidateProfileController::class, 'update']);

    // Projects CRUD Routes 
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
});