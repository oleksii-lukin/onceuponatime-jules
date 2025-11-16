import React from 'react';

interface GameRoom {
  roomName: string;
  players: number;
  status: 'Waiting' | 'In Progress';
}

interface GameListProps {
  rooms: GameRoom[];
}

const GameList: React.FC<GameListProps> = ({ rooms }) => {
  return (
    <div className="flex overflow-hidden rounded-xl border border-gray-200/20 dark:border-white/20 bg-gray-50/50 dark:bg-white/5">
      <table className="flex-1">
        <thead>
          <tr className="bg-gray-100/50 dark:bg-white/10">
            <th className="px-4 py-3 text-left text-gray-700 dark:text-white w-[40%] text-sm font-medium leading-normal">
              Room Name
            </th>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-white w-[20%] text-sm font-medium leading-normal">
              Players
            </th>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-white w-[20%] text-sm font-medium leading-normal">
              Status
            </th>
            <th className="px-4 py-3 text-left text-gray-500 dark:text-gray-400 w-[20%] text-sm font-medium leading-normal">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr
              key={index}
              className="border-t border-t-gray-200/20 dark:border-t-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <td className="h-[72px] px-4 py-2 text-gray-800 dark:text-white text-sm font-normal leading-normal">
                {room.roomName}
              </td>
              <td className="h-[72px] px-4 py-2 text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                {room.players} Players
              </td>
              <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                <div
                  className={`flex items-center gap-2 ${
                    room.status === 'Waiting' ? 'text-yellow-500' : 'text-green-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {room.status === 'Waiting' ? 'hourglass_top' : 'swords'}
                  </span>
                  <span>{room.status}</span>
                </div>
              </td>
              <td className="h-[72px] px-4 py-2">
                <button
                  className={`flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
                    room.status === 'Waiting'
                      ? 'bg-primary/20 text-primary hover:bg-primary/30'
                      : 'bg-gray-200 dark:bg-white/20 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-white/30'
                  }`}
                >
                  {room.status === 'Waiting' ? 'Join' : 'Spectate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameList;
