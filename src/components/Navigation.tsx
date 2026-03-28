import Link from 'next/link';
import SearchBar from './SearchBar';
import LoginButton from './LoginButton';
import UserMenu from './UserMenu';
import { createClient } from '@/lib/supabase/server';

export default async function Navigation() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <nav className="neo-b sticky top-0 z-50 flex w-full flex-col items-center justify-between gap-4 bg-primary p-4 sm:flex-row md:px-8 border-b-4 border-black">
      <Link href="/" className="rotate-[-2deg] transform transition-transform hover:rotate-0">
        <h1 className="font-heading text-5xl tracking-widest text-black drop-shadow-[4px_4px_0_rgba(255,255,255,1)]">
          QUESTLOG
        </h1>
      </Link>
      
      <div className="flex-1 max-w-lg w-full mx-4">
        <SearchBar />
      </div>

      <div className="flex items-center gap-4 font-sans font-bold">
        <Link href="/my-games" className="hover:underline decoration-4 underline-offset-4 text-black uppercase">
          My Games
        </Link>
        {user ? (
          <UserMenu user={user} />
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
}
