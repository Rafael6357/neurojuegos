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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="ranking_modal_content"
        className="w-full max-w-lg bg-white border border-stone-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-stone-900 p-4 sm:p-5 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight">
                Ranking De Jugadores
              </h2>
              <p className="text-xs text-stone-400 font-medium">
                Puntuación acumulada de todos los minijuegos
              </p>
            </div>
          </div>
          <button
            id="btn_close_ranking_x"
            onClick={() => { playClick(); onClose(); }}
            className="p-2 rounded-full hover:bg-stone-800 active:scale-95 transition text-stone-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Players List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-2.5 flex-1 bg-stone-50/50">
          {sortedPlayers.length === 0 ? (
            <div className="text-center py-10 text-stone-400 font-medium text-sm">
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
                  <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-amber-100 text-amber-800 font-black text-xs border border-amber-300">
                    <Trophy className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                );
              } else if (index === 1) {
                badge = (
                  <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-stone-200 text-stone-700 font-black text-xs border border-stone-300">
                    <Medal className="w-3.5 h-3.5 text-stone-600" />
                  </div>
                );
              } else if (index === 2) {
                badge = (
                  <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-orange-100 text-orange-800 font-black text-xs border border-orange-300">
                    <Award className="w-3.5 h-3.5 text-orange-700" />
                  </div>
                );
              } else {
                badge = (
                  <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-stone-100 text-stone-600 font-bold text-xs">
                    #{index + 1}
                  </div>
                );
              }

              return (
                <div
                  key={p.id}
                  id={`ranking_item_${p.id}`}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition ${
                    isActive
                      ? 'bg-amber-50/80 border-amber-300 shadow-xs'
                      : 'bg-white border-stone-200 hover:border-stone-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {badge}
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${p.avatarColor || 'from-amber-400 to-orange-500'} flex items-center justify-center text-white font-black text-sm shadow-xs shrink-0`}>
                      {p.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-stone-900 text-sm truncate">
                          {p.nombre}
                        </span>
                        {isActive && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-amber-600 text-white shadow-2xs shrink-0">
                            Activo
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 font-medium">
                        {p.edad} años
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 justify-end font-black text-amber-700 text-base">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{total} pts</span>
                    </div>
                    <div className="text-[10px] text-stone-400 font-semibold uppercase">
                      10 Minijuegos
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-white border-t border-stone-200 flex justify-end">
          <button
            id="btn_accept_ranking"
            onClick={() => { playClick(); onClose(); }}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 active:scale-[0.98] text-white font-bold text-sm shadow-xs transition cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
