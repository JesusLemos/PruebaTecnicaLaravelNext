import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

const NoteList = () => {
    // ... (el resto de tu código, como useState y useEffect, es el mismo)
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ... (las funciones fetchNotes, useEffect y handleDelete son las mismas)
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
            setNotes(notes.filter(note => note.id !== id));
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    };


    if (loading) return <p className="text-center text-gray-500">Cargando notas...</p>;
    if (error) return <p className="text-center text-red-500">Error al cargar las notas: {error.message}</p>;

    return (
        <Container className="my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Notas</h2>
                <Button as={Link} to="/new" variant="primary">Nueva Nota</Button>
            </div>
            <Row xs={1} md={2} className="g-4">
                {notes.map(note => (
                    <Col key={note.id}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title>{note.title}</Card.Title>
                                <Card.Text>{note.content}</Card.Text>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button as={Link} to={`/edit/${note.id}`} variant="info" size="sm">
                                        Editar
                                    </Button>
                                    <Button onClick={() => handleDelete(note.id)} variant="danger" size="sm">
                                        Borrar
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default NoteList;