import React from 'react';
import { Player } from '../types';
import { getTotalScore } from '../services/storage';
import { Trophy, Award, Medal, Star } from 'lucide-react';
import { playClick } from '../utils/sound';
import { Modal } from './ui/Modal';
import { Avatar } from './ui/Avatar';

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
  const sortedPlayers = [...players].sort((a, b) => getTotalScore(b) - getTotalScore(a));

  return (
    <Modal
      id="ranking_modal_content"
      open={isOpen}
      onClose={onClose}
      title="Ranking De Jugadores"
      subtitle="Puntuación acumulada de todos los minijuegos"
      icon={<Trophy className="w-6 h-6" />}
      closeId="btn_close_ranking_x"
      wide
    >
      {/* Players List */}
      <div className="px-4 sm:px-5 pb-2 overflow-y-auto space-y-2.5 flex-1">
        {sortedPlayers.length === 0 ? (
          <div className="text-center py-10 text-slate-400 font-semibold text-sm">
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
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 font-black text-xs border border-amber-400/40 shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
              );
            } else if (index === 1) {
              badge = (
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-400/20 text-slate-300 font-black text-xs border border-slate-400/40 shrink-0">
                  <Medal className="w-4 h-4" />
                </div>
              );
            } else if (index === 2) {
              badge = (
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-orange-400/20 text-orange-300 font-black text-xs border border-orange-400/40 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
              );
            } else {
              badge = (
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/10 text-slate-300 font-bold text-xs shrink-0">
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
                    ? 'bg-amber-400/10 border-amber-400/50 shadow-[0_0_16px_rgba(251,191,36,0.15)]'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {badge}
                  <Avatar name={p.nombre} color={p.avatarColor} size="md" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-slate-50 text-sm truncate">
                        {p.nombre}
                      </span>
                      {isActive && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-400 text-indigo-950 shrink-0">
                          Activo
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-semibold">
                      {p.edad} años
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end font-black text-amber-300 text-base">
                    <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span>{total} pts</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">
                    10 Minijuegos
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-4 flex justify-end">
        <button
          id="btn_accept_ranking"
          onClick={() => { playClick(); onClose(); }}
          className="w-full sm:w-auto px-8 py-2.5 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 active:scale-[0.98] text-indigo-950 font-black text-sm shadow-[0_6px_20px_rgba(251,191,36,0.35)] transition cursor-pointer border border-amber-200/60"
        >
          Aceptar
        </button>
      </div>
    </Modal>
  );
};
