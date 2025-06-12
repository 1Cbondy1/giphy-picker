'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchGifs } from '@/lib/fetchGifs';
import { fetchRandomGifs } from '@/lib/fetchRandomGifs';

import SearchBar from '@/components/SearchBar';
import GifGrid from '@/components/GifGrid';
import SearchTag from '@/components/SearchTag';

export default function HomePage() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const queryParam = searchParams.get('query') || '';
	const [input, setInput] = useState(queryParam);
	const [searchData, setSearchData] = useState({});
	const [activeQuery, setActiveQuery] = useState('');

    useEffect(() => {
        const run = async () => {
            const key = queryParam || '__RANDOM__';

            setInput(queryParam);
            setActiveQuery(key);

            // Don't fetch if we already have it
            if (searchData[key]) return;

            try {
                const data = queryParam
                    ? await fetchGifs(queryParam)
                    : await fetchRandomGifs(4);

                setSearchData((prev) => ({
                    ...prev,
                    [key]: {
                        pages: [data],
                        currentPage: 0,
                    },
                }));
            } catch (err) {
                alert(err.message);
                console.error('Search failed:', err);
            }
        };

        run();
    }, [queryParam]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const encoded = encodeURIComponent(input.trim());
		router.push(`/?query=${encoded}`);
	};

	const handleSetPage = (pageIndex) => {
		setSearchData((prev) => ({
			...prev,
			[activeQuery]: {
				...prev[activeQuery],
				currentPage: pageIndex,
			},
		}));
	};

	const handleLoadMore = async () => {
		try {
			const offset = searchData[activeQuery]?.pages.length * 12;
			const data = await fetchGifs(activeQuery, offset);

			setSearchData((prev) => {
				const prevEntry = prev[activeQuery];
				return {
					...prev,
					[activeQuery]: {
						pages: [...prevEntry.pages, data],
						currentPage: prevEntry.currentPage + 1,
					},
				};
			});
		} catch (err) {
			alert(err.message);
			console.error('Failed to load more:', err);
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center p-4">
			<h1 className="text-2xl font-bold mb-4">GIF Picker</h1>

			<SearchBar input={input} setInput={setInput} onSubmit={handleSubmit} />

			<div className="mb-6 flex flex-wrap justify-center">
				{Object.keys(searchData)
                    .filter((query) => query !== '__RANDOM__')
                    .map((query) => (
                        <SearchTag
                            key={query}
                            label={query}
                            isActive={query === activeQuery}
                            onClick={(label) => {
                                const encoded = encodeURIComponent(label.trim());
                                router.push(`/?query=${encoded}`);
                            }}
                        />
                    ))
                }
			</div>

			<GifGrid
				gifPages={searchData[activeQuery]?.pages || []}
				currentPage={searchData[activeQuery]?.currentPage || 0}
				setCurrentPage={handleSetPage}
				handleLoadMore={handleLoadMore}
				query={activeQuery}
			/>
		</main>
	);
}
