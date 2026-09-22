import { useState, useEffect } from 'react';
import { Player, GameType, ScreenType } from './types';
import {
  getPlayers,
  getActivePlayer,
  updatePlayerScoreAndLevel,
} from './services/storage';
import { HeaderBar } from './components/HeaderBar';
import { RankingModal } from './components/RankingModal';
import { VictoriaModal } from './components/VictoriaModal';
import { InicioScreen } from './components/screens/InicioScreen';
import { GestionJugadoresScreen } from './components/screens/GestionJugadoresScreen';
import { PanelMinijuegosScreen } from './components/screens/PanelMinijuegosScreen';
import { NivelesScreen } from './components/screens/NivelesScreen';
import { FrasesVoFGame } from './components/screens/FrasesVoFGame';
import { IdentificaGame } from './components/screens/IdentificaGame';
import { PatronesGame } from './components/screens/PatronesGame';
import { AdivinaPalabraGame } from './components/screens/AdivinaPalabraGame';
import { RecuerdaGame } from './components/screens/RecuerdaGame';
import { AjustesScreen } from './components/screens/AjustesScreen';
import { TOTAL_LEVELS_COUNT } from './data/gamesData';

export function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('inicio');
  const [selectedGame, setSelectedGame] = useState<GameType>('frases_vof');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [rankingOpen, setRankingOpen] = useState<boolean>(false);

  // Victory modal state
  const [victoryState, setVictoryState] = useState<{
    isOpen: boolean;
    levelNumber: number;
    pointsEarned: number;
  }>({
    isOpen: false,
    levelNumber: 1,
    pointsEarned: 0,
  });

  const refreshPlayers = () => {
    const list = getPlayers();
    setPlayers(list);
    const act = getActivePlayer();
    setActivePlayer(act);
  };

  useEffect(() => {
    refreshPlayers();
  }, []);

  const handleSelectGame = (game: GameType) => {
    setSelectedGame(game);
    setCurrentScreen('niveles');
  };

  const handleSelectLevel = (level: number) => {
    setCurrentLevel(level);
    switch (selectedGame) {
      case 'frases_vof':
        setCurrentScreen('juego_frases_vof');
        break;
      case 'identifica':
        setCurrentScreen('juego_identifica');
        break;
      case 'patrones':
        setCurrentScreen('juego_patrones');
        break;
      case 'adivina_palabra':
        setCurrentScreen('juego_adivina');
        break;
      case 'recuerda':
        setCurrentScreen('juego_recuerda');
        break;
    }
  };

  const handleWin = (points: number) => {
    if (!activePlayer) return;

    let gameKey: 'FrasesVoF' | 'Identifica' | 'Patrones' | 'Adivina' | 'Recuerda' = 'FrasesVoF';
    switch (selectedGame) {
      case 'frases_vof':
        gameKey = 'FrasesVoF';
        break;
      case 'identifica':
        gameKey = 'Identifica';
        break;
      case 'patrones':
        gameKey = 'Patrones';
        break;
      case 'adivina_palabra':
        gameKey = 'Adivina';
        break;
      case 'recuerda':
        gameKey = 'Recuerda';
        break;
    }

    const updated = updatePlayerScoreAndLevel(activePlayer.id, gameKey, points, currentLevel);
    if (updated) {
      setActivePlayer(updated);
      setPlayers(getPlayers());
    }

    setVictoryState({
      isOpen: true,
      levelNumber: currentLevel,
      pointsEarned: points,
    });
  };

  const handleNextLevel = () => {
    setVictoryState(prev => ({ ...prev, isOpen: false }));
    const next = currentLevel + 1;
    if (next <= TOTAL_LEVELS_COUNT) {
      setCurrentLevel(next);
    } else {
      setCurrentScreen('niveles');
    }
  };

  const handleRepeatLevel = () => {
    setVictoryState(prev => ({ ...prev, isOpen: false }));
    // Force re-render of game screen by refreshing level
    const lvl = currentLevel;
    setCurrentLevel(0);
    setTimeout(() => setCurrentLevel(lvl), 50);
  };

  const handleReturnToLevels = () => {
    setVictoryState(prev => ({ ...prev, isOpen: false }));
    setCurrentScreen('niveles');
  };

  // Screen Title helper
  const getHeaderTitle = () => {
    switch (currentScreen) {
      case 'gestion_jugadores':
        return 'Gestión de Jugadores';
      case 'panel_minijuegos':
        return 'Minijuegos';
      case 'niveles':
        return 'Selección de Nivel';
      case 'juego_frases_vof':
        return 'Frases V o F';
      case 'juego_identifica':
        return 'Identifica';
      case 'juego_patrones':
        return 'Patrones';
      case 'juego_adivina':
        return 'Adivina la Palabra';
      case 'juego_recuerda':
        return 'Recuerda';
      case 'ajustes':
        return 'Ajustes';
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans select-none antialiased">
      <HeaderBar
        player={activePlayer}
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenRanking={() => setRankingOpen(true)}
        title={getHeaderTitle()}
      />

      <main className="flex-1">
        {currentScreen === 'inicio' && (
          <InicioScreen
            player={activePlayer}
            players={players}
            onNavigate={setCurrentScreen}
            onOpenRanking={() => setRankingOpen(true)}
          />
        )}

        {currentScreen === 'gestion_jugadores' && (
          <GestionJugadoresScreen
            players={players}
            activePlayer={activePlayer}
            onRefreshPlayers={refreshPlayers}
            onNavigate={setCurrentScreen}
            onOpenRanking={() => setRankingOpen(true)}
          />
        )}

        {currentScreen === 'panel_minijuegos' && (
          <PanelMinijuegosScreen
            player={activePlayer}
            onSelectGame={handleSelectGame}
            onNavigate={setCurrentScreen}
            onOpenRanking={() => setRankingOpen(true)}
          />
        )}

        {currentScreen === 'niveles' && (
          <NivelesScreen
            gameType={selectedGame}
            player={activePlayer}
            onSelectLevel={handleSelectLevel}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'juego_frases_vof' && currentLevel > 0 && (
          <FrasesVoFGame
            levelNumber={currentLevel}
            onWin={handleWin}
            onReturnToLevels={() => setCurrentScreen('niveles')}
          />
        )}

        {currentScreen === 'juego_identifica' && currentLevel > 0 && (
          <IdentificaGame
            levelNumber={currentLevel}
            onWin={handleWin}
            onReturnToLevels={() => setCurrentScreen('niveles')}
          />
        )}

        {currentScreen === 'juego_patrones' && currentLevel > 0 && (
          <PatronesGame
            levelNumber={currentLevel}
            onWin={handleWin}
            onReturnToLevels={() => setCurrentScreen('niveles')}
          />
        )}

        {currentScreen === 'juego_adivina' && currentLevel > 0 && (
          <AdivinaPalabraGame
            levelNumber={currentLevel}
            onWin={handleWin}
            onReturnToLevels={() => setCurrentScreen('niveles')}
          />
        )}

        {currentScreen === 'juego_recuerda' && currentLevel > 0 && (
          <RecuerdaGame
            levelNumber={currentLevel}
            onWin={handleWin}
            onReturnToLevels={() => setCurrentScreen('niveles')}
          />
        )}

        {currentScreen === 'ajustes' && (
          <AjustesScreen
            onNavigate={setCurrentScreen}
            onOpenRanking={() => setRankingOpen(true)}
          />
        )}
      </main>

      {/* Global Ranking Modal */}
      <RankingModal
        isOpen={rankingOpen}
        onClose={() => setRankingOpen(false)}
        players={players}
        activePlayerId={activePlayer?.id || ''}
      />

      {/* Global Victory Modal */}
      <VictoriaModal
        isOpen={victoryState.isOpen}
        levelNumber={victoryState.levelNumber}
        pointsEarned={victoryState.pointsEarned}
        onNextLevel={handleNextLevel}
        onRepeatLevel={handleRepeatLevel}
        onReturnToLevels={handleReturnToLevels}
        hasNextLevel={victoryState.levelNumber < TOTAL_LEVELS_COUNT}
      />
    </div>
  );
}

export default App;
