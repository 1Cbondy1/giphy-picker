const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export async function fetchGifs(query) {
	const encodedQuery = encodeURIComponent(query);
	const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodedQuery}&limit=12&offset=0&rating=g&lang=en`;

	try {
		const response = await fetch(endpoint);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error ${response.status}: ${errorText}`);
		}

		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error('Failed to fetch GIFs:', error);
		throw error;
	}
}
