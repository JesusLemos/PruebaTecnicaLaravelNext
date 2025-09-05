<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use App\Http\Resources\NoteResource;

class NoteController extends Controller
{
     public function index(Request $request)
    {
        $query = Note::query();

        if ($request->has('q')) {
        $query->where('title', 'like', '%' . $request->input('q') . '%');
        }
        $query->orderBy('created_at', 'desc');
        $notes = $query->paginate(10);
        return NoteResource::collection($notes);
    }



    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $note = Note::create($validatedData);

        return new NoteResource($note);
    }


    public function show(Note $note)
    {
        return new NoteResource($note);
    }

    public function update(Request $request, Note $note)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $note->update($validatedData);

        return new NoteResource($note);
    }

    public function destroy(Note $note)
    {
        $note->delete();

        return response()->noContent();
    }
}