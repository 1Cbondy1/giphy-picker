'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import GifGrid from '@/components/GifGrid';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParam = searchParams.get('query') || '';
  const [input, setInput] = useState(queryParam);

  useEffect(() => {
    setInput(queryParam);
  }, [queryParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const encoded = encodeURIComponent(input.trim());
    router.push(`/?query=${encoded}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">GIF Picker</h1>

      <SearchBar input={input} setInput={setInput} onSubmit={handleSubmit} />

      <GifGrid query={queryParam} />
    </main>
  );
}
