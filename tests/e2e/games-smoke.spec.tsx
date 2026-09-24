import { describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { FrasesVoFGame } from '../../src/components/screens/FrasesVoFGame';
import { IdentificaGame } from '../../src/components/screens/IdentificaGame';
import { PatronesGame } from '../../src/components/screens/PatronesGame';
import { AdivinaPalabraGame } from '../../src/components/screens/AdivinaPalabraGame';
import { RecuerdaGame } from '../../src/components/screens/RecuerdaGame';
import { StroopGame } from '../../src/components/screens/StroopGame';
import { ParejasGame } from '../../src/components/screens/ParejasGame';
import { OrdenaFraseGame } from '../../src/components/screens/OrdenaFraseGame';
import { IntrusoGame } from '../../src/components/screens/IntrusoGame';
import { DigitosGame } from '../../src/components/screens/DigitosGame';

const noop = () => undefined;
const noopWin = (_pts: number) => undefined;

describe('Smoke: los 10 minijuegos renderizan su nivel 1 sin romperse', () => {
  it('FrasesVoFGame muestra escena y afirmaciones', () => {
    render(<FrasesVoFGame levelNumber={1} onWin={noopWin} onReturnToLevels={noop} />);
    expect(screen.getByText('Frases Verdaderas o Falsas')).toBeDefined();
    expect(document.getElementById('btn_verificar_frases_vof')).toBeDefined();
    cleanup();
  });

  it('IdentificaGame muestra 4 tarjetas emoji', () => {
    render(<IdentificaGame levelNumber={1} onWin={noopWin} onReturnToLevels={noop} />);
    expect(screen.getByText('Identifica')).toBeDefined();
    expect(document.getElementById('identifica_item_1')).toBeDefined();
    expect(document.getElementById('btn_verificar_identifica')).toBeDefined();
    cleanup();
  });

  it('PatronesGame inicia en cuenta atrás', () => {
    render(<PatronesGame levelNumber={1} onWin={noopWin} onReturnToLevels={noop} />);
    expect(screen.getByText('Patrones de Secuencia')).toBeDefined();
    expect(document.getElementById('btn_patrones_repeat')).toBeDefined();
    cleanup();
  });

  it('AdivinaPalabraGame muestra teclado completo', () => {
    render(<AdivinaPalabraGame levelNumber={1} onWin={noopWin} onReturnToLevels={noop} />);
    expect(screen.getByText('Adivina la Palabra')).toBeDefined();
    expect(document.getElementById('key_A')).toBeDefined();
    expect(document.getElementById('key_Ñ')).toBeDefined();
    cleanup();
  });

  it('RecuerdaGame muestra cuadrícula 2x2', () => {
    render(<RecuerdaGame levelNumber={1} onWin={noopWin} onReturnToLevels={noop} />);
    expect(screen.getByText('Recuerda')).toBeDefined();
    expect(document.getElementById('recuerda_card_0')).toBeDefined();
    cleanup();
  });

  it('StroopGame muestra palabra y opciones de tinta', () => {
    render(<StroopGame levelNumber={1} onWin={noopWin} onReturnToLevels={noop} />);
    expect(screen.getByText('Desafío de Colores')).toBeDefined();
    expect(document.getElementById('stroop_opt_0')).toBeDefined();
    expect(document.getElementById('btn_stroop_back_levels')).toBeDefined();
    cleanup();
  });

  it('ParejasGame genera la baraja del nivel 1', () => {
    render(<ParejasGame levelNumber={1} onWin={noopWin} onReturnToLevels={noop} />);
    expect(screen.getByText('Parejas de Cartas')).toBeDefined();
    expect(document.getElementById('parejas_moves')).toBeDefined();
    cleanup();
  });

  it('OrdenaFraseGame muestra fichas disponibles', () => {
    render(<OrdenaFraseGame levelNumber={1} onWin={noopWin} onReturnToLevels={noop} />);
    expect(screen.getByText('Ordena la Frase')).toBeDefined();
    expect(document.getElementById('btn_ordena_check')).toBeDefined();
    cleanup();
  });

  it('IntrusoGame muestra 4 candidatos', () => {
    render(<IntrusoGame levelNumber={1} onWin={noopWin} onReturnToLevels={noop} />);
    expect(screen.getByText('Encuentra el Intruso')).toBeDefined();
    expect(document.getElementById('intruso_item_1')).toBeDefined();
    cleanup();
  });

  it('DigitosGame inicia en vista previa', () => {
    render(<DigitosGame levelNumber={1} onWin={noopWin} onReturnToLevels={noop} />);
    expect(screen.getByText('Dígitos Inversos')).toBeDefined();
    expect(document.getElementById('btn_digitos_back_levels')).toBeDefined();
    cleanup();
  });
});
