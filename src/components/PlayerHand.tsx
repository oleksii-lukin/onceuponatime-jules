import { GameCard } from "@/data/cards";

interface PlayerHandProps {
  cards: GameCard[];
  selectedCardId: string | null;
  onSelectCard: (cardId: string) => void;
}

export default function PlayerHand({ cards, selectedCardId, onSelectCard }: PlayerHandProps) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2">
        {cards.map(card => (
          <div
            key={card.id}
            className={`p-1.5 rounded-md shadow hover:-translate-y-1 transition-transform cursor-pointer ${
              selectedCardId === card.id ? 'bg-primary/20 ring-2 ring-primary' : 'bg-white dark:bg-white/10'
            }`}
            onClick={() => onSelectCard(card.id)}
          >
            <div className={`w-20 h-28 rounded-sm flex flex-col justify-between p-1.5 ${
              card.type === 'Ending' ? 'bg-black/80 border border-yellow-400/50' : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              <span className={`material-symbols-outlined self-start text-sm ${
                card.type === 'Ending' ? 'text-yellow-400' : card.id === selectedCardId ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {card.icon}
              </span>
              <div className="text-center">
                {card.type === 'Ending' && <p className="text-[9px] text-yellow-500 uppercase font-semibold">Ending</p>}
                <span className={`text-[10px] font-bold leading-tight ${
                  card.type === 'Ending' ? 'text-yellow-300' : card.id === selectedCardId ? 'text-primary dark:text-purple-300' : 'text-gray-800 dark:text-gray-200'
                }`}>
                  {card.title}
                </span>
              </div>
              <span className={`material-symbols-outlined self-end text-sm ${
                card.type === 'Ending' ? 'text-yellow-400' : card.id === selectedCardId ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {card.icon}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
