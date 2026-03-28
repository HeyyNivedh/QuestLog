'use client';

import { useState } from 'react';
import GameCard from './GameCard';
import { Game } from '@/lib/rawg';
import { updateGameStatus } from '@/app/actions/updateGameStatus';

export default function ComicPanel({ game, className }: { game: Game, className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sprayColor, setSprayColor] = useState<string | null>(null);

  const handleUpdate = async (status: 'playing' | 'finished') => {
    // Trigger spray animation
    setSprayColor(status === 'playing' ? 'bg-neo-cyan' : 'bg-neo-pink');
    
    // Call server action synchronously so it kicks off while animating
    if (game.dbId) {
      updateGameStatus(game.dbId, status).catch(console.error);
    }
    
    // Close modal after animation completes
    setTimeout(() => {
      setIsOpen(false);
      setSprayColor(null);
    }, 500); 
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)} 
        className={`cursor-pointer h-full relative group bg-white overflow-hidden ${className}`}
      >
        <GameCard game={game} isComicPanel={true} className="border-0 h-full" />
        
        {/* Status Badge overlays */}
        {game.status && game.status !== 'backlog' && (
          <div className={`absolute top-2 right-2 z-30 neo-b px-4 py-2 font-heading text-2xl rotate-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-black ${
            game.status === 'playing' ? 'bg-neo-cyan' : 'bg-neo-pink'
          }`}>
            {game.status === 'playing' ? 'PLAYING' : 'DONE'}
          </div>
        )}
        
        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-20 pointer-events-none flex items-center justify-center">
           <span className="opacity-0 group-hover:opacity-100 neo-b bg-white px-4 py-2 font-heading text-4xl rotate-[-2deg] transition-opacity uppercase drop-shadow-[2px_2px_0_rgba(255,0,255,1)]">
             UPDATE
           </span>
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="neo-b texture-halftone bg-white p-8 max-w-lg w-full relative flex flex-col gap-6 overflow-hidden">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 neo-b bg-red-500 text-black w-12 h-12 flex items-center justify-center font-heading text-3xl hover:bg-red-400 z-50 transform hover:rotate-6 transition-transform"
            >
              X
            </button>

            <h2 className="font-heading text-5xl uppercase text-black drop-shadow-[2px_2px_0_rgba(255,255,255,1)] z-40 relative bg-neo-lime px-4 py-2 border-4 border-black inline-block self-start rotate-[-2deg]">
              TAG STATUS
            </h2>
            
            <p className="font-sans font-black text-2xl text-black bg-white px-4 py-2 border-4 border-black inline-block z-40 relative">
              {game.name}
            </p>

            <div className="flex flex-col gap-4 mt-6 z-40 relative">
              {game.status !== 'playing' && (
                <button 
                  onClick={() => handleUpdate('playing')}
                  className="neo-b thump bg-neo-cyan text-black px-6 py-4 font-heading text-4xl tracking-widest hover:bg-cyan-300 uppercase w-full"
                >
                  START PLAYING
                </button>
              )}
              
              {game.status !== 'finished' && (
                <button 
                  onClick={() => handleUpdate('finished')}
                  className="neo-b thump bg-neo-pink text-white px-6 py-4 font-heading text-4xl tracking-widest hover:bg-pink-400 uppercase w-full"
                >
                  FINISHED
                </button>
              )}
              
              {game.status === 'finished' && (
                <div className="flex items-center justify-center neo-b bg-gray-200 px-6 py-4 text-gray-500 font-heading text-3xl opacity-50">
                  ALREADY FINISHED
                </div>
              )}
            </div>

            {/* Spray Animation Overlay */}
            {sprayColor && (
              <div className="absolute inset-0 z-50 flex items-center justify-center opacity-0 animate-spray pointer-events-none">
                <div className={`w-[800px] h-[800px] rounded-full blur-3xl scale-0 animate-spray-expand ${sprayColor}`} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
