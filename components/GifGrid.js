'use client';
import GifCard from './GifCard';
import NavButton from './NavButton';
import { useState, useEffect } from 'react';

export default function GifGrid({
	gifPages,
	currentPage,
	setCurrentPage,
	handleLoadMore,
	query
}) {
	const [copiedId, setCopiedId] = useState(null);

	useEffect(() => {
		setCopiedId(null); // reset copied state when query changes
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

	const gifs = gifPages[currentPage] || [];

	return (
		<div className="w-full max-w-[1280px] px-4 mx-auto flex">
			{/* Left Button */}
			<div className="w-[80px] flex justify-center">
				{currentPage > 0 && (
					<div className="fixed left-4 w-[80px] top-1/2 -translate-y-1/2 z-50 flex justify-center">
						<NavButton color="gray" onClick={() => setCurrentPage(currentPage - 1)}>←</NavButton>
					</div>
				)}
			</div>

			{/* Center GIF Grid */}
			<div className="flex-1 [column-width:250px] [column-gap:1rem] min-h-[calc(100vh-160px)]">
				{gifs.map((gif) => (
					<GifCard
						key={gif.id}
						gif={gif}
						isCopied={copiedId === gif.id}
						onCopy={handleCopy}
					/>
				))}
			</div>

			{/* Right Button */}
			<div className="w-[80px] flex justify-center">
				<div className="fixed right-4 w-[80px] top-1/2 -translate-y-1/2 z-50 flex justify-center">
                    {query !== '__RANDOM__' && (
                        currentPage < gifPages.length - 1 ? (
                            <NavButton onClick={() => setCurrentPage(currentPage + 1)}>→</NavButton>
                        ) : (
                            <NavButton color="green" onClick={handleLoadMore}>→</NavButton>
                        )
                    )}
				</div>
			</div>
		</div>
	);
}
