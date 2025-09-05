import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const NoteForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (id) {
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
                await axios.put(`http://localhost/api/notes/${id}`, noteData);
            } else {
                await axios.post('http://localhost/api/notes', noteData);
            }
            navigate('/');
        } catch (err) {
            console.error("Error al guardar la nota", err);
        }
    };

    return (
        <Container className="my-4">
            <h2>{id ? 'Editar Nota' : 'Crear Nueva Nota'}</h2>
            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Título (requerido)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Introduce el título de la nota"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicContent">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Escribe el contenido de la nota"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>

                <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => navigate('/')} className="me-2">
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default NoteForm;