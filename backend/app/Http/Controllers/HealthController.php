<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Exception;

class HealthController extends Controller
{
    /**
     * Comprueba el estado de la conexión a la base de datos.
     */
    public function checkDb()
    {
        try {
            DB::connection()->getPdo();
            return response()->json(['db' => 'ok']);
        } catch (Exception $e) {
            return response()->json(['db' => 'error'], 500);
        }
    }
}