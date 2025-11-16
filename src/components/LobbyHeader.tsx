import React from 'react';
import Link from 'next/link';

const LobbyHeader: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
          Game Lobby
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
          Join an existing story or create your own.
        </p>
      </div>
      <Link href="/lobby/create" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
        <span className="truncate">Create New Story</span>
      </Link>
    </div>
  );
};

export default LobbyHeader;
