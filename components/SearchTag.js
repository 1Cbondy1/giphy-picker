import React from 'react';

export default function SearchTag({ label, onClick, isActive = false }) {
	return (
		<button
			onClick={() => onClick(label)}
			className={`cursor-pointer text-sm px-3 py-1 mr-2 mb-2 rounded-full transition
				${isActive ? 'bg-secondary hover:bg-secondaryHover' : 'bg-primary text-black hover:bg-primaryHover'}`}
		>
			{label}
		</button>
	);
}