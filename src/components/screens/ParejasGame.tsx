import React, { useState, useEffect } from 'react';
import { PAREJAS_LEVELS, ParejasLevel, GAMES_META, getLevelCount } from '../../data/gamesData';
import { playClick, playCorrect, playError, playFlip } from '../../utils/sound';
import { Sparkles, Brain } from 'lucide-react';
import { GameShell } from '../ui/GameShell';
import { Card } from '../ui/Card';
import type { FeedbackState } from '../../types';

interface ParejasGameProps {
  levelNumber: number;
  onWin: (points: number) => void;
  onReturnToLevels: () => void;
}

interface CardItem {
  uid: string;
  pairId: string;
  label: string;
  emoji: string;
  color: string;
}

export const ParejasGame: React.FC<ParejasGameProps> = ({
  levelNumber,
  onWin,
  onReturnToLevels,
}) => {
  const currentLevelData: ParejasLevel =
    PAREJAS_LEVELS[levelNumber - 1] ?? PAREJAS_LEVELS[0];
  const meta = GAMES_META.parejas;

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  // Initialize and shuffle cards
  useEffect(() => {
    const deck: CardItem[] = [];
    currentLevelData.cards.forEach((card, idx) => {
      deck.push({ uid: `${card.pairId}-a-${idx}`, pairId: card.pairId, label: card.label, emoji: card.emoji, color: card.color });
      deck.push({ uid: `${card.pairId}-b-${idx}`, pairId: card.pairId, label: card.label, emoji: card.emoji, color: card.color });
    });

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedUids([]);
    setMatchedPairIds([]);
    setMoves(0);
    setIsProcessing(false);
    setFeedback({ text: 'Toca las cartas para voltearlas y encuentra todas las parejas iguales.', kind: 'info' });
  }, [levelNumber, currentLevelData.cards]);

  const handleCardClick = (card: CardItem) => {
    if (isProcessing) return;
    if (flippedUids.includes(card.uid)) return;
    if (matchedPairIds.includes(card.pairId)) return;

    playFlip();

    if (flippedUids.length === 0) {
      setFlippedUids([card.uid]);
    } else if (flippedUids.length === 1) {
      const firstCardUid = flippedUids[0];
      const firstCard = cards.find(c => c.uid === firstCardUid);
      setFlippedUids([firstCardUid, card.uid]);
      setMoves(m => m + 1);

      if (firstCard && firstCard.pairId === card.pairId) {
        // Match!
        setIsProcessing(true);
        setTimeout(() => {
          playCorrect();
          const nextMatched = [...matchedPairIds, card.pairId];
          setMatchedPairIds(nextMatched);
          setFlippedUids([]);
          setIsProcessing(false);

          if (nextMatched.length === currentLevelData.pairsCount) {
            setFeedback({ text: `¡Increíble! Encontraste las ${currentLevelData.pairsCount} parejas en ${moves + 1} movimientos.`, kind: 'success' });
            setTimeout(() => {
              onWin(currentLevelData.points);
            }, 900);
          }
        }, 600);
      } else {
        // No match
        setIsProcessing(true);
        setTimeout(() => {
          playError();
          setFlippedUids([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  return (
    <GameShell
      backId="btn_parejas_back_levels"
      feedbackId="parejas_feedback_banner"
      levelNumber={levelNumber}
      totalLevels={getLevelCount('parejas')}
      title="Parejas de Cartas"
      area={meta.area}
      areaLabel="Memoria Visual: Parejas de Cartas"
      instruction={`Encuentra las ${currentLevelData.pairsCount} parejas iguales`}
      feedback={feedback}
      onBack={() => { playClick(); onReturnToLevels(); }}
    >
      {/* Scoreboard */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span id="parejas_moves" className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-slate-100 text-xs font-bold">
          Movimientos: {moves}
        </span>
        <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 text-indigo-950 text-xs font-black">
          {matchedPairIds.length} / {currentLevelData.pairsCount} Parejas
        </span>
      </div>

      {/* Cards Grid */}
      <Card className="p-4 sm:p-6">
        <div className={`grid gap-2.5 sm:gap-4 mx-auto ${
          cards.length <= 6
            ? 'grid-cols-3 max-w-md'
            : cards.length <= 8
            ? 'grid-cols-4 max-w-lg'
            : 'grid-cols-3 sm:grid-cols-4 max-w-xl'
        }`}>
          {cards.map((card) => {
            const isFlipped = flippedUids.includes(card.uid);
            const isMatched = matchedPairIds.includes(card.pairId);
            const showFace = isFlipped || isMatched;

            return (
              <button
                key={card.uid}
                id={`parejas_card_${card.uid}`}
                disabled={isMatched || isProcessing}
                onClick={() => handleCardClick(card)}
                aria-label={showFace ? `${card.label}` : 'Carta oculta, toca para voltear'}
                className={`aspect-square rounded-3xl p-2 sm:p-3 transition-all flex flex-col items-center justify-center cursor-pointer select-none border-2 disabled:cursor-default ${
                  isMatched
                    ? 'bg-emerald-400/15 border-emerald-300 scale-95 shadow-[0_0_16px_rgba(52,211,153,0.3)]'
                    : showFace
                    ? `bg-gradient-to-br ${card.color} border-white/50 shadow-lg scale-100`
                    : 'bg-white/[0.05] hover:bg-violet-400/15 border-white/15 hover:border-violet-300/60 active:scale-95'
                }`}
              >
                {showFace ? (
                  <span className="flex flex-col items-center justify-center text-center anim-pop-in">
                    <span className="text-3xl sm:text-4xl md:text-5xl drop-shadow mb-0.5 sm:mb-1" role="img" aria-label={card.label}>
                      {card.emoji}
                    </span>
                    <span className={`text-[11px] sm:text-xs font-black tracking-tight leading-tight ${isMatched ? 'text-emerald-200' : 'text-white'}`}>
                      {card.label}
                    </span>
                    {isMatched && (
                      <span className="mt-0.5 text-[9px] sm:text-[10px] font-extrabold text-emerald-300 flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" /> ¡Par!
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="flex flex-col items-center justify-center text-slate-400">
                    <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-violet-300/70" />
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider opacity-60 mt-1">Toca</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Card>
    </GameShell>
  );
};
