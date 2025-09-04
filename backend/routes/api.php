<?php

use App\Http\Controllers\HealthController;
use App\Http\Controllers\NoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Ruta de prueba
Route::get('/health', [HealthController::class, 'check']);

// Rutas del CRUD para las notas
Route::apiResource('notes', NoteController::class);