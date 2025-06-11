'use client';
import { useEffect, useState } from 'react';
import { fetchGifs } from '@/lib/fetchGifs';

export default function GifGrid({ query }) {
	const [gifs, setGifs] = useState([]);
	const [error, setError] = useState(null);
	const [copiedId, setCopiedId] = useState(null);

	useEffect(() => {
		if (!query) return;

		const loadGifs = async () => {
			try {
				const data = await fetchGifs(query);
				setGifs(data);
			} catch (err) {
				setError(err.message || 'Something went wrong');
			}
		};

		loadGifs();
	}, [query]);

	const handleCopy = async (gif) => {
		try {
			await navigator.clipboard.writeText(gif.images.preview.mp4);
			setCopiedId(gif.id);
			setTimeout(() => setCopiedId(null), 3000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	if (!query) return null;

	return (
		<div
			className="w-full max-w-[1280px] px-4 mx-auto"
			style={{
				columnWidth: '300px',
				columnGap: '1rem',
				minHeight: 'calc(100vh - 160px)',
			}}
		>
			{error && (
				<p className="text-red-600 text-center col-span-full">{error}</p>
			)}
			{gifs.map((gif) => {
				const mp4 = gif?.images?.preview?.mp4;
				if (!mp4) return null;

				const isCopied = copiedId === gif.id;

				return (
					<div
						key={gif.id}
						className="relative mb-4 break-inside-avoid w-full cursor-pointer"
						onClick={() => handleCopy(gif)}
					>
						<video
							src={mp4}
							autoPlay
							loop
							muted
							playsInline
							className={`rounded shadow w-full transition-all duration-300 ${
								isCopied
									? 'outline outline-4 outline-green-500 animate-outline-draw'
									: ''
							}`}
						/>

                        {isCopied && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-lg font-semibold rounded animate-fade-overlay">
                                Copied to Clipboard
                            </div>
                        )}
					</div>
				);
			})}
		</div>
	);
}
