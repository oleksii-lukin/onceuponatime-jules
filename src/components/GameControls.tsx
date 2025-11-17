interface GameControlsProps {
  isStoryteller: boolean;
  onPlayCard: () => void;
  onPass: () => void;
}

export default function GameControls({
  isStoryteller,
  onPlayCard,
  onPass,
}: GameControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPass}
        className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
      >
        Pass
      </button>
      {isStoryteller && (
        <button
          onClick={onPlayCard}
          className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
        >
          Play Card
        </button>
      )}
    </div>
  );
}
