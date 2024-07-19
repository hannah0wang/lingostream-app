import { TMDB_ACCESS_TOKEN } from "$env/static/private";
import type { MovieApiResponse } from "$lib";
import { languageMap } from "$lib/languages";

export const load = async ({ params }) => {
    const selectedLang = params.language;
    const pageNumber = params.page;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        }
    };

    const request = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&with_original_language=${languageMap[selectedLang]}`, options);
    let movies: MovieApiResponse;

    try {
        movies = await request.json() as MovieApiResponse;
    } catch (error) {
        console.log(error);
        movies = {
            page: 1,
            results: [],
            total_pages: 0,
            total_results: 0,
        };
    }

    return {
       movies,
    };
};


// export const getGenreList = async (genre_id: number) => {

// }

// export const getMovieDetails = async () => {
    
// }