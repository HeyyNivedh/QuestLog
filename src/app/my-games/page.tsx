import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ComicPanel from '@/components/ComicPanel';
import { Game } from '@/lib/rawg';

export default async function MyGamesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const { data: userGames, error } = await supabase
    .from('user_games')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user games:', error);
  }

  const games = userGames || [];

  // Map to the GameCard prop interface
  // Using 'any' since our DB returns generic columns but we want to conform strictly to Game interface
  const mappedGames: Game[] = games.map((g: any) => ({
    id: g.rawg_game_id,
    slug: '',
    name: g.title,
    background_image: g.image_url,
    rating: 0,
    playtime: 0,
    genres: [],
    dbId: g.id,
    status: g.status
  }));

  // Define comic sizes based on index
  const getPanelClass = (index: number) => {
    // A deterministic pattern for masonary comic panels
    const position = index % 5;
    if (position === 0) return 'col-span-full md:col-span-2 md:row-span-2 h-[450px] md:h-[600px] border-4 border-black'; // Mega panel
    if (position === 3) return 'col-span-1 md:col-span-2 h-[300px] border-4 border-black'; // Wide panel
    return 'col-span-1 h-[300px] border-4 border-black'; // Standard square/tall panel
  };

  return (
    <div className="min-h-screen bg-white texture-halftone">
      <div className="p-4 md:p-8">
        <div className="mb-8 border-b-8 border-black pb-4">
          <h1 className="font-heading text-6xl uppercase tracking-widest text-black drop-shadow-[6px_6px_0_rgba(255,0,255,1)]">
            MY COLLECTION
          </h1>
        </div>

        {mappedGames.length > 0 ? (
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-[8px] border-black p-3 bg-black">
              {mappedGames.map((game, i) => (
                <ComicPanel key={game.dbId} game={game} className={getPanelClass(i)} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-64 w-full items-center justify-center neo-b bg-white">
            <p className="font-heading text-4xl">NO GAMES IN YOUR COMIC YET!</p>
          </div>
        )}
      </div>
    </div>
  );
}
