import React, { useState, useEffect } from 'react';
import { PAREJAS_LEVELS, ParejasLevel } from '../../data/gamesData';
import { playClick, playCorrect, playError, playFlip } from '../../utils/sound';
import { ArrowLeft, Sparkles, Brain, Trophy } from 'lucide-react';

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
    PAREJAS_LEVELS[(levelNumber - 1) % PAREJAS_LEVELS.length] || PAREJAS_LEVELS[0];

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Initialize and shuffle cards
  useEffect(() => {
    const deck: CardItem[] = [];
    currentLevelData.cards.forEach((card, idx) => {
      deck.push({
        uid: `${card.pairId}-a-${idx}`,
        pairId: card.pairId,
        label: card.label,
        emoji: card.emoji,
        color: card.color,
      });
      deck.push({
        uid: `${card.pairId}-b-${idx}`,
        pairId: card.pairId,
        label: card.label,
        emoji: card.emoji,
        color: card.color,
      });
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
  }, [levelNumber]);

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
            setTimeout(() => {
              onWin(currentLevelData.points);
            }, 600);
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
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-[#FAF8F5] flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full space-y-4">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              playClick();
              onReturnToLevels();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs sm:text-sm shadow-xs border border-stone-200 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-stone-600" />
            <span>Niveles</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-bold shadow-2xs">
              Movimientos: {moves}
            </span>
            <span className="px-3 py-1 rounded-xl bg-amber-500 text-white text-xs font-extrabold shadow-2xs flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>{matchedPairIds.length} / {currentLevelData.pairsCount} Parejas</span>
            </span>
            <span className="px-3.5 py-1 rounded-xl bg-stone-900 text-white text-xs font-extrabold shadow-2xs">
              Nivel {levelNumber}
            </span>
          </div>
        </div>

        {/* Instruction box */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-stone-500">
              Memoria Visual: Parejas de Cartas
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-medium mt-0.5">
              Toca las cartas para voltearlas y encuentra todas las parejas iguales.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className={`grid gap-2.5 sm:gap-4 p-4 sm:p-6 bg-white rounded-3xl border border-stone-200 shadow-xs ${
          cards.length <= 6
            ? 'grid-cols-3 max-w-md mx-auto'
            : cards.length <= 8
            ? 'grid-cols-4 max-w-lg mx-auto'
            : 'grid-cols-3 sm:grid-cols-4 max-w-xl mx-auto'
        }`}>
          {cards.map((card) => {
            const isFlipped = flippedUids.includes(card.uid);
            const isMatched = matchedPairIds.includes(card.pairId);
            const showFace = isFlipped || isMatched;

            return (
              <button
                key={card.uid}
                disabled={isMatched || isProcessing}
                onClick={() => handleCardClick(card)}
                className={`aspect-square rounded-2xl p-2 sm:p-3 transition-all transform flex flex-col items-center justify-center cursor-pointer select-none ${
                  isMatched
                    ? 'bg-emerald-50 border-2 border-emerald-500 opacity-95 scale-95 shadow-2xs'
                    : showFace
                    ? 'bg-amber-50 border-2 border-amber-500 shadow-xs scale-100'
                    : 'bg-stone-50 hover:bg-stone-100 border border-stone-200 shadow-2xs hover:border-stone-300 active:scale-95'
                }`}
              >
                {showFace ? (
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-3xl sm:text-4xl md:text-5xl drop-shadow-2xs mb-0.5 sm:mb-1">
                      {card.emoji}
                    </span>
                    <span className="text-[11px] sm:text-xs font-black text-stone-800 tracking-tight leading-tight">
                      {card.label}
                    </span>
                    {isMatched && (
                      <span className="mt-0.5 text-[9px] sm:text-[10px] font-extrabold text-emerald-700 flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" /> ¡Par!
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-stone-400">
                    <span className="text-xl sm:text-2xl md:text-3xl font-black">?</span>
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider opacity-60">Toca</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
