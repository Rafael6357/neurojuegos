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
import { WalkingDonutLoader } from './components/WalkingDonutLoader';
import { InicioScreen } from './components/screens/InicioScreen';
import { GestionJugadoresScreen } from './components/screens/GestionJugadoresScreen';
import { PanelMinijuegosScreen } from './components/screens/PanelMinijuegosScreen';
import { NivelesScreen } from './components/screens/NivelesScreen';
import { FrasesVoFGame } from './components/screens/FrasesVoFGame';
import { IdentificaGame } from './components/screens/IdentificaGame';
import { PatronesGame } from './components/screens/PatronesGame';
import { AdivinaPalabraGame } from './components/screens/AdivinaPalabraGame';
import { RecuerdaGame } from './components/screens/RecuerdaGame';
import { StroopGame } from './components/screens/StroopGame';
import { ParejasGame } from './components/screens/ParejasGame';
import { OrdenaFraseGame } from './components/screens/OrdenaFraseGame';
import { IntrusoGame } from './components/screens/IntrusoGame';
import { DigitosGame } from './components/screens/DigitosGame';
import { AjustesScreen } from './components/screens/AjustesScreen';
import { TOTAL_LEVELS_COUNT } from './data/gamesData';
import { startMusic } from './utils/sound';

export function App() {
  const isTest = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test';

  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('inicio');
  const [selectedGame, setSelectedGame] = useState<GameType>('frases_vof');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [rankingOpen, setRankingOpen] = useState<boolean>(false);

  // Simulated walking donut loading screens
  const [appLoading, setAppLoading] = useState<boolean>(!isTest);
  const [gameLoading, setGameLoading] = useState<boolean>(false);
  const [gameLoadingTitle, setGameLoadingTitle] = useState<string>('Cargando minijuego...');

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

  // Synchronize background music theme with current screen and minigame
  useEffect(() => {
    if (currentScreen === 'ajustes') {
      // Don't override user's manual preview in Ajustes
      return;
    }

    if (
      currentScreen === 'juego_frases_vof' ||
      currentScreen === 'juego_identifica' ||
      currentScreen === 'juego_adivina' ||
      currentScreen === 'juego_ordenar'
    ) {
      startMusic('lenguaje');
    } else if (
      currentScreen === 'juego_recuerda' ||
      currentScreen === 'juego_patrones' ||
      currentScreen === 'juego_parejas' ||
      currentScreen === 'juego_digitos'
    ) {
      startMusic('memoria');
    } else if (
      currentScreen === 'juego_stroop' ||
      currentScreen === 'juego_intruso'
    ) {
      startMusic('atencion');
    } else {
      startMusic('menu');
    }
  }, [currentScreen]);

  const handleSelectGame = (game: GameType) => {
    setSelectedGame(game);
    setCurrentScreen('niveles');
  };

  const handleSelectLevel = (level: number) => {
    setCurrentLevel(level);
    let targetScreen: ScreenType = 'juego_frases_vof';
    let gameTitle = 'Cargando minijuego...';

    switch (selectedGame) {
      case 'frases_vof':
        targetScreen = 'juego_frases_vof';
        gameTitle = 'Cargando Frases V o F...';
        break;
      case 'identifica':
        targetScreen = 'juego_identifica';
        gameTitle = 'Cargando Identifica...';
        break;
      case 'patrones':
        targetScreen = 'juego_patrones';
        gameTitle = 'Cargando Patrones...';
        break;
      case 'adivina_palabra':
        targetScreen = 'juego_adivina';
        gameTitle = 'Cargando Adivina la Palabra...';
        break;
      case 'recuerda':
        targetScreen = 'juego_recuerda';
        gameTitle = 'Cargando Recuerda...';
        break;
      case 'stroop':
        targetScreen = 'juego_stroop';
        gameTitle = 'Cargando Desafío Stroop...';
        break;
      case 'parejas':
        targetScreen = 'juego_parejas';
        gameTitle = 'Cargando Parejas de Cartas...';
        break;
      case 'ordenar':
        targetScreen = 'juego_ordenar';
        gameTitle = 'Cargando Ordena la Frase...';
        break;
      case 'intruso':
        targetScreen = 'juego_intruso';
        gameTitle = 'Cargando Encuentra el Intruso...';
        break;
      case 'digitos':
        targetScreen = 'juego_digitos';
        gameTitle = 'Cargando Dígitos Inversos...';
        break;
    }

    setCurrentScreen(targetScreen);
    if (!isTest) {
      setGameLoadingTitle(gameTitle);
      setGameLoading(true);
    }
  };

  const handleWin = (points: number) => {
    if (!activePlayer) return;

    let gameKey:
      | 'FrasesVoF'
      | 'Identifica'
      | 'Patrones'
      | 'Adivina'
      | 'Recuerda'
      | 'Stroop'
      | 'Parejas'
      | 'Ordenar'
      | 'Intruso'
      | 'Digitos' = 'FrasesVoF';

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
      case 'stroop':
        gameKey = 'Stroop';
        break;
      case 'parejas':
        gameKey = 'Parejas';
        break;
      case 'ordenar':
        gameKey = 'Ordenar';
        break;
      case 'intruso':
        gameKey = 'Intruso';
        break;
      case 'digitos':
        gameKey = 'Digitos';
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
      case 'juego_stroop':
        return 'Desafío de Colores';
      case 'juego_parejas':
        return 'Parejas de Cartas';
      case 'juego_ordenar':
        return 'Ordena la Frase';
      case 'juego_intruso':
        return 'Encuentra el Intruso';
      case 'juego_digitos':
        return 'Dígitos Inversos';
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

        {currentScreen === 'juego_stroop' && currentLevel > 0 && (
          <StroopGame
            levelNumber={currentLevel}
            onWin={handleWin}
            onReturnToLevels={() => setCurrentScreen('niveles')}
          />
        )}

        {currentScreen === 'juego_parejas' && currentLevel > 0 && (
          <ParejasGame
            levelNumber={currentLevel}
            onWin={handleWin}
            onReturnToLevels={() => setCurrentScreen('niveles')}
          />
        )}

        {currentScreen === 'juego_ordenar' && currentLevel > 0 && (
          <OrdenaFraseGame
            levelNumber={currentLevel}
            onWin={handleWin}
            onReturnToLevels={() => setCurrentScreen('niveles')}
          />
        )}

        {currentScreen === 'juego_intruso' && currentLevel > 0 && (
          <IntrusoGame
            levelNumber={currentLevel}
            onWin={handleWin}
            onReturnToLevels={() => setCurrentScreen('niveles')}
          />
        )}

        {currentScreen === 'juego_digitos' && currentLevel > 0 && (
          <DigitosGame
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

      {/* Simulated Walking Donut Loader for App Boot and Minigames */}
      {appLoading && (
        <WalkingDonutLoader
          message="Cargando el juego..."
          submessage="¡Preparando diversión y estimulación cognitiva!"
          duration={1300}
          onComplete={() => setAppLoading(false)}
        />
      )}

      {gameLoading && (
        <WalkingDonutLoader
          message={gameLoadingTitle}
          submessage="¡Preparando tu desafío cognitivo!"
          duration={900}
          onComplete={() => setGameLoading(false)}
        />
      )}
    </div>
  );
}

export default App;
