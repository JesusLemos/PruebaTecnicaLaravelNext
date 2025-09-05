<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NoteApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_note_can_be_created_through_the_api()
    {
        // Datos de la nueva nota
        $noteData = [
            'title' => 'Mi nota de prueba',
            'content' => 'Contenido de la nota de prueba.',
        ];

        $response = $this->postJson('/api/notes', $noteData);

        $response->assertStatus(201);
        
        $this->assertDatabaseHas('notes', [
            'title' => 'Mi nota de prueba',
            'content' => 'Contenido de la nota de prueba.',
        ]);
    }
}