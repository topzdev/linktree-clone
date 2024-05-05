<?php

use App\Http\Controllers\LinksController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [UserController::class, 'index']);
    Route::post('/update-user', [UserController::class, 'updateUser']);
});

Route::prefix('links')->controller(LinksController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::get('/{id}', 'show');
    Route::delete('/{id}', 'destroy');
    Route::post('/update/{id}', 'update');
    Route::post('/update/{id}/thumbnail', 'updateThumbnail');
})->middleware('auth:sanctum');

Route::prefix('profile')->controller(ProfileController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/update/', 'update');
    Route::post('/update/avatar', 'updateAvatar');
    Route::delete('/remove/avatar', 'removeAvatar');
})->middleware('auth:sanctum');
