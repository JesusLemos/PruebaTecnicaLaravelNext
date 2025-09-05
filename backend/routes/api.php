<?php

use App\Http\Controllers\HealthController;
use App\Http\Controllers\NoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::apiResource('notes', NoteController::class);

Route::get('/health', [HealthController::class, 'checkDb']);