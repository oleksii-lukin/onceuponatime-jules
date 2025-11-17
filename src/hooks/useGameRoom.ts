'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

// Define the shape of the game data from Supabase
export interface Player {
  id: string;
  name: string;
  is_storyteller: boolean;
}

export interface GameRoom {
  id: string;
  room_code: string;
  players: Player[];
  story_log: any[]; // Define a proper type for story log entries
}

export const useGameRoom = (roomCode: string) => {
  const [gameRoom, setGameRoom] = useState<GameRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let channel: RealtimeChannel;

    const fetchGameRoom = async () => {
      try {
        const { data, error } = await supabase
          .from('game_rooms')
          .select('*, players(*), game_state(*)')
          .eq('room_code', roomCode)
          .single();

        if (error) throw error;
        if (data) {
          const newGameRoom = {
            id: data.id,
            room_code: data.room_code,
            players: data.players,
            story_log: data.game_state[0]?.story_log || [],
          };
          setGameRoom(newGameRoom);

          // Set up the realtime subscription only after the initial fetch
          if (!channel) {
            channel = supabase
              .channel(`game_room:${newGameRoom.id}`)
              .on('postgres_changes', { event: '*', schema: 'public' }, () => {
                fetchGameRoom(); // Re-fetch data on any change
              })
              .subscribe();
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameRoom();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [roomCode]); // Removed gameRoom from dependency array

  return { gameRoom, loading, error };
};
