import { useState, useEffect } from 'react';
import { Player, GameType, ScreenType } from './types';
import {
  getPlayers,
  getActivePlayer,
  updatePlayerScoreAndLevel,
  resetAllData,
} from './services/storage';
import { HeaderBar } from './components/HeaderBar';
import { BottomNav } from './components/BottomNav';
import { RankingModal } from './components/RankingModal';
import { VictoriaModal } from './components/VictoriaModal';
import { CosmicLoader } from './components/CosmicLoader';
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
import { GAMES_META, getLevelCount } from './data/gamesData';
import { startMusic, stopMusic } from './utils/sound';
import { CosmicBackground } from './components/ui/CosmicBackground';

const LOADING_TITLES: Record<GameType, string> = {
  frases_vof: 'Cargando Frases V o F...',
  identifica: 'Cargando Identifica...',
  patrones: 'Cargando Patrones...',
  adivina_palabra: 'Cargando Adivina la Palabra...',
  recuerda: 'Cargando Recuerda...',
  stroop: 'Cargando Desafío Stroop...',
  parejas: 'Cargando Parejas de Cartas...',
  ordenar: 'Cargando Ordena la Frase...',
  intruso: 'Cargando Encuentra el Intruso...',
  digitos: 'Cargando Dígitos Inversos...',
};

const STATIC_TITLES: Partial<Record<ScreenType, string>> = {
  gestion_jugadores: 'Gestión de Jugadores',
  panel_minijuegos: 'Minijuegos',
  niveles: 'Selección de Nivel',
  ajustes: 'Ajustes',
};

