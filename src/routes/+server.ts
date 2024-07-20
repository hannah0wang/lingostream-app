// src/routes/api/search-movies.ts
import { json } from '@sveltejs/kit';
import { TMDB_ACCESS_TOKEN } from '$env/static/private';

export const POST = async ({ request }) => {
    const { query } = await request.json();

    if (!query) {
        return json({ results: [] });
    }

    const encodedQuery = query.replace(/ /g, '+');
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        }
    };

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodedQuery}`, options);
    const movies = await response.json();

    return json(movies);
};
