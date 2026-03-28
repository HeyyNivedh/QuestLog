'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    router.push(`/?q=${encodeURIComponent(query)}`);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center gap-2">
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH GAMES..."
          className="w-full neo-b border-black px-4 py-3 font-sans text-lg font-bold placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-secondary bg-white text-black uppercase"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="neo-b thump bg-secondary text-secondary-foreground flex items-center justify-center px-6 py-3 font-heading text-2xl tracking-wider active:bg-pink-600 disabled:opacity-50 h-full"
      >
        GO
      </button>
    </form>
  );
}
