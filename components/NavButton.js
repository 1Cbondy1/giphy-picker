'use client';
import React from 'react';

export default function NavButton({ color = 'gray', onClick, children }) {
	const baseColor = color === 'gray' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-600 hover:bg-green-500';

	return (
		<button
			onClick={onClick}
			className={`w-12 h-12 rounded-full text-2xl text-white shadow ${baseColor} flex items-center justify-center`}
		>
			{children}
		</button>
	);
}