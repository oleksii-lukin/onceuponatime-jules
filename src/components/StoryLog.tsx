import { Player } from "@/hooks/useGameRoom"; // Assuming Player type is exported from useGameRoom

interface StoryLogProps {
  storyLog: { player_id: string; text: string }[];
  players: Player[];
}

export default function StoryLog({ storyLog, players }: StoryLogProps) {
  const getPlayerName = (playerId: string) => {
    return players.find(p => p.id === playerId)?.name || 'Unknown Player';
  };

  return (
    <div className="flex-1 overflow-y-auto pr-2 -mr-4 space-y-3">
      {storyLog.map((entry, index) => (
        <div key={index} className={`flex gap-3 p-2 rounded-lg ${index === storyLog.length - 1 ? 'bg-primary/10 dark:bg-primary/20 border-l-2 border-primary' : ''}`}>
          <div className="w-16 h-[90px] bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0 shadow">
            {/* Card art would go here, based on entry.card_id */}
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-xs font-normal leading-relaxed">
            <strong>{getPlayerName(entry.player_id)}:</strong> {entry.text}
          </p>
        </div>
      ))}
    </div>
  );
}
