'use client';
import React from 'react';

export default function SearchTag({ label, onClick, isActive = false }) {
	return (
		<button
			onClick={() => onClick(label)}
			className={`text-sm px-3 py-1 mr-2 mb-2 rounded-full transition 
				${isActive ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
		>
			{label}
		</button>
	);
}