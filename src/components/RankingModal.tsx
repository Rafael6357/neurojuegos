import React from 'react';
import { Player } from '../types';
import { getTotalScore } from '../services/storage';
import { Trophy, Award, Medal, X, Star } from 'lucide-react';
import { playClick } from '../utils/sound';

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  activePlayerId: string;
}

export const RankingModal: React.FC<RankingModalProps> = ({
  isOpen,
  onClose,
  players,
  activePlayerId,
}) => {
  if (!isOpen) return null;

  const sortedPlayers = [...players].sort((a, b) => getTotalScore(b) - getTotalScore(a));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="ranking_modal_content"
        className="w-full max-w-lg bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-amber-500 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 sm:p-5 text-white flex items-center justify-between border-b-4 border-amber-600">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-amber-400/30 ring-2 ring-white/40">
              <Trophy className="w-7 h-7 text-yellow-200 drop-shadow-md animate-bounce" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide">
                Ranking De Jugadores
              </h2>
              <p className="text-xs text-amber-100 font-medium">
                Puntuación acumulada de todos los minijuegos
              </p>
            </div>
          </div>
          <button
            id="btn_close_ranking_x"
            onClick={() => { playClick(); onClose(); }}
            className="p-2 rounded-full hover:bg-white/20 active:scale-95 transition text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Players List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {sortedPlayers.length === 0 ? (
            <div className="text-center py-10 text-slate-500 font-medium">
              No hay jugadores registrados todavía.
            </div>
          ) : (
            sortedPlayers.map((p, index) => {
              const total = getTotalScore(p);
              const isActive = p.id === activePlayerId;

              // Place badges
              let badge = null;
              if (index === 0) {
                badge = (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 font-black shadow-md ring-2 ring-yellow-400">
                    <Trophy className="w-4 h-4 text-amber-900" />
                  </div>
                );
              } else if (index === 1) {
                badge = (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-slate-300 to-slate-100 text-slate-800 font-black shadow-md ring-2 ring-slate-300">
                    <Medal className="w-4 h-4 text-slate-700" />
                  </div>
                );
              } else if (index === 2) {
                badge = (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-700 text-white font-black shadow-md ring-2 ring-amber-600">
                    <Award className="w-4 h-4 text-amber-100" />
                  </div>
                );
              } else {
                badge = (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold text-sm">
                    {index + 1}
                  </div>
                );
              }

              return (
                <div
                  key={p.id}
                  id={`ranking_item_${p.id}`}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition ${
                    isActive
                      ? 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-400/40'
                      : 'bg-white border-amber-200/80 hover:border-amber-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {badge}
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${p.avatarColor || 'from-amber-400 to-orange-500'} flex items-center justify-center text-white font-black text-base shadow-sm ring-2 ring-white`}>
                      {p.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-800 text-base">
                          {p.nombre}
                        </span>
                        {isActive && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                            Activo
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {p.edad} años
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end font-black text-amber-700 text-lg">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{total} pts</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      V/F: {p.puntuacionFrasesVoF} • Id: {p.puntuacionIdentifica} • Pat: {p.puntuacionPatrones}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-amber-100/60 border-t-2 border-amber-200 flex justify-end">
          <button
            id="btn_accept_ranking"
            onClick={() => { playClick(); onClose(); }}
            className="w-full sm:w-auto px-8 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-base shadow-md transition border-b-4 border-amber-700"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
