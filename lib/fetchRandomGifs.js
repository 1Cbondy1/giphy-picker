const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export async function fetchRandomGifs(count = 4) {
	const promises = Array.from({ length: count }).map(() =>
		fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&rating=g`)
			.then((res) => res.json())
			.then((data) => data.data)
	);

	return Promise.all(promises);
}