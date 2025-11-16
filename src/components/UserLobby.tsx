'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { lobby } from '@/data/lobby';
import Header from '@/components/Header';

const UserLobby: React.FC = () => {
  const currentUser = lobby.players.find(p => p.name === 'BardOfAvon');
  const [isReady, setIsReady] = useState(currentUser?.isReady || false);
  const [role, setRole] = useState('player');
  const router = useRouter();

  const handleLeave = () => {
    router.push('/');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1">
            <Header />
            <main className="flex-1 mt-8">
            <div className="flex flex-wrap justify-between items-center gap-3 p-4">
                <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Game Lobby</p>
                <div className="flex items-center gap-2">
                    <span className="text-white/70">Room Code:</span>
                    <span className="text-white font-bold text-lg tracking-widest">{lobby.roomCode}</span>
                    <button className="flex items-center justify-center size-9 shrink-0 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">content_copy</span>
                    </button>
                </div>
            </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white/5 p-6 rounded-xl opacity-70">
                    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-5">Game Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col">
                          <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-white text-base font-medium leading-normal pb-2">Room Name</p>
                            <input className="form-input flex w-full min-w-0 flex-1 rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/10 bg-[#211c27] h-11 placeholder:text-white/40 p-[15px] text-base font-normal leading-normal disabled:opacity-50" disabled value={lobby.roomName} />
                          </label>
                        </div>
                        <div className="flex flex-col gap-2 p-4 border border-white/10 rounded-lg">
                          <div className="flex items-center justify-between py-2">
                            <label className="text-white text-base font-medium leading-normal" htmlFor="allow-hot-join">Allow Hot Join</label>
                            <label className="relative inline-flex cursor-pointer items-center opacity-50">
                              <input className="peer sr-only" disabled id="allow-hot-join" type="checkbox" checked={lobby.settings.allowHotJoin} />
                              <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <label className="text-white text-base font-medium leading-normal" htmlFor="game-visibility">Public Game</label>
                            <label className="relative inline-flex cursor-pointer items-center opacity-50">
                              <input checked className="peer sr-only" disabled id="game-visibility" type="checkbox" checked={lobby.settings.publicGame} />
                              <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <label className="text-white text-base font-medium leading-normal" htmlFor="allow-spectators">Allow Spectators</label>
                            <label className="relative inline-flex cursor-pointer items-center opacity-50">
                              <input checked className="peer sr-only" disabled id="allow-spectators" type="checkbox" checked={lobby.settings.allowSpectators} />
                              <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1"></div>
                    </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl opacity-70">
                    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">Game Rules</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <label className="text-white text-base font-medium leading-normal" htmlFor="allow-interrupts">Allow Interrupts</label>
                          <button className="text-white/50 hover:text-white transition-colors"><span className="material-symbols-outlined text-base">info</span></button>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center opacity-50">
                          <input checked className="peer sr-only" disabled id="allow-interrupts" type="checkbox" checked={lobby.rules.allowInterrupts} />
                          <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <label className="text-white text-base font-medium leading-normal" htmlFor="timer-per-turn">Timer per Turn</label>
                        <label className="relative inline-flex cursor-pointer items-center opacity-50">
                          <input className="peer sr-only" disabled id="timer-per-turn" type="checkbox" checked={lobby.rules.timerPerTurn} />
                          <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <label className="text-white text-base font-medium leading-normal" htmlFor="happy-ending">Happy Ending Variant</label>
                        <label className="relative inline-flex cursor-pointer items-center opacity-50">
                          <input className="peer sr-only" disabled id="happy-ending" type="checkbox" checked={lobby.rules.happyEndingVariant} />
                          <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl opacity-70">
                    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-5">Card Expansions</h2>
                    <div className="flex flex-col">
                      <p className="text-white text-base font-medium leading-normal pb-2">Included Packs</p>
                      <div className="space-y-2">
                        {lobby.expansions.map((expansion) => (
                          <label key={expansion.id} className="flex items-center gap-3 p-3 rounded-lg">
                            <input className="form-checkbox rounded text-primary bg-transparent border-white/30 focus:ring-primary/50 focus:ring-offset-background-dark disabled:opacity-50" disabled type="checkbox" checked={expansion.enabled} />
                            <span className="text-white font-medium">{expansion.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1 flex flex-col gap-6">
                  <div className="bg-white/5 p-6 rounded-xl flex-1 flex flex-col">
                    <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-4">Players ({lobby.players.length})</h2>
                    <div className="flex-1 space-y-3 overflow-y-auto">
                      {lobby.players.map((player) => (
                        <div key={player.id} className={`flex items-center gap-3 p-3 rounded-lg ${player.name === 'BardOfAvon' ? 'bg-primary/20 border border-primary' : 'bg-white/10'}`}>
                          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("${player.avatar}")` }}></div>
                          <div className="flex flex-col">
                            <p className="text-white font-bold truncate">{player.name}</p>
                            {player.isHost && <p className="text-primary text-xs font-semibold">Host</p>}
                          </div>
                          {player.name === 'BardOfAvon' && isReady && <span className="material-symbols-outlined text-green-400">check_circle</span>}
                        </div>
                      ))}
                    </div>
                    {lobby.spectators.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-white/70 text-sm font-bold leading-tight tracking-[-0.015em] pb-2 pt-4 border-t border-white/10">Spectators ({lobby.spectators.length})</h3>
                            <div className="space-y-3">
                            {lobby.spectators.map((spectator) => (
                                <div key={spectator.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("${spectator.avatar}")` }}></div>
                                <p className="text-white/80 font-medium truncate">{spectator.name}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                    )}
                    <div className="mt-auto pt-6 space-y-4">
                      <div>
                        <p className="text-white/80 text-sm font-medium leading-normal pb-2 text-center">Choose your role</p>
                        <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-black/20">
                          <button onClick={() => setRole('player')} className={`px-4 py-2 text-sm font-bold rounded-md ${role === 'player' ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10'}`}>Player</button>
                          <button onClick={() => setRole('spectator')} className={`px-4 py-2 text-sm font-bold rounded-md ${role === 'spectator' ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10'}`}>Spectator</button>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setIsReady(!isReady)} className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-4 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors gap-2">
                          <span className="material-symbols-outlined">{isReady ? 'close' : 'check'}</span>
                          <span className="truncate">{isReady ? 'Unready' : 'Ready'}</span>
                        </button>
                        <button onClick={handleLeave} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-4 bg-white/10 text-white/80 text-base font-bold leading-normal tracking-[0.015em] hover:bg-white/20 transition-colors">
                          <span className="truncate">Leave</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLobby;
