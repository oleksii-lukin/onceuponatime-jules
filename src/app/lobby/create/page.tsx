'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CreateLobbyPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // a-z, 0-9
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/lobby/${roomCode}?isAdmin=true`);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-white">Creating a new lobby...</p>
    </div>
  );
};

export default CreateLobbyPage;
