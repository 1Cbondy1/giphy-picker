'use client';
import { useState } from 'react';

import GifCard from './GifCard';
import NavButton from './NavButton';

import { SearchTags, NavButtonType } from '@/lib/constants';

export default function GifGrid({
	gifPages,
	currentPage,
	setCurrentPage,
	handleLoadMore,
	query,
}) {

    const [copiedId, setCopiedId] = useState(null);

	// If no pages are loaded yet, show nothing
	if (!gifPages || gifPages.length === 0) return null;

	const currentGifs = gifPages[currentPage] || [];
	const isRandom = query === SearchTags.RANDOM;

    const handleCopy = async (gif) => {
        try {
            await navigator.clipboard.writeText(gif.images.preview.mp4);
            setCopiedId(gif.id);
            setTimeout(() => setCopiedId(null), 1500);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

	return (
		<div className="w-full max-w-[1280px] px-4 mx-auto flex">
			{/* Left Navigation Column */}
			<div className="w-[100px] flex justify-center">
				{!isRandom && currentPage > 0 && (
					<div className="fixed left-2 w-[100px] top-1/2 -translate-y-1/2 z-50 flex justify-center">
						<NavButton type={NavButtonType.NAV} onClick={() => setCurrentPage(currentPage - 1)}>
							←
						</NavButton>
					</div>
				)}
			</div>

			{/* Center Grid Column */}
			<div className="flex-1 [column-width:250px] [column-gap:1rem] min-h-[calc(100vh-160px)]">
				{currentGifs.map((gif) => (
                    <GifCard
                        key={gif.id}
                        gif={gif}
                        isCopied={copiedId === gif.id}
                        onCopy={() => handleCopy(gif)}
                    />
				))}
			</div>

			{/* Right Navigation Column */}
			<div className="w-[100px] flex justify-center">
				{!isRandom && (
					<div className="fixed right-2 w-[100px] top-1/2 -translate-y-1/2 z-50 flex justify-center">
						{currentPage < gifPages.length - 1 ? (
							<NavButton type={NavButtonType.NAV} onClick={() => setCurrentPage(currentPage + 1)}>→</NavButton>
						) : (
							<NavButton type={NavButtonType.LOAD} onClick={handleLoadMore}>→</NavButton>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