export function App() {
  const isTest = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test';

  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('inicio');
  const [selectedGame, setSelectedGame] = useState<GameType>('frases_vof');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [rankingOpen, setRankingOpen] = useState<boolean>(false);
  /** Clave de sesión: remontar el juego garantiza estado fresco sin hacks de timing. */
  const [sessionKey, setSessionKey] = useState<number>(0);

  // Simulated cosmic loading screens
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
      // Stop theme music so Ajustes previews play clean (no bleed).
      stopMusic();
      return;
    }

    if (currentScreen.startsWith('juego_')) {
      const area = GAMES_META[selectedGame].area;
      startMusic(area);
    } else {
      startMusic('menu');
    }
  }, [currentScreen, selectedGame]);

  const handleSelectGame = (game: GameType) => {
    setSelectedGame(game);
    setCurrentScreen('niveles');
  };

  const handleSelectLevel = (level: number) => {
    setCurrentLevel(level);
    setSessionKey(k => k + 1);
    setCurrentScreen(GAMES_META[selectedGame].screen);
    if (!isTest) {
      setGameLoadingTitle(LOADING_TITLES[selectedGame]);
      setGameLoading(true);
    }
  };

  const handleWin = (points: number) => {
    if (!activePlayer) return;

    const updated = updatePlayerScoreAndLevel(activePlayer.id, selectedGame, points, currentLevel);
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
    if (next <= getLevelCount(selectedGame)) {
      setCurrentLevel(next);
      setSessionKey(k => k + 1);
    } else {
      setCurrentScreen('niveles');
    }
  };

  const handleRepeatLevel = () => {
    setVictoryState(prev => ({ ...prev, isOpen: false }));
    // Fresh remount: deterministic, no timing hacks.
    setSessionKey(k => k + 1);
  };

  const handleReturnToLevels = () => {
    setVictoryState(prev => ({ ...prev, isOpen: false }));
    setCurrentScreen('niveles');
  };

  const handleResetData = () => {
    resetAllData();
    refreshPlayers();
    setSelectedGame('frases_vof');
    setCurrentLevel(1);
    setCurrentScreen('inicio');
  };

  // Screen Title helper
  const getHeaderTitle = (): string | undefined => {
    if (currentScreen.startsWith('juego_')) {
      const meta = Object.values(GAMES_META).find(m => m.screen === currentScreen);
      return meta?.title;
    }
    return STATIC_TITLES[currentScreen];
  };

  const gameKey = `${currentScreen}-${selectedGame}-${currentLevel}-${sessionKey}`;

  // Stitch tab bar: visible on hub screens, hidden inside games for full play area.
  const showTabs = !currentScreen.startsWith('juego_');

  return (
    <div className="min-h-screen bg-[#070b1d] flex flex-col font-sans select-none antialiased">
      <HeaderBar
        player={activePlayer}
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenRanking={() => setRankingOpen(true)}
        title={getHeaderTitle()}
      />

      <main className={`flex-1 ${showTabs ? 'pb-24' : ''}`}>
        {currentScreen === 'inicio' && (
          <InicioScreen
            player={activePlayer}
            players={players}
            onNavigate={setCurrentScreen}
            onOpenRanking={() => setRankingOpen(true)}
            onQuickPlay={handleSelectGame}
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
          <CosmicBackground>
            <FrasesVoFGame
              key={gameKey}
              levelNumber={currentLevel}
              onWin={handleWin}
              onReturnToLevels={() => setCurrentScreen('niveles')}
            />
          </CosmicBackground>
        )}

        {currentScreen === 'juego_identifica' && currentLevel > 0 && (
          <CosmicBackground>
            <IdentificaGame
              key={gameKey}
              levelNumber={currentLevel}
              onWin={handleWin}
              onReturnToLevels={() => setCurrentScreen('niveles')}
            />
          </CosmicBackground>
        )}

        {currentScreen === 'juego_patrones' && currentLevel > 0 && (
          <CosmicBackground>
            <PatronesGame
              key={gameKey}
              levelNumber={currentLevel}
              onWin={handleWin}
              onReturnToLevels={() => setCurrentScreen('niveles')}
            />
          </CosmicBackground>
        )}

        {currentScreen === 'juego_adivina' && currentLevel > 0 && (
          <CosmicBackground>
            <AdivinaPalabraGame
              key={gameKey}
              levelNumber={currentLevel}
              onWin={handleWin}
              onReturnToLevels={() => setCurrentScreen('niveles')}
            />
          </CosmicBackground>
        )}

        {currentScreen === 'juego_recuerda' && currentLevel > 0 && (
          <CosmicBackground>
            <RecuerdaGame
              key={gameKey}
              levelNumber={currentLevel}
              onWin={handleWin}
              onReturnToLevels={() => setCurrentScreen('niveles')}
            />
          </CosmicBackground>
        )}

        {currentScreen === 'juego_stroop' && currentLevel > 0 && (
          <CosmicBackground>
            <StroopGame
              key={gameKey}
              levelNumber={currentLevel}
              onWin={handleWin}
              onReturnToLevels={() => setCurrentScreen('niveles')}
            />
          </CosmicBackground>
        )}

        {currentScreen === 'juego_parejas' && currentLevel > 0 && (
          <CosmicBackground>
            <ParejasGame
              key={gameKey}
              levelNumber={currentLevel}
              onWin={handleWin}
              onReturnToLevels={() => setCurrentScreen('niveles')}
            />
          </CosmicBackground>
        )}

        {currentScreen === 'juego_ordenar' && currentLevel > 0 && (
          <CosmicBackground>
            <OrdenaFraseGame
              key={gameKey}
              levelNumber={currentLevel}
              onWin={handleWin}
              onReturnToLevels={() => setCurrentScreen('niveles')}
            />
          </CosmicBackground>
        )}

        {currentScreen === 'juego_intruso' && currentLevel > 0 && (
          <CosmicBackground>
            <IntrusoGame
              key={gameKey}
              levelNumber={currentLevel}
              onWin={handleWin}
              onReturnToLevels={() => setCurrentScreen('niveles')}
            />
          </CosmicBackground>
        )}

        {currentScreen === 'juego_digitos' && currentLevel > 0 && (
          <CosmicBackground>
            <DigitosGame
              key={gameKey}
              levelNumber={currentLevel}
              onWin={handleWin}
              onReturnToLevels={() => setCurrentScreen('niveles')}
            />
          </CosmicBackground>
        )}

        {currentScreen === 'ajustes' && (
          <AjustesScreen
            onNavigate={setCurrentScreen}
            onOpenRanking={() => setRankingOpen(true)}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Global bottom tab bar (Stitch navigation) */}
      {showTabs && !appLoading && (
        <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}

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
        hasNextLevel={victoryState.levelNumber < getLevelCount(selectedGame)}
      />

      {/* Simulated Cosmic Loader for App Boot and Minigames */}
      {appLoading && (
        <CosmicLoader
          message="Cargando el juego..."
          submessage="¡Preparando diversión y estimulación cognitiva!"
          duration={1300}
          onComplete={() => setAppLoading(false)}
        />
      )}

      {gameLoading && (
        <CosmicLoader
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
