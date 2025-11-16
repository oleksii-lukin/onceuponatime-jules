import React from 'react';

interface Friend {
  name: string;
  status: string;
  avatarUrl: string;
}

interface FriendsListProps {
  friends: Friend[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <div className="bg-gray-50 dark:bg-white/5 border border-gray-200/20 dark:border-white/20 rounded-xl p-6">
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Online Friends</h4>
      <div className="flex flex-col gap-4">
        {friends.map((friend, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                  style={{ backgroundImage: `url("${friend.avatarUrl}")` }}
                ></div>
                <div
                  className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-gray-50 dark:border-background-dark ${
                    friend.status === 'In Lobby' || friend.status === 'In Game'
                      ? 'bg-green-500'
                      : 'bg-gray-500'
                  }`}
                ></div>
              </div>
              <div>
                <p className="font-medium text-sm text-gray-800 dark:text-white">{friend.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{friend.status}</p>
              </div>
            </div>
            <button className="text-primary hover:text-primary/80 transition-colors">
              <span className="material-symbols-outlined">person_add</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
