'use client';

import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import PlayerVideo from './PlayerVideo';
import { useWebRTC } from '@/contexts/WebRTCContext';
import { useEffect, useState, useRef, useCallback } from 'react';
import StoryLog from './StoryLog';
import PlayerHand from './PlayerHand';
import GameControls from './GameControls';
import { useGameRoom } from '@/hooks/useGameRoom';
import { supabase } from '@/lib/supabase';
import { GameCard, storyCards, endingCards } from '@/data/cards';

export default function GameBoard({ roomCode }: { roomCode: string }) {
  const { gameRoom, loading, error } = useGameRoom(roomCode);
  const { state: rtcState, connect, disconnect } = useWebRTC();
  const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [playerHand, setPlayerHand] = useState<GameCard[]>([]);
  const [localPlayerId, setLocalPlayerId] = useState<string | null>(null); // Assume we get this after joining

  const setupRef = useRef(false);

  const localPlayer = gameRoom?.players.find(p => p.id === localPlayerId);
  const storyteller = gameRoom?.players.find(p => p.is_storyteller);
  const localPlayerIsStoryteller = localPlayer?.id === storyteller?.id;

  const fetchPlayerHand = useCallback(async () => {
    if (!localPlayerId) return;

    const { data, error } = await supabase
      .from('player_hands')
      .select('card_id')
      .eq('player_id', localPlayerId);

    if (error) {
      console.error("Error fetching player hand:", error);
      return;
    }

    const allCards = [...storyCards, ...endingCards];
    const hand = data.map(item => allCards.find(card => card.id === item.card_id)).filter(Boolean) as GameCard[];
    setPlayerHand(hand);
  }, [localPlayerId]);

  useEffect(() => {
    const participantName = `Player-${Math.random().toString(36).substring(7)}`;
    // In a real app, you'd create a player in the DB here and get an ID
    // For now, we'll just connect to LiveKit
    connect(roomCode, participantName);
    return () => { disconnect(); };
  }, [connect, disconnect, roomCode]);

  useEffect(() => {
    fetchPlayerHand();
  }, [fetchPlayerHand, gameRoom]); // Re-fetch if gameRoom changes

  useEffect(() => {
    if (gameRoom && !setupRef.current) {
      const setupFirstTurn = async () => {
        if (gameRoom.players.length > 0 && !gameRoom.players.some(p => p.is_storyteller)) {
          const randomIndex = Math.floor(Math.random() * gameRoom.players.length);
          const firstStoryteller = gameRoom.players[randomIndex];
          await supabase.from('players').update({ is_storyteller: true }).eq('id', firstStoryteller.id);
          setupRef.current = true;
        }
      };
      setupFirstTurn();
    }
  }, [gameRoom]);

  const handlePlayCard = async () => {
    if (!selectedCardId || !storyteller || !gameRoom) return;

    const cardToPlay = playerHand.find(c => c.id === selectedCardId);
    if (!cardToPlay) return;

    const newStoryEntry = { player_id: storyteller.id, card_id: selectedCardId, text: "..." };

    await supabase.from('game_state').update({
      story_log: [...(gameRoom.story_log || []), newStoryEntry]
    }).eq('room_id', gameRoom.id);

    await supabase.from('player_hands').delete().match({ player_id: storyteller.id, card_id: selectedCardId });

    if (localPlayerIsStoryteller) {
      startListening();
    }
    setSelectedCardId(null);
  };

  const handlePassTurn = async () => {
    if (!storyteller || !gameRoom) return;

    if (localPlayerIsStoryteller) {
      stopListening();
    }

    const lastEntryIndex = gameRoom.story_log.length - 1;
    if (lastEntryIndex >= 0 && gameRoom.story_log[lastEntryIndex].text === "...") {
      gameRoom.story_log[lastEntryIndex].text = transcript || "(The storyteller remained silent.)";
      await supabase.from('game_state').update({ story_log: gameRoom.story_log }).eq('room_id', gameRoom.id);
    }
    setTranscript('');

    const currentIndex = gameRoom.players.findIndex(p => p.id === storyteller.id);
    const nextPlayer = gameRoom.players[(currentIndex + 1) % gameRoom.players.length];

    await supabase.from('players').update({ is_storyteller: false }).eq('id', storyteller.id);
    await supabase.from('players').update({ is_storyteller: true }).eq('id', nextPlayer.id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gameRoom) return <div>Game room not found.</div>;

  const otherPlayers = gameRoom.players.filter(p => !p.is_storyteller);

  return (
    <div className="flex h-screen w-full font-display bg-background-light dark:bg-background-dark">
      {/* UI Code remains the same as the previous polished version */}
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        <header className="flex-shrink-0 flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9_eo6uh5GddmqT7sxrfMI7JWZwLq6bDyg_qM39Z6CL4hq7-Eb0STzR-AR0jJHEganahdOzgN936-amFwOpeBmGrdtL16mk-7-z-20uC9T67AnePTfwCG_9xr6vqt0BCb_nKwL0uVbyRGLRwhauGJfCR49UE6bAlkHGeOd2hNc7ccw_5E5MWTRrU3fqM-7j7dF4kUZoxfkSCmCd2qYr67SzUhDJcVOabh1RbnDNhUN09o4jRCSPY7dm39RF5-AEBKgSuZhBRdgQP8")'}}></div>
            <h1 className="text-gray-900 dark:text-white text-lg font-bold">Once Upon a Time</h1>
          </div>
        </header>
        <div className="flex-1 flex gap-6 overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 bg-white/50 dark:bg-black/20 rounded-xl p-4 lg:p-6 flex flex-col overflow-hidden">
              <h2 className="text-gray-900 dark:text-white tracking-light text-xl font-bold leading-tight mb-4">
                {storyteller?.name}'s Turn: Continue the Tale
              </h2>
              <StoryLog storyLog={gameRoom.story_log} players={gameRoom.players} />
              {isListening && (
                <div className="relative mt-4">
                  <div className="absolute -bottom-5 right-0 flex items-center gap-2 bg-primary/20 dark:bg-primary/30 backdrop-blur-sm p-2 rounded-lg border border-primary/30 shadow-lg animate-pulse">
                    <span className="material-symbols-outlined text-primary dark:text-purple-300 text-sm">settings_input_antenna</span>
                    <p className="text-xs font-medium text-primary dark:text-purple-300 italic">{transcript || '...'}</p>
                  </div>
                </div>
              )}
            </div>
            <footer className="flex-shrink-0 mt-4">
              <div className="flex justify-between items-end">
                <PlayerHand
                  cards={playerHand}
                  selectedCardId={selectedCardId}
                  onSelectCard={setSelectedCardId}
                />
                <GameControls
                  isStoryteller={localPlayerIsStoryteller}
                  onPlayCard={handlePlayCard}
                  onPass={handlePassTurn}
                />
              </div>
            </footer>
          </div>
          <aside className="flex-shrink-0 w-[340px] flex flex-col gap-4">
            {storyteller && (
              <div className="flex-1 w-full bg-gray-900 rounded-xl overflow-hidden relative flex flex-col min-h-0">
                {rtcState.participants.find(p => p.identity === storyteller.name) && <PlayerVideo participant={rtcState.participants.find(p => p.identity === storyteller.name)!} cardCount={0} />}
                <div className="absolute top-3 left-3 bg-black/50 text-white text-sm font-medium px-2 py-1 rounded">{storyteller.name} (Storyteller)</div>
              </div>
            )}
            <div className="flex-shrink-0 grid grid-cols-3 gap-3">
              {otherPlayers.map(player => (
                <div key={player.id} className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden group">
                  {rtcState.participants.find(p => p.identity === player.name) && <PlayerVideo participant={rtcState.participants.find(p => p.identity === player.name)!} cardCount={0} />}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
