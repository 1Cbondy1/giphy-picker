'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function SearchBar() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const initialQuery = searchParams.get('query') || '';
	const [inputValue, setInputValue] = useState(initialQuery);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const params = new URLSearchParams(searchParams);
			if (inputValue.trim()) {
				params.set('query', inputValue);
			} else {
				params.delete('query');
			}
			router.push(`${pathname}?${params.toString()}`);
		}, 1000); // 1000ms debounce

		return () => clearTimeout(timeout);
	}, [inputValue]);

	return (
		<input
			type="text"
			value={inputValue}
			onChange={(e) => setInputValue(e.target.value)}
			placeholder="Search GIFs"
			className="w-full max-w-md px-4 py-2 mb-6 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-outline text-black"
		/>
	);
}
