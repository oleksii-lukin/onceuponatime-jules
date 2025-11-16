import Header from '@/components/Header';
import LobbyHeader from '@/components/LobbyHeader';
import GameFilters from '@/components/GameFilters';
import GameList from '@/components/GameList';
import UserProfile from '@/components/UserProfile';
import FriendsList from '@/components/FriendsList';
import { gameRooms } from '@/data/gameRooms';
import { user } from '@/data/user';
import { friends } from '@/data/friends';

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <LobbyHeader />
              <GameFilters />
              <GameList rooms={gameRooms} />
            </div>
            <div className="flex flex-col gap-8">
              <UserProfile user={user} />
              <FriendsList friends={friends} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
