'use client';

import { WebRTCProvider } from '@/contexts/WebRTCContext';
import GameRoom from '@/components/GameRoom';

export default function GamePage() {
  return (
    <WebRTCProvider>
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        <GameRoom />
      </main>
    </WebRTCProvider>
  );
}
