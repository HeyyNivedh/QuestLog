'use server';

import { createClient } from '@/lib/supabase/server';

export async function addToBacklog(game: {
  rawg_game_id: number;
  title: string;
  image_url: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'unauthorized', message: 'Log in with Discord to start building your collection!' };
  }

  const { error } = await supabase
    .from('user_games')
    .insert({
      user_id: user.id,
      rawg_game_id: game.rawg_game_id,
      title: game.title,
      image_url: game.image_url,
      status: 'backlog',
    });

  if (error) {
    if (error.code === '23505') {
      return { error: 'duplicate', message: 'This game is already in your backlog!' };
    }
    console.error('Insert error:', error);
    return { error: 'database_error', message: 'Failed to add game to backlog.' };
  }

  return { success: true };
}
