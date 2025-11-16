'use client';

import { useSearchParams } from 'next/navigation';
import AdminLobby from '@/components/AdminLobby';
import UserLobby from '@/components/UserLobby';

export default function LobbyPage() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('isAdmin') === 'true';

  return (
    <div>
      {isAdmin ? <AdminLobby /> : <UserLobby />}
    </div>
  );
}
