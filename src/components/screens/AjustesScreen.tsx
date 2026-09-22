import React, { useState } from 'react';
import { ScreenType } from '../../types';
import {
  Volume2,
  VolumeX,
  Music,
  Info,
  Trophy,
  ArrowLeft,
  RotateCcw,
  Heart,
  Shield,
  Sparkles,
  Play
} from 'lucide-react';
import {
  playClick,
  playCorrect,
  getSoundEnabled,
  setSoundEnabled,
  getMusicEnabled,
  setMusicEnabled,
  getSoundVolume,
  setSoundVolume,
  getMusicVolume,
  setMusicVolume,
  startMusic,
  stopMusic,
  MusicTheme,
} from '../../utils/sound';

interface AjustesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenRanking: () => void;
}

export const AjustesScreen: React.FC<AjustesScreenProps> = ({
  onNavigate,
  onOpenRanking,
}) => {
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const [musicOn, setMusicOn] = useState(getMusicEnabled());
  const [sfxVol, setSfxVol] = useState(Math.round(getSoundVolume() * 100));
  const [musicVol, setMusicVol] = useState(Math.round(getMusicVolume() * 100));
  const [selectedThemePreview, setSelectedThemePreview] = useState<MusicTheme>('menu');

  const [showAcercaDe, setShowAcercaDe] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playClick();
  };

  const toggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    setMusicEnabled(next);
    if (next) {
      startMusic(selectedThemePreview);
    } else {
      stopMusic();
    }
  };

  const handleSfxVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSfxVol(val);
    setSoundVolume(val / 100);
  };

  const handleMusicVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setMusicVol(val);
    setMusicVolume(val / 100);
  };

  const handlePlayThemePreview = (theme: MusicTheme) => {
    setSelectedThemePreview(theme);
    if (musicOn) {
      startMusic(theme);
    } else {
      setMusicOn(true);
      setMusicEnabled(true);
      startMusic(theme);
    }
  };

  const handleResetScores = () => {
    playClick();
    localStorage.removeItem('neurojuegos_players_v1');
    localStorage.removeItem('neurojuegos_active_player_v1');
    window.location.reload();
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-8 bg-[#131722] text-slate-100">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            id="btn_ajustes_back_inicio"
            onClick={() => { playClick(); onNavigate('inicio'); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C212E] hover:bg-[#252B3B] text-slate-200 font-bold text-xs sm:text-sm shadow-xs border border-slate-700 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Volver a Inicio</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Ajustes de la Aplicación
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
            Configuración y detalles sobre la plataforma
          </p>
        </div>

        {/* Settings Options Card */}
        <div className="bg-[#1C212E] rounded-3xl border border-slate-700/80 p-5 sm:p-6 shadow-xs space-y-5">
          {/* Section Heading: Audio */}
          <div className="flex items-center gap-2 pb-2 border-b border-slate-700/80">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-black text-slate-200 uppercase tracking-wider">
              Sonido y Música de Fondo
            </h2>
          </div>

          {/* Sound Effects (SFX) Block */}
          <div className="p-4 rounded-2xl bg-[#23293A] border border-slate-700 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  {soundOn ? <Volume2 className="w-5 h-5 text-emerald-400" /> : <VolumeX className="w-5 h-5 text-rose-400" />}
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-100 text-sm">Efectos de Sonido</h3>
                  <p className="text-xs text-slate-400 font-medium">Sonidos de acierto, error y clics</p>
                </div>
              </div>

              <button
                id="btn_toggle_sound_setting"
                onClick={toggleSound}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition active:scale-95 border cursor-pointer shrink-0 ${
                  soundOn
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-2xs'
                    : 'bg-slate-700 text-slate-300 border-slate-600'
                }`}
              >
                {soundOn ? 'ACTIVADO' : 'DESACTIVADO'}
              </button>
            </div>

            {soundOn && (
              <div className="pt-2 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full sm:w-2/3">
                  <span className="text-xs font-bold text-slate-300 shrink-0">Volumen:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sfxVol}
                    onChange={handleSfxVolumeChange}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-xs font-black text-amber-400 w-8 text-right">{sfxVol}%</span>
                </div>

                <button
                  onClick={() => { playCorrect(); }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs active:scale-95 transition cursor-pointer border border-amber-500/30"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Probar Sonido</span>
                </button>
              </div>
            )}
          </div>

          {/* Background Music (BGM) Block */}
          <div className="p-4 rounded-2xl bg-[#23293A] border border-slate-700 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <Music className={`w-5 h-5 ${musicOn ? 'text-amber-400' : 'text-slate-500'}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-100 text-sm">Música de Fondo por Juego</h3>
                  <p className="text-xs text-slate-400 font-medium">Melodías armónicas adaptadas a cada área</p>
                </div>
              </div>

              <button
                id="btn_toggle_music_setting"
                onClick={toggleMusic}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition active:scale-95 border cursor-pointer shrink-0 ${
                  musicOn
                    ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-500 shadow-2xs'
                    : 'bg-slate-700 text-slate-300 border-slate-600'
                }`}
              >
                {musicOn ? 'ACTIVADA' : 'DESACTIVADA'}
              </button>
            </div>

            {musicOn && (
              <div className="space-y-3 pt-2 border-t border-slate-700/80">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-300 shrink-0">Volumen Música:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={musicVol}
                    onChange={handleMusicVolumeChange}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-xs font-black text-amber-400 w-8 text-right">{musicVol}%</span>
                </div>

                {/* Theme selectors / preview */}
                <div>
                  <span className="text-xs font-bold text-slate-300 block mb-1.5">
                    Probar melodía de cada área cognitiva:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => handlePlayThemePreview('menu')}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer ${
                        selectedThemePreview === 'menu'
                          ? 'bg-amber-600 text-white border-amber-500 shadow-2xs'
                          : 'bg-[#1C212E] hover:bg-[#252B3B] text-slate-300 border-slate-700'
                      }`}
                    >
                      <Play className="w-3 h-3" />
                      <span>Menú General</span>
                    </button>

                    <button
                      onClick={() => handlePlayThemePreview('lenguaje')}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer ${
                        selectedThemePreview === 'lenguaje'
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-2xs'
                          : 'bg-[#1C212E] hover:bg-[#252B3B] text-slate-300 border-slate-700'
                      }`}
                    >
                      <Play className="w-3 h-3" />
                      <span>Lenguaje</span>
                    </button>

                    <button
                      onClick={() => handlePlayThemePreview('memoria')}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer ${
                        selectedThemePreview === 'memoria'
                          ? 'bg-purple-600 text-white border-purple-500 shadow-2xs'
                          : 'bg-[#1C212E] hover:bg-[#252B3B] text-slate-300 border-slate-700'
                      }`}
                    >
                      <Play className="w-3 h-3" />
                      <span>Memoria</span>
                    </button>

                    <button
                      onClick={() => handlePlayThemePreview('atencion')}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer ${
                        selectedThemePreview === 'atencion'
                          ? 'bg-rose-600 text-white border-rose-500 shadow-2xs'
                          : 'bg-[#1C212E] hover:bg-[#252B3B] text-slate-300 border-slate-700'
                      }`}
                    >
                      <Play className="w-3 h-3" />
                      <span>Atención</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section Heading: General */}
          <div className="flex items-center gap-2 pt-2 pb-1 border-b border-slate-700/80">
            <Info className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-black text-slate-200 uppercase tracking-wider">
              Información y Partidas
            </h2>
          </div>

          {/* Ranking Shortcut */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#23293A] border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-100 text-sm">Ranking de Jugadores</h3>
                <p className="text-xs text-slate-400 font-medium">Revisa las puntuaciones acumuladas de todos los niños</p>
              </div>
            </div>

            <button
              id="btn_open_ranking_from_ajustes"
              onClick={() => { playClick(); onOpenRanking(); }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs shadow-2xs transition cursor-pointer"
            >
              VER RANKING
            </button>
          </div>

          {/* About App */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#23293A] border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Info className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-100 text-sm">Acerca de la Plataforma</h3>
                <p className="text-xs text-slate-400 font-medium">Información clínica, educativa y créditos</p>
              </div>
            </div>

            <button
              id="btn_open_acerca_de"
              onClick={() => { playClick(); setShowAcercaDe(true); }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-100 font-bold text-xs shadow-2xs transition cursor-pointer border border-slate-600"
            >
              DETALLES
            </button>
          </div>

          {/* Reset Demo Data */}
          <div className="pt-2 border-t border-slate-700/80">
            {!resetConfirm ? (
              <button
                id="btn_request_reset_data"
                onClick={() => setResetConfirm(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#23293A] hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 font-bold text-xs transition border border-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restablecer datos y perfiles de prueba</span>
              </button>
            ) : (
              <div className="p-3 bg-rose-950/40 border border-rose-800/80 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-rose-300 font-bold">
                  ¿Seguro que deseas reiniciar todas las puntuaciones?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    id="btn_confirm_reset_yes"
                    onClick={handleResetScores}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-xs hover:bg-rose-700 cursor-pointer"
                  >
                    Sí, reiniciar
                  </button>
                  <button
                    id="btn_confirm_reset_no"
                    onClick={() => setResetConfirm(false)}
                    className="px-3 py-1.5 rounded-xl bg-slate-700 text-slate-200 font-bold text-xs hover:bg-slate-600 cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Acerca De Modal */}
        {showAcercaDe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-[#1C212E] border border-slate-700 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-8 max-h-[85vh] overflow-y-auto text-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-100">
                    Acerca de la Aplicación
                  </h2>
                  <span className="text-xs font-bold text-amber-400">
                    Desarrollado por Rafael Nicolas Espinosa Rodríguez
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                <p>
                  <strong className="text-slate-100">Descripción:</strong> Diseñada para acompañar a niños de 0 a 6 años con necesidades de estimulación del lenguaje y la memoria, fomentando habilidades comunicativas y cognitivas en un ambiente seguro y alegre.
                </p>

                <p>
                  La aplicación reúne 10 dinámicas interactivas orientadas a la comprensión verbal, retención nemotécnica, asociación lógica y atención selectiva, diseñadas con estímulos visuales limpios y amigables.
                </p>

                <div className="p-3.5 bg-[#23293A] rounded-2xl border border-slate-700">
                  <h4 className="font-extrabold text-amber-400 mb-1.5 flex items-center gap-1.5 text-xs sm:text-sm">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                    Principales Beneficios:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-medium">
                    <li>Estimulación y terapia lúdica del lenguaje y la memoria.</li>
                    <li>Desarrollo de la atención sostenida y secuenciación lógica.</li>
                    <li>Refuerzo positivo sin frustración con estrellas y niveles adaptativos.</li>
                    <li>Facilita la interacción guiada con padres y educadores.</li>
                  </ul>
                </div>
              </div>

              <button
                id="btn_close_acerca_de"
                onClick={() => { playClick(); setShowAcercaDe(false); }}
                className="mt-6 w-full py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm shadow-xs active:scale-[0.98] transition cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
