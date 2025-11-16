import React from 'react';

interface UserProfileProps {
  user: {
    name: string;
    title: string;
    gamesPlayed: number;
    gamesWon: number;
    avatarUrl: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="bg-gray-50 dark:bg-white/5 border border-gray-200/20 dark:border-white/20 rounded-xl p-6 flex flex-col items-center text-center">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 mb-4"
        style={{ backgroundImage: `url("${user.avatarUrl}")` }}
      ></div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{user.title}</p>
      <div className="w-full h-px bg-gray-200/20 dark:bg-white/20 my-4"></div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-primary">{user.gamesPlayed}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Games Played</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-primary">{user.gamesWon}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Games Won</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
