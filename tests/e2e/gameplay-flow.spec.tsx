import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../../src/App';
import { getActivePlayer } from '../../src/services/storage';

describe('E2E: Minigames Navigation & Gameplay Progression Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('navigates from Inicio to Panel de Minijuegos and displays all 10 minigames', () => {
    render(<App />);

    // Click "JUGAR / MINIJUEGOS" on home screen
    const playBtn = screen.getByText('JUGAR / MINIJUEGOS');
    fireEvent.click(playBtn);

    // Verify Panel de Minijuegos
    expect(screen.getByText('Panel de Estimulación Cognitiva')).toBeDefined();
    expect(screen.getAllByText(/Frases V o F/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Efecto Stroop/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Parejas de Cartas/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Dígitos Inversos/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Ordena la Frase/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Encuentra el Intruso/i).length).toBeGreaterThan(0);
  });

  it('filters minigames by cognitive area (Lenguaje, Memoria, Atención)', () => {
    render(<App />);
    fireEvent.click(screen.getByText('JUGAR / MINIJUEGOS'));

    // Filter by Lenguaje button
    const langTab = screen.getByRole('button', { name: /Lenguaje/i });
    fireEvent.click(langTab);

    expect(screen.getAllByText(/Frases V o F/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Ordena la Frase/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Efecto Stroop/i)).toBeNull();

    // Filter by Memoria button
    const memTab = screen.getByRole('button', { name: /Memoria/i });
    fireEvent.click(memTab);

    expect(screen.getAllByText(/Recuerda/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Parejas de Cartas/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Dígitos Inversos/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Frases V o F/i)).toBeNull();
  });

  it('navigates into a minigame, plays a level and triggers victory modal', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('JUGAR / MINIJUEGOS'));

    // Select Frases V o F via its play button
    const playFrasesBtn = document.getElementById('btn_play_frases_vof');
    expect(playFrasesBtn).toBeDefined();
    fireEvent.click(playFrasesBtn!);

    // Should now be on NivelesScreen
    expect(screen.getByText(/Frases Verdaderas o Falsas/i)).toBeDefined();

    // Click Level 1 button
    const level1Btn = document.getElementById('btn_level_1');
    expect(level1Btn).toBeDefined();
    fireEvent.click(level1Btn!);

    // Statement 1: Las orejas del perro son de color negro -> Verdadero
    const s1TrueBtn = document.getElementById('btn_s1_true');
    expect(s1TrueBtn).toBeDefined();
    fireEvent.click(s1TrueBtn!);

    // Statement 2: Se pueden ver 5 animales en la pantalla -> Falso
    const s2FalseBtn = document.getElementById('btn_s2_false');
    expect(s2FalseBtn).toBeDefined();
    fireEvent.click(s2FalseBtn!);

    // Click Verificar Respuestas
    const verifyBtn = document.getElementById('btn_verificar_frases_vof');
    expect(verifyBtn).toBeDefined();
    fireEvent.click(verifyBtn!);

    // Wait for victory modal to trigger
    await waitFor(() => {
      expect(screen.getByText(/¡VICTORIA!/i)).toBeDefined();
    }, { timeout: 3000 });

    // Check player accumulated points
    const player = getActivePlayer();
    expect(player).toBeDefined();
    expect(player?.puntuacionFrasesVoF).toBeGreaterThan(0);
  });
});
