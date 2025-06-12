const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export const fetchGifs = async (query, offset = 0) => {
	const limit = 12;
	const url = `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(query)}&api_key=${API_KEY}&limit=${limit}&offset=${offset}&rating=g&lang=en`;

	try {
		const res = await fetch(url);
		const json = await res.json();

		// Check for Giphy's rate limit response
		if (res.status === 429 || json?.meta?.status === 429) {
			throw new Error('API limit reached — please try again later.');
		}

		if (!res.ok) {
			const msg = json?.meta?.msg || 'Unknown error';
			throw new Error(`Error ${res.status}: ${msg}`);
		}

		return json.data;
	} catch (err) {
		console.error('Failed to fetch GIFs:', err);
		throw err;
	}
};
