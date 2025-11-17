'use client';

import { useEffect, useRef } from 'react';
import { Participant } from 'livekit-client';

export default function PlayerVideo({
  participant,
  cardCount,
  isNext,
  isMuted,
}: {
  participant: Participant;
  cardCount: number;
  isNext?: boolean;
  isMuted?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const videoTrack = participant.getTrack(Participant.Source.Camera);
    const audioTrack = participant.getTrack(Participant.Source.Microphone);

    if (videoRef.current && videoTrack) {
      videoTrack.attach(videoRef.current);
    }
    if (audioRef.current && audioTrack) {
      audioTrack.attach(audioRef.current);
    }

    return () => {
      if (videoRef.current && videoTrack) {
        videoTrack.detach(videoRef.current);
      }
      if (audioRef.current && audioTrack) {
        audioTrack.detach(audioRef.current);
      }
    };
  }, [participant]);

  return (
    <div className={`relative aspect-square bg-gray-800 rounded-lg overflow-hidden group ${isNext ? 'border-2 border-primary' : ''}`}>
      <video ref={videoRef} playsInline className="w-full h-full object-cover" />
      <audio ref={audioRef} autoPlay muted={participant.isLocal} />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="material-symbols-outlined text-white text-3xl">volume_up</span>
      </div>
      <div className="absolute bottom-1 left-1 right-1">
        <div className="flex justify-between items-center px-1">
          <p className="font-medium text-white text-[10px] drop-shadow-md">{participant.identity}</p>
          <div className="flex items-center gap-0.5 text-white bg-black/40 px-1 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[10px]">style</span>
            <span className="text-[10px] font-medium">{cardCount}</span>
          </div>
        </div>
      </div>
      {isNext && (
        <div className="absolute top-1 right-1 bg-primary/80 text-white rounded-full px-1.5 py-0.5 text-[9px] font-bold">NEXT</div>
      )}
      {isMuted && (
        <div className="absolute top-1.5 right-1.5 bg-red-600/80 text-white rounded-full p-1">
          <span className="material-symbols-outlined text-[10px]">mic_off</span>
        </div>
      )}
    </div>
  );
}
