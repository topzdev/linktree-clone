<?php

use App\Http\Controllers\AppearanceController;
use App\Http\Controllers\ButtonsController;
use App\Http\Controllers\FontsController;
use App\Http\Controllers\LinksController;
use App\Http\Controllers\PreviewController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocialsController;
use App\Http\Controllers\ThemesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [UserController::class, 'index']);
    Route::post('/update-user', [UserController::class, 'updateUser']);
    Route::post('/change-password', [UserController::class, 'changePassword']);
    Route::post('/change-info', [UserController::class, 'updateAccountInfo']);
    Route::post('/delete-account', [UserController::class, 'deleteAccount']);
});

Route::middleware(['auth:sanctum'])->prefix('links')->controller(LinksController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::get('/{id}', 'show');
    Route::delete('/{id}', 'destroy');
    Route::post('/update/positions', 'updatePosition');
    Route::post('/update/{id}', 'update');
    Route::post('/update/{id}/thumbnail', 'updateThumbnail');
    Route::post('/update/{id}/toggle', 'toggle');
});

Route::middleware(['auth:sanctum'])->prefix('profile')->controller(ProfileController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/update/', 'update');
    Route::post('/update/avatar', 'updateAvatar');
    Route::delete('/remove/avatar', 'removeAvatar');
});

Route::middleware(['auth:sanctum'])->prefix('themes')->controller(ThemesController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/user', 'getOne');
    Route::post('/update', 'update');
    Route::post('/update/custom', 'updateCustomTheme');
});

Route::middleware(['auth:sanctum'])->prefix('buttons')->controller(ButtonsController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/update', 'update');
});

Route::middleware(['auth:sanctum'])->prefix('fonts')->controller(FontsController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/user', 'getOne');
    Route::post('/update', 'update');
});

Route::middleware(['auth:sanctum'])->prefix('socials')->controller(SocialsController::class)->group(function () {
    Route::get('/', 'all');
    Route::get('/user', 'index');
    Route::get('/{id}', 'getOne');
    Route::post('/', 'add');
    Route::delete('/{id}', 'destroy');
    Route::post('/update/position', 'updatePosition');
    Route::post('/update/visibility/{id}', 'updateVisibility');
    Route::post('/update/align', 'updateSocialAlignment');
    Route::post('/update/{id}', 'update');
});


Route::middleware(['auth:sanctum'])->prefix('appearance')->controller(AppearanceController::class)->group(function () {
    Route::get('/', 'getOne');
});


Route::prefix('preview')->controller(PreviewController::class)->group(function () {
    Route::get('/{username}', 'profile');
});

