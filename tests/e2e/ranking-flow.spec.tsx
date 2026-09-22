import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../../src/App';
import { savePlayers, setActivePlayerId } from '../../src/services/storage';

describe('E2E: Ranking Leaderboard Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('opens ranking modal from header and displays sorted players', () => {
    savePlayers([
      {
        id: 'p1',
        nombre: 'Andrés',
        edad: 5,
        avatarColor: 'from-amber-400 to-orange-500',
        puntuacionFrasesVoF: 100,
        puntuacionIdentifica: 50,
        puntuacionPatrones: 0,
        puntuacionCadenaNum: 0,
        puntuacionMemo: 0,
        nivelFrasesVoF: 2,
        nivelIdentifica: 1,
        nivelPatrones: 1,
        nivelAdivina: 1,
        nivelRecuerda: 1,
        createdAt: Date.now(),
      },
      {
        id: 'p2',
        nombre: 'Lucía',
        edad: 6,
        avatarColor: 'from-purple-400 to-pink-500',
        puntuacionFrasesVoF: 250,
        puntuacionIdentifica: 150,
        puntuacionPatrones: 0,
        puntuacionCadenaNum: 0,
        puntuacionMemo: 0,
        nivelFrasesVoF: 4,
        nivelIdentifica: 1,
        nivelPatrones: 1,
        nivelAdivina: 1,
        nivelRecuerda: 1,
        createdAt: Date.now(),
      },
    ]);
    setActivePlayerId('p1');

    render(<App />);

    const rankingBtn = screen.getByTitle('Ranking de Jugadores');
    fireEvent.click(rankingBtn);

    // Modal should appear
    expect(screen.getByText('Ranking De Jugadores')).toBeDefined();
    expect(screen.getAllByText('Lucía').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/400\s*pts/).length).toBeGreaterThan(0); // Lucía: 250 + 150 = 400 pts
    expect(screen.getAllByText('Andrés').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/150\s*pts/).length).toBeGreaterThan(0); // Andrés: 100 + 50 = 150 pts

    // Close ranking modal
    const closeBtn = screen.getByText('Aceptar');
    fireEvent.click(closeBtn);
    expect(screen.queryByText('Ranking De Jugadores')).toBeNull();
  });
});
