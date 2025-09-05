import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>Notas</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<NoteList />} />
            <Route path="/new" element={<NoteForm />} />
            <Route path="/edit/:id" element={<NoteForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;