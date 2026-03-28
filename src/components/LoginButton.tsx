'use client';

import { createClient } from '@/lib/supabase/client';

export default function LoginButton() {
  const handleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button 
      onClick={handleLogin}
      className="neo-b bg-white thump px-6 py-2 text-black font-heading text-2xl uppercase"
    >
      LOGIN (DISCORD)
    </button>
  );
}
