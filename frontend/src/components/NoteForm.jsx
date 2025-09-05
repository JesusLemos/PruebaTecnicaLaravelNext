import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NoteForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (id) {
            // Si el ID existe, estamos en modo edición
            const fetchNote = async () => {
                try {
                    const response = await axios.get(`http://localhost/api/notes/${id}`);
                    setTitle(response.data.data.title);
                    setContent(response.data.data.content);
                } catch (err) {
                    console.error("Error al cargar la nota", err);
                }
            };
            fetchNote();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const noteData = { title, content };

        try {
            if (id) {
                // Modo edición (PUT)
                await axios.put(`http://localhost/api/notes/${id}`, noteData);
            } else {
                // Modo creación (POST)
                await axios.post('http://localhost/api/notes', noteData);
            }
            navigate('/'); // Vuelve al listado de notas
        } catch (err) {
            console.error("Error al guardar la nota", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? 'Editar Nota' : 'Crear Nueva Nota'}</h2>
            <div>
                <label>Título (requerido)</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Contenido</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => navigate('/')}>Cancelar</button>
        </form>
    );
};

export default NoteForm;