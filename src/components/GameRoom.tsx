'use client';

import { useParams } from 'next/navigation';
import GameBoard from './GameBoard';

export default function GameRoom() {
  const params = useParams();
  const roomCode = typeof params.roomCode === 'string' ? params.roomCode : '';

  if (!roomCode) {
    return <div>Loading room...</div>;
  }

  return <GameBoard roomCode={roomCode} />;
}
