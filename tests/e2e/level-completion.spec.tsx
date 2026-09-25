import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createPlayer, updatePlayerScoreAndLevel, getGameLevel } from '../../src/services/storage';
import { getLevelCount } from '../../src/data/gamesData';
import { NivelesScreen } from '../../src/components/screens/NivelesScreen';
import { shuffleArray } from '../../src/utils/shuffle';

const noop = () => undefined;
const noopLevel = (_n: number) => undefined;

describe('Niveles reales: completar el último nivel marca el juego como terminado', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('desbloquea count+1 al completar el último nivel (parejas: 3 niveles)', () => {
    const p = createPlayer('Test', 5);
    const total = getLevelCount('parejas');
    expect(total).toBe(3);

    updatePlayerScoreAndLevel(p.id, 'parejas', 3, 1);
    updatePlayerScoreAndLevel(p.id, 'parejas', 4, 2);
    const done = updatePlayerScoreAndLevel(p.id, 'parejas', 5, 3);
    expect(done).toBeDefined();
    expect(getGameLevel(done, 'parejas')).toBe(total + 1);
  });

  it('NivelesScreen muestra 3 de 3 estrellas y ningún nodo Actual', () => {
    const p = createPlayer('Test', 5);
    updatePlayerScoreAndLevel(p.id, 'parejas', 3, 1);
    updatePlayerScoreAndLevel(p.id, 'parejas', 4, 2);
    const done = updatePlayerScoreAndLevel(p.id, 'parejas', 5, 3);

    render(
      <NivelesScreen gameType="parejas" player={done} onSelectLevel={noopLevel} onNavigate={noop} />
    );
    // El texto está repartido en varios nodos: se verifica el contenido total.
    const bodyText = document.body.textContent || '';
    expect(bodyText).toContain('3 de 3');
    expect(bodyText).toContain('estrellas conquistadas');
    expect(screen.queryByText('Actual')).toBeNull();
  });

  it('repetir un nivel anterior no revierte el 100% completado', () => {
    const p = createPlayer('Test', 5);
    updatePlayerScoreAndLevel(p.id, 'parejas', 3, 1);
    updatePlayerScoreAndLevel(p.id, 'parejas', 4, 2);
    updatePlayerScoreAndLevel(p.id, 'parejas', 5, 3);
    const replay = updatePlayerScoreAndLevel(p.id, 'parejas', 3, 1);
    expect(getGameLevel(replay, 'parejas')).toBe(4);
  });
});

describe('Mezcla anti-patrones: shuffleArray conserva elementos y varía el orden', () => {
  it('devuelve los mismos elementos sin mutar el original', () => {
    const original = ['a', 'b', 'c', 'd', 'e'];
    const shuffled = shuffleArray(original);
    expect([...shuffled].sort()).toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(original).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  it('produce al menos dos órdenes distintos en varios intentos', () => {
    const orders = new Set(
      Array.from({ length: 12 }, () => shuffleArray([1, 2, 3, 4]).join(','))
    );
    expect(orders.size).toBeGreaterThan(1);
  });
});
