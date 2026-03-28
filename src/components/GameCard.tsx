'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Game } from '@/lib/rawg';
import { addToBacklog } from '@/app/actions/userGames';

export default function GameCard({ 
  game, 
  isComicPanel = false,
  className = ''
}: { 
  game: Game, 
  isComicPanel?: boolean,
  className?: string 
}) {
  // We use deterministic hashing based on game id to avoid hydration mismatches
  const rotation = isComicPanel ? 0 : (game.id % 7) - 3; 
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'added'>('idle');
  const [showModal, setShowModal] = useState(false);

  const handleAdd = async () => {
    setStatus('loading');
    const result = await addToBacklog({
      rawg_game_id: game.id,
      title: game.name,
      image_url: game.background_image || '',
    });

    if (result?.error === 'unauthorized') {
      setStatus('idle');
      setShowModal(true);
      return;
    }

    if (result?.error) {
      alert(result.message);
      setStatus('idle');
      return;
    }

    setStatus('added');
  };

  return (
    <>
      <div 
        style={!isComicPanel ? { transform: `rotate(${rotation}deg)` } : undefined}
        className={`group relative flex flex-col w-full bg-white overflow-hidden transition-transform ${
          isComicPanel 
            ? `h-full ${className}` 
            : `max-w-sm sticker hover:scale-105 hover:z-10 ${className}`
        }`}
      >
        <div className={`relative w-full border-b-4 border-black shrink-0 ${isComicPanel ? 'flex-1 min-h-[50%]' : 'h-48'}`}>
          {game.background_image ? (
            <Image 
              src={game.background_image}
              alt={game.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <span className="font-heading font-bold text-gray-500 text-xl">NO IMAGE</span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-none p-4 gap-2 bg-white z-20">
          <h3 className={`font-heading leading-tight uppercase ${isComicPanel ? 'text-4xl line-clamp-3' : 'text-3xl line-clamp-2'}`}>
            {game.name}
          </h3>
          
          <div className="mt-auto pt-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="neo-b bg-neo-lime px-3 py-1 font-sans font-black text-sm uppercase">
                {game.rating ? `${game.rating} / 5` : 'UNRATED'}
              </span>
              {(game as any).metacritic ? (
                <span className="neo-b bg-neo-pink px-3 py-1 font-sans font-black text-white text-sm">
                  MS: {(game as any).metacritic}
                </span>
              ) : null}
            </div>

            {!isComicPanel && (
              <button
                onClick={handleAdd}
                disabled={status === 'loading' || status === 'added'}
                className={`neo-b thump w-full py-3 font-heading text-2xl tracking-wider transition-colors ${
                  status === 'added' 
                    ? 'bg-gray-800 text-gray-400 border-gray-900 shadow-[8px_8px_0px_0px_rgba(30,30,30,1)]' 
                    : 'bg-neo-cyan text-black hover:bg-cyan-300'
                }`}
              >
                {status === 'loading' ? 'ADDING...' : status === 'added' ? 'ADDED!' : 'ADD TO BACKLOG'}
              </button>
            )}
          </div>
        </div>
      </div>

      {showModal && !isComicPanel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="neo-b rotate-[-2deg] bg-neo-pink p-8 max-w-md w-full relative flex flex-col gap-6">
            <h2 className="font-heading text-5xl uppercase text-black drop-shadow-[2px_2px_0_rgba(255,255,255,1)]">
              HOLD UP!
            </h2>
            <p className="font-sans font-black text-xl text-black">
              Log in with Discord to start building your collection!
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="neo-b thump bg-white text-black px-6 py-4 font-heading text-3xl tracking-widest self-start hover:bg-gray-200 uppercase"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </>
  );
}
