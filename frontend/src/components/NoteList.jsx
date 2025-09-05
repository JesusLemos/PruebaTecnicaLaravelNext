import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Row, Col, Card, Form, Pagination } from 'react-bootstrap';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchNotes = async (page = 1, searchQuery = '') => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost/api/notes`, {
                params: {
                    q: searchQuery,
                    page: page,
                },
            });
            setNotes(response.data.data);
            setTotalPages(response.data.meta.last_page);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes(page, query);
    }, [page, query]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset page to 1 on new search
        fetchNotes(1, query);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost/api/notes/${id}`);
            // Actualiza la lista de notas después de eliminar
            setNotes(notes.filter(note => note.id !== id));
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Cargando notas...</p>;
    if (error) return <p className="text-center text-red-500">Error al cargar las notas: {error.message}</p>;

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex justify-content-between align-items-center mb-4 w-100">
                <h2>Notas</h2>
                <Button as={Link} to="/new" variant="primary">Nueva Nota</Button>
            </div>

            <Form onSubmit={handleSearch} className="mb-4 w-100">
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por título..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Form.Group>
            </Form>

            <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center w-100">
                {notes.map(note => (
                    <Col key={note.id}>
                        <Card className="shadow card-fixed-width">
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

            <Pagination className="mt-4 justify-content-center">
                <Pagination.Prev onClick={() => setPage(page => Math.max(1, page - 1))} disabled={page === 1} />
                {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item key={i + 1} active={i + 1 === page} onClick={() => setPage(i + 1)}>
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setPage(page => Math.min(totalPages, page + 1))} disabled={page === totalPages} />
            </Pagination>
        </div>
    );
};

export default NoteList;