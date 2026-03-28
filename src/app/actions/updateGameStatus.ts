'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateGameStatus(dbId: string, status: 'playing' | 'finished') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'unauthorized', message: 'You must be logged in.' };
  }

  const { error } = await supabase
    .from('user_games')
    .update({ status })
    .eq('id', dbId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Update error:', error);
    return { error: 'database_error', message: 'Failed to update game status.' };
  }

  revalidatePath('/my-games');
  return { success: true };
}
