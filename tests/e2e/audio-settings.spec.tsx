import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../../src/App';
import {
  getSoundEnabled,
  getMusicEnabled,
  setSoundEnabled,
  setMusicEnabled,
} from '../../src/utils/sound';

describe('E2E: Audio & Music Settings Flow', () => {
  beforeEach(() => {
    localStorage.clear();
    setSoundEnabled(true);
    setMusicEnabled(true);
  });

  it('navigates to Ajustes screen from Header shortcut', () => {
    render(<App />);

    const settingsBtn = screen.getByTitle('Ajustes y Música');
    fireEvent.click(settingsBtn);

    expect(screen.getByText('Ajustes de la Aplicación')).toBeDefined();
    expect(screen.getByText('Sonido y Música de Fondo')).toBeDefined();
  });

  it('toggles sound effects and updates persistent state', () => {
    render(<App />);
    fireEvent.click(screen.getByTitle('Ajustes y Música'));

    const toggleSoundBtn = screen.getByText('ACTIVADO');
    fireEvent.click(toggleSoundBtn);

    expect(getSoundEnabled()).toBe(false);
    expect(screen.getByText('DESACTIVADO')).toBeDefined();

    // Toggle back on
    fireEvent.click(screen.getByText('DESACTIVADO'));
    expect(getSoundEnabled()).toBe(true);
    expect(screen.getByText('ACTIVADO')).toBeDefined();
  });

  it('toggles background music and preview options', () => {
    render(<App />);
    fireEvent.click(screen.getByTitle('Ajustes y Música'));

    const toggleMusicBtn = screen.getByText('ACTIVADA');
    fireEvent.click(toggleMusicBtn);

    expect(getMusicEnabled()).toBe(false);
    expect(screen.getByText('DESACTIVADA')).toBeDefined();

    // Re-enable and test theme preview buttons
    fireEvent.click(screen.getByText('DESACTIVADA'));
    expect(getMusicEnabled()).toBe(true);

    const lenguajeThemeBtn = screen.getByText('Lenguaje');
    fireEvent.click(lenguajeThemeBtn);
    expect(getMusicEnabled()).toBe(true);
  });
});
