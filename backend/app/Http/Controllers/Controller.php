<?php

namespace App\Http\Controllers;

abstract class Controller
{
   public function check()
    {
        return response()->json([
            'message' => '¡Bienvenido a la API de notas!',
            'status' => 'ok'
        ]);
    }
}
