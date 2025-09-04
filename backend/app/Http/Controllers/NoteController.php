<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use App\Http\Resources\NoteResource;

class NoteController extends Controller
{
    /**
     * Listar todas las notas.
     */
     public function index(Request $request)
    {
        // 1. Inicia la consulta del modelo Note
        $query = Note::query();

        // 2. Lógica de búsqueda: Si hay un parámetro 'search' en la URL
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->input('search') . '%');
        }

        // 3. Lógica de ordenamiento: Ordena por 'created_at' descendente
        $query->orderBy('created_at', 'desc');

        // 4. Obtiene los resultados de forma paginada
        $notes = $query->paginate(10);
        
        // 5. Devuelve la colección de notas usando el recurso de la API
        return NoteResource::collection($notes);
    }


    /**
     * Crear una nueva nota.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $note = Note::create($validatedData);

        return new NoteResource($note);
    }

    /**
     * Mostrar una nota específica.
     */
    public function show(Note $note)
    {
        return new NoteResource($note);
    }

    /**
     * Actualizar una nota.
     */
    public function update(Request $request, Note $note)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $note->update($validatedData);

        return new NoteResource($note);
    }

    /**
     * Borrar una nota.
     */
    public function destroy(Note $note)
    {
        $note->delete();

        return response()->noContent();
    }
}