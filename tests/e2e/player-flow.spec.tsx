import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../../src/App';
import { getPlayers, savePlayers, setActivePlayerId } from '../../src/services/storage';

describe('E2E: Player Profile & Session Management Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes default players and renders home screen', () => {
    render(<App />);

    expect(screen.getByText('JUGAR / MINIJUEGOS')).toBeDefined();
    expect(screen.getByText(/Estimulación de 0/i)).toBeDefined();

    const players = getPlayers();
    expect(players.length).toBeGreaterThan(0);
    expect(players[0].nombre).toBe('Mateo');
  });

  it('allows navigation to player management and creating a new player profile', () => {
    render(<App />);

    // Click on player management shortcut in HeaderBar
    const manageBtn = screen.getByTitle('Gestión de Jugadores');
    fireEvent.click(manageBtn);

    // Verify Player Management Screen is shown
    expect(screen.getAllByText('Gestión de Jugadores').length).toBeGreaterThan(0);
    const nameInput = document.getElementById('input_player_name') as HTMLInputElement;
    expect(nameInput).toBeDefined();

    // Fill form for new player
    fireEvent.change(nameInput, { target: { value: 'Valentina' } });

    const createBtn = screen.getByText('Registrar Jugador');
    fireEvent.click(createBtn);

    // Verify player is stored and displayed in player list
    const players = getPlayers();
    const val = players.find(p => p.nombre === 'Valentina');
    expect(val).toBeDefined();
    expect(screen.getAllByText('Valentina').length).toBeGreaterThan(0);
  });

  it('allows switching active player profile', () => {
    // Seed initial players
    savePlayers([
      {
        id: 'p1',
        nombre: 'Mateo',
        edad: 5,
        avatarColor: 'from-blue-400 to-indigo-500',
        puntuacionFrasesVoF: 50,
        puntuacionIdentifica: 0,
        puntuacionPatrones: 0,
        puntuacionCadenaNum: 0,
        puntuacionMemo: 40,
        nivelFrasesVoF: 2,
        nivelIdentifica: 1,
        nivelPatrones: 1,
        nivelAdivina: 1,
        nivelRecuerda: 1,
        createdAt: Date.now(),
      },
      {
        id: 'p2',
        nombre: 'Sofía',
        edad: 6,
        avatarColor: 'from-pink-400 to-rose-500',
        puntuacionFrasesVoF: 100,
        puntuacionIdentifica: 0,
        puntuacionPatrones: 0,
        puntuacionCadenaNum: 0,
        puntuacionMemo: 0,
        nivelFrasesVoF: 3,
        nivelIdentifica: 1,
        nivelPatrones: 1,
        nivelAdivina: 1,
        nivelRecuerda: 1,
        createdAt: Date.now(),
      }
    ]);
    setActivePlayerId('p1');

    render(<App />);

    // Switch to player management
    const manageBtn = screen.getByTitle('Gestión de Jugadores');
    fireEvent.click(manageBtn);

    // Select Sofía by player select button
    const selectSofiaBtn = document.getElementById('btn_select_player_p2');
    expect(selectSofiaBtn).toBeDefined();
    fireEvent.click(selectSofiaBtn!);

    // Verify active player header displays updated player
    expect(screen.getAllByText('Sofía').length).toBeGreaterThan(0);
  });
});
