import { fetchGames, Game } from '@/lib/rawg';
import GameCard from '@/components/GameCard';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: { searchParams: SearchParams }) {
  const params = await props.searchParams;
  const query = typeof params.q === 'string' ? params.q : '';
  
  let games: Game[] = [];
  try {
    const data = await fetchGames(query);
    games = data.results || [];
  } catch (error) {
    console.error('Failed to load games:', error);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4">
        <h2 className="font-heading text-6xl uppercase tracking-widest drop-shadow-[4px_4px_0_rgba(255,255,255,1)]">
          {query ? `RESULTS FOR "${query}"` : 'POPULAR TITLES'}
        </h2>
      </div>

      {games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {games.map((game: Game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center neo-b bg-white">
          <p className="font-heading text-4xl">NO GAMES FOUND. REROLL?</p>
        </div>
      )}
    </div>
  );
}
