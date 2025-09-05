import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <header className="p-3 bg-light border-bottom">
          <Container>
            <h1 className="mb-0">Notas</h1>
          </Container>
        </header>
        <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
          <Container>
            <Routes>
              <Route path="/" element={<NoteList />} />
              <Route path="/new" element={<NoteForm />} />
              <Route path="/edit/:id" element={<NoteForm />} />
            </Routes>
          </Container>
        </main>
      </div>
    </Router>
  );
}

export default App;