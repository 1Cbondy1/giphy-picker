'use client';
import React from 'react';

import { NavButtonType } from '@/lib/constants';

export default function NavButton({ type, onClick, children }) {
	const baseColor = type === NavButtonType.NAV ? 'bg-primary hover:bg-primaryHover text-black' : 'bg-secondary hover:bg-secondaryHover';

	return (
		<button
			onClick={onClick}
			className={`cursor-pointer w-12 h-12 rounded-full text-2xl shadow ${baseColor} flex items-center justify-center`}
		>
			{children}
		</button>
	);
}