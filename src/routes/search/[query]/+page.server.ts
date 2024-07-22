// https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=

import { TMDB_API_KEY } from "$env/static/private";
import type { MovieApiResponse, MovieProp } from "$lib";

export const load = async ({ params }) => {
    const query = params.query;

    const request = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${TMDB_API_KEY}`);
    let queryMovies: MovieApiResponse;

    try {
        queryMovies = await request.json();
    } catch (error) {
        console.log(error);
        queryMovies = {
            page: 1,
            results: [],
            total_pages: 0,
            total_results: 0,
        };
    }

    const movies: MovieProp[] = queryMovies.results;

    movies.sort((a, b) => b.popularity - a.popularity);

    return {
       movies,
    };
};