'use server';

const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export type Game = {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  rating: number;
  playtime: number;
  genres: { name: string }[];
  dbId?: string;
  status?: string;
};

export async function fetchGames(query: string = ""): Promise<{ results: Game[] }> {
  const url = new URL(`${BASE_URL}/games`);
  if (!RAWG_API_KEY) {
    throw new Error("Missing RAWG_API_KEY environment variable");
  }
  url.searchParams.append("key", RAWG_API_KEY);
  if (query) {
    url.searchParams.append("search", query);
  }

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch from RAWG: ${res.statusText}`);
  return res.json();
}
