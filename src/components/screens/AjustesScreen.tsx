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
  Play,
  TriangleAlert,
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
import { CosmicBackground } from '../ui/CosmicBackground';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Mascot } from '../ui/Mascot';
import { Modal } from '../ui/Modal';

interface AjustesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenRanking: () => void;
  onResetData: () => void;
}

const THEME_PREVIEWS: { id: MusicTheme; label: string; activeClass: string }[] = [
  { id: 'menu', label: 'Menú General', activeClass: 'bg-teal-300 text-indigo-950 border-teal-200' },
  { id: 'lenguaje', label: 'Lenguaje', activeClass: 'bg-teal-300 text-indigo-950 border-teal-200' },
  { id: 'memoria', label: 'Memoria', activeClass: 'bg-violet-300 text-indigo-950 border-violet-200' },
  { id: 'atencion', label: 'Atención', activeClass: 'bg-amber-300 text-indigo-950 border-amber-200' },
];

function ChunkySwitch({ id, on, onToggle, label }: { id: string; on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={`relative w-14 h-8 rounded-full transition-colors shrink-0 cursor-pointer border ${
        on ? 'bg-teal-400 border-teal-200 shadow-[0_0_12px_rgba(45,212,191,0.5)]' : 'bg-white/10 border-white/20'
      }`}
    >
      <span
        className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-all ${
          on ? 'left-7' : 'left-1'
        }`}
      />
    </button>
  );
}

export const AjustesScreen: React.FC<AjustesScreenProps> = ({
  onNavigate,
  onOpenRanking,
  onResetData,
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
    setResetConfirm(false);
    onResetData();
  };

  return (
    <CosmicBackground>
      <div className="max-w-2xl mx-auto space-y-5 p-4 sm:p-6">
        <div className="text-center">
          <Badge tone="teal" className="mb-2">Ajustes de la Nave</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-50 tracking-tight">
            Ajustes de la Aplicación
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
            Calibra el audio y gestiona la misión
          </p>
        </div>

        <div className="flex items-center justify-start">
          <button
            id="btn_ajustes_back_inicio"
            onClick={() => { playClick(); onNavigate('inicio'); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-slate-100 font-bold text-xs sm:text-sm border border-white/15 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-300" />
            <span>Volver a Inicio</span>
          </button>
        </div>

        {/* Cabina de Audio Estelar */}
        <Card className="p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Music className="w-4 h-4 text-teal-200" />
            <h2 className="text-xs font-black text-slate-200 uppercase tracking-wider">
              Sonido y Música de Fondo
            </h2>
          </div>

          {/* SFX */}
          <div className="p-4 rounded-3xl bg-black/30 border border-white/10 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-2xl bg-teal-400/10 text-teal-200 border border-teal-400/30 shrink-0">
                  {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-50 text-sm">Efectos de Sonido (SFX)</h3>
                  <button
                    onClick={toggleSound}
                    className="text-xs text-slate-400 font-semibold cursor-pointer text-left hover:text-slate-200 transition"
                  >
                    <span>{soundOn ? 'ACTIVADO' : 'DESACTIVADO'}</span> • Aciertos, errores y clics
                  </button>
                </div>
              </div>
              <ChunkySwitch id="btn_toggle_sound_setting" on={soundOn} onToggle={toggleSound} label="Efectos de sonido" />
            </div>

            {soundOn && (
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <label htmlFor="sfx_volume_range" className="text-xs font-bold text-slate-300 shrink-0">Intensidad SFX:</label>
                  <input
                    id="sfx_volume_range"
                    type="range"
                    min="0"
                    max="100"
                    value={sfxVol}
                    onChange={handleSfxVolumeChange}
                    className="w-full accent-teal-300 cursor-pointer"
                  />
                  <span className="text-xs font-black text-teal-200 w-10 text-right">{sfxVol}%</span>
                </div>
                <button
                  id="btn_test_sound"
                  onClick={() => { playCorrect(); }}
                  className="mt-2.5 px-4 py-2 rounded-full bg-teal-400/10 hover:bg-teal-400/20 text-teal-200 font-bold text-xs flex items-center gap-1.5 active:scale-95 transition cursor-pointer border border-teal-400/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Probar Sonido</span>
                </button>
              </div>
            )}
          </div>

          {/* BGM */}
          <div className="p-4 rounded-3xl bg-black/30 border border-white/10 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-2xl bg-violet-400/10 text-violet-200 border border-violet-400/30 shrink-0">
                  <Music className={`w-5 h-5 ${musicOn ? '' : 'text-slate-500'}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-50 text-sm">Música Cósmica (BGM)</h3>
                  <button
                    onClick={toggleMusic}
                    className="text-xs text-slate-400 font-semibold cursor-pointer text-left hover:text-slate-200 transition"
                  >
                    <span>{musicOn ? 'ACTIVADA' : 'DESACTIVADA'}</span> • Melodías por área cerebral
                  </button>
                </div>
              </div>
              <ChunkySwitch id="btn_toggle_music_setting" on={musicOn} onToggle={toggleMusic} label="Música de fondo" />
            </div>

            {musicOn && (
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <label htmlFor="music_volume_range" className="text-xs font-bold text-slate-300 shrink-0">Volumen Música:</label>
                  <input
                    id="music_volume_range"
                    type="range"
                    min="0"
                    max="100"
                    value={musicVol}
                    onChange={handleMusicVolumeChange}
                    className="w-full accent-violet-300 cursor-pointer"
                  />
                  <span className="text-xs font-black text-violet-200 w-10 text-right">{musicVol}%</span>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-300 block mb-1.5">
                    Probar melodía:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {THEME_PREVIEWS.map(t => (
                      <button
                        key={t.id}
                        id={`btn_preview_theme_${t.id}`}
                        onClick={() => handlePlayThemePreview(t.id)}
                        aria-pressed={selectedThemePreview === t.id}
                        className={`p-2 rounded-full border text-xs font-black flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer ${
                          selectedThemePreview === t.id
                            ? `${t.activeClass} shadow`
                            : 'bg-white/[0.04] hover:bg-white/10 text-slate-200 border-white/15'
                        }`}
                      >
                        <Play className="w-3 h-3" />
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Control Familiar */}
        <Card className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Shield className="w-4 h-4 text-teal-200" />
            <h2 className="text-xs font-black text-slate-200 uppercase tracking-wider">
              Control Familiar y Salón
            </h2>
          </div>

          <div className="flex items-center justify-between gap-2 p-3.5 rounded-3xl bg-black/30 border border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/30 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-slate-50 text-sm">Ranking de Jugadores</h3>
                <p className="text-xs text-slate-400 font-semibold">Trofeos de toda la tripulación</p>
              </div>
            </div>
            <button
              id="btn_open_ranking_from_ajustes"
              onClick={() => { playClick(); onOpenRanking(); }}
              className="btn-chunky-amber px-5 py-2 font-black text-xs cursor-pointer shrink-0"
            >
              VER RANKING
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 p-3.5 rounded-3xl bg-black/30 border border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-2xl bg-teal-400/10 text-teal-200 border border-teal-400/30 shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-slate-50 text-sm">Acerca de NeuroJuegos</h3>
                <p className="text-xs text-slate-400 font-semibold">Manifiesto de la misión y créditos</p>
              </div>
            </div>
            <button
              id="btn_open_acerca_de"
              onClick={() => { playClick(); setShowAcercaDe(true); }}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 text-slate-100 font-black text-xs transition cursor-pointer border border-white/15 shrink-0"
            >
              DETALLES
            </button>
          </div>
        </Card>

        {/* Zona de Precaución */}
        <Card className="p-5 sm:p-6 border-rose-400/20">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <TriangleAlert className="w-4 h-4 text-rose-300" />
            <h2 className="text-xs font-black text-slate-200 uppercase tracking-wider">
              Zona de Precaución
            </h2>
          </div>
          {!resetConfirm ? (
            <button
              id="btn_request_reset_data"
              onClick={() => setResetConfirm(true)}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white/[0.04] hover:bg-rose-500/10 text-slate-400 hover:text-rose-300 font-bold text-xs transition border border-white/10 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restablecer todos los Datos</span>
            </button>
          ) : (
            <div className="mt-3 p-3 bg-rose-500/10 border border-rose-400/40 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-rose-200 font-bold">
                ¿Seguro que deseas reiniciar todas las puntuaciones?
              </span>
              <div className="flex items-center gap-2">
                <button
                  id="btn_confirm_reset_yes"
                  onClick={handleResetScores}
                  className="px-4 py-2 rounded-full bg-rose-500 text-white font-black text-xs hover:bg-rose-400 cursor-pointer"
                >
                  Sí, reiniciar
                </button>
                <button
                  id="btn_confirm_reset_no"
                  onClick={() => setResetConfirm(false)}
                  className="px-4 py-2 rounded-full bg-white/10 text-slate-100 font-bold text-xs hover:bg-white/15 cursor-pointer border border-white/15"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </Card>

        <p className="text-center text-[11px] text-slate-500 font-semibold">
          Hecho con ♥ para pequeños exploradores • v1.0.0
        </p>

        {/* Acerca De Modal */}
        <Modal
          id="acerca_de_modal"
          open={showAcercaDe}
          onClose={() => setShowAcercaDe(false)}
          title="Acerca de la Aplicación"
          subtitle="Desarrollado por Rafael Nicolas Espinosa Rodríguez"
          icon={<Shield className="w-5 h-5" />}
          closeId="btn_close_acerca_de_top"
          wide
        >
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 overflow-y-auto">
            <div className="flex justify-center mb-4">
              <Mascot mood="happy" className="w-24 h-24 drop-shadow-[0_0_16px_rgba(45,212,191,0.4)]" />
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              <p>
                <strong className="text-slate-50">Descripción:</strong> Diseñada para acompañar a niños de 0 a 6 años con necesidades de estimulación del lenguaje y la memoria, fomentando habilidades comunicativas y cognitivas en un ambiente seguro y alegre.
              </p>
              <p>
                La aplicación reúne 10 dinámicas interactivas orientadas a la comprensión verbal, retención nemotécnica, asociación lógica y atención selectiva, diseñadas con estímulos visuales limpios y amigables.
              </p>
              <div className="p-3.5 bg-white/[0.04] rounded-2xl border border-white/10">
                <h4 className="font-extrabold text-teal-200 mb-1.5 flex items-center gap-1.5 text-xs sm:text-sm">
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
              className="btn-chunky-teal mt-6 w-full py-3 px-5 font-black text-sm cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </Modal>
      </div>
    </CosmicBackground>
  );
};
