'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UserMenu({ user }: { user: any }) {
  const router = useRouter();
  
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  const name = user?.user_metadata?.full_name || user?.email || 'GAMER';
  const avatar = user?.user_metadata?.avatar_url;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 neo-b bg-white px-3 py-1 rotate-1 hover:rotate-0 transition-transform">
        {avatar ? (
           <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-black relative shrink-0">
             <Image src={avatar} alt={name} fill sizes="32px" className="object-cover" unoptimized />
           </div>
        ) : (
           <div className="w-8 h-8 rounded-full bg-neo-cyan border-2 border-black shrink-0" />
        )}
        <span className="font-heading text-xl uppercase max-w-[150px] truncate text-black">{name}</span>
      </div>

      <button 
        onClick={handleLogout}
        className="neo-b thump bg-neo-pink text-white px-4 py-2 font-heading text-xl uppercase"
      >
        LOG OUT
      </button>
    </div>
  );
}
