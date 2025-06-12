import React from 'react';

export default function GifCard({ gif, isCopied, onCopy }) {
	const mp4 = gif?.images?.preview?.mp4;
	if (!mp4) return null;

	return (
		<div
			className="relative mb-4 break-inside-avoid w-full cursor-pointer"
			onClick={() => onCopy(gif)}
		>
			<video
				src={mp4}
				autoPlay
				loop
				muted
				playsInline
				className={`rounded shadow w-full transition-opacity duration-300 ${
					isCopied
						? 'outline outline-4 outline-outline animate-outline-draw'
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
}
