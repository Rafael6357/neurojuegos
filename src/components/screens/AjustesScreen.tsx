import React, { useState } from 'react';
import { ScreenType } from '../../types';
import { Volume2, VolumeX, Info, Trophy, ArrowLeft, RotateCcw, Heart, Shield } from 'lucide-react';
import { playClick, getSoundEnabled, setSoundEnabled } from '../../utils/sound';

interface AjustesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenRanking: () => void;
}

export const AjustesScreen: React.FC<AjustesScreenProps> = ({
  onNavigate,
  onOpenRanking,
}) => {
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const [showAcercaDe, setShowAcercaDe] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    playClick();
  };

  const handleResetScores = () => {
    playClick();
    localStorage.removeItem('neurojuegos_players_v1');
    localStorage.removeItem('neurojuegos_active_player_v1');
    window.location.reload();
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-8 bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            id="btn_ajustes_back_inicio"
            onClick={() => { playClick(); onNavigate('inicio'); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-amber-50 text-amber-950 font-bold text-sm shadow-sm border border-amber-300 active:scale-95 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Inicio</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-amber-950">
            Ajustes de la Aplicación
          </h1>
          <p className="text-sm text-slate-600 font-semibold mt-1">
            Configuración y detalles sobre NeuroJuegos
          </p>
        </div>

        {/* Settings Options Card */}
        <div className="bg-white/95 rounded-3xl border-3 border-amber-400 p-6 shadow-md space-y-4">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-200 text-amber-800">
                {soundOn ? <Volume2 className="w-6 h-6 text-green-700" /> : <VolumeX className="w-6 h-6 text-red-600" />}
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">Efectos de Sonido</h3>
                <p className="text-xs text-slate-500 font-medium">Activa o silencia los sonidos y fanfare del juego</p>
              </div>
            </div>

            <button
              id="btn_toggle_sound_setting"
              onClick={toggleSound}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition active:scale-95 border ${
                soundOn
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                  : 'bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              {soundOn ? 'ACTIVADO' : 'SILENCIADO'}
            </button>
          </div>

          {/* Ranking Shortcut */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-200 text-amber-800">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">Ranking de Jugadores</h3>
                <p className="text-xs text-slate-500 font-medium">Revisa las puntuaciones acumuladas de todos los niños</p>
              </div>
            </div>

            <button
              id="btn_open_ranking_from_ajustes"
              onClick={() => { playClick(); onOpenRanking(); }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-sm shadow-sm transition border-b-2 border-amber-700"
            >
              VER RANKING
            </button>
          </div>

          {/* About App */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-200 text-amber-800">
                <Info className="w-6 h-6 text-sky-700" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">Acerca de NeuroJuegos</h3>
                <p className="text-xs text-slate-500 font-medium">Información clínica, educativa y créditos</p>
              </div>
            </div>

            <button
              id="btn_open_acerca_de"
              onClick={() => { playClick(); setShowAcercaDe(true); }}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-bold text-sm shadow-sm transition border-b-2 border-sky-700"
            >
              DETALLES
            </button>
          </div>

          {/* Reset Demo Data */}
          <div className="pt-2 border-t border-amber-200">
            {!resetConfirm ? (
              <button
                id="btn_request_reset_data"
                onClick={() => setResetConfirm(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-bold text-xs transition border border-slate-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restablecer datos y perfiles de prueba</span>
              </button>
            ) : (
              <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center justify-between gap-3">
                <span className="text-xs text-rose-900 font-bold">
                  ¿Seguro que deseas reiniciar todas las puntuaciones?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    id="btn_confirm_reset_yes"
                    onClick={handleResetScores}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-xs hover:bg-rose-700"
                  >
                    Sí, reiniciar
                  </button>
                  <button
                    id="btn_confirm_reset_no"
                    onClick={() => setResetConfirm(false)}
                    className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white border-4 border-amber-400 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-700">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Acerca de NeuroJuegos
                  </h2>
                  <span className="text-xs font-bold text-amber-600">
                    Desarrollado por Rafael Nicolas Espinosa Rodríguez
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-medium">
                <p>
                  <strong>Descripción:</strong> Está diseñada para ayudar a los niños de 0 a 6 años con trastornos en el lenguaje y la memoria a desarrollar sus habilidades de comunicación y memoria de una manera divertida y educativa.
                </p>

                <p>
                  La aplicación incluye una variedad de juegos y actividades diseñados para mejorar la comprensión del lenguaje, la memoria, la asociación y la atención de los niños. Los juegos son interactivos y visuales para mantener a los niños comprometidos y motivados.
                </p>

                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                  <h4 className="font-extrabold text-amber-900 mb-1 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    Principales Beneficios:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-amber-950 font-semibold">
                    <li>Estimulación y terapia lúdica del lenguaje y la memoria.</li>
                    <li>Desarrollo de la atención sostenida y secuenciación lógica.</li>
                    <li>Refuerzo positivo con premios, estrellas y progresión de niveles.</li>
                    <li>Facilita la interacción social y familiar.</li>
                  </ul>
                </div>

                <p className="text-xs text-slate-500 font-semibold">
                  Versión Web Migrada para Google AI Studio con soporte multidispositivo completo.
                </p>
              </div>

              <button
                id="btn_close_acerca_de"
                onClick={() => { playClick(); setShowAcercaDe(false); }}
                className="mt-6 w-full py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base shadow-md active:scale-95 transition border-b-4 border-amber-700"
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
