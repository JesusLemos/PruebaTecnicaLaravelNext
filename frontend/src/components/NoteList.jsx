import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener las notas
    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost/api/notes');
            setNotes(response.data.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost/api/notes/${id}`);
            // Actualiza la lista de notas después de eliminar
            setNotes(notes.filter(note => note.id !== id));
        } catch (err) {
            setError(err);
        }
    };

    if (loading) return <p>Cargando notas...</p>;
    if (error) return <p>Error al cargar las notas: {error.message}</p>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Notas</h2>
                <Link to="/new" className="button">Nueva Nota</Link>
            </div>
            <ul>
                {notes.map(note => (
                    <li key={note.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Link to={`/edit/${note.id}`}>Editar</Link>
                            <button onClick={() => handleDelete(note.id)}>Borrar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;