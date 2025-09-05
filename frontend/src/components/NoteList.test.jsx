import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NoteList from './NoteList';
import { describe, it, vi, expect } from 'vitest';

vi.mock('axios', () => ({
    default: {
        get: vi.fn(() => new Promise(() => { })),
    },
}));

describe('NoteList Component', () => {
    it('renders the loading state initially', () => {
        render(
            <Router>
                <NoteList />
            </Router>
        );


        const loadingMessage = screen.getByText(/Cargando notas.../i);

        // Espera que el texto de carga esté en el documento
        expect(loadingMessage).toBeInTheDocument();
    });
});