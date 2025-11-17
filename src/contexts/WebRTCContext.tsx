'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Room, RoomEvent, RemoteParticipant, Participant } from 'livekit-client';

interface WebRTCState {
  room: Room | null;
  participants: Participant[];
}

const WebRTCContext = createContext<{
  state: WebRTCState;
  connect: (roomName: string, participantName: string) => Promise<void>;
  disconnect: () => void;
} | undefined>(undefined);

export const WebRTCProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<WebRTCState>({ room: null, participants: [] });

  const connect = async (roomName: string, participantName: string) => {
    try {
      const resp = await fetch('/api/livekit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomName, participantName }),
      });
      if (!resp.ok) {
        const errorText = await resp.text();
        throw new Error(`Failed to get LiveKit token: ${errorText}`);
      }
      const { token } = await resp.json();

      const room = new Room();
      setState(prevState => ({ ...prevState, room }));

      await room.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL || 'ws://localhost:7880', token);

      const updateParticipants = () => {
        const participants = [room.localParticipant, ...Array.from(room.participants.values())];
        setState(prevState => ({ ...prevState, participants }));
      };

      room
        .on(RoomEvent.ParticipantConnected, updateParticipants)
        .on(RoomEvent.ParticipantDisconnected, updateParticipants)
        .on(RoomEvent.TrackSubscribed, updateParticipants);

      updateParticipants();
    } catch (error) {
      console.error("Error connecting to LiveKit:", error);
    }
  };

  const disconnect = () => {
    state.room?.disconnect();
    setState({ room: null, participants: [] });
  };

  return (
    <WebRTCContext.Provider value={{ state, connect, disconnect }}>
      {children}
    </WebRTCContext.Provider>
  );
};

export const useWebRTC = () => {
  const context = useContext(WebRTCContext);
  if (context === undefined) {
    throw new Error('useWebRTC must be used within a WebRTCProvider');
  }
  return context;
};
