// https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=

import { TMDB_API_KEY } from "$env/static/private";
import type { MovieApiResponse, MovieProp } from "$lib";
import { supabase } from "$lib/supabaseClient";

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

    const checkPromises = movies.map(async (movie) => {
        const { data: movieData } = await supabase
            .from("movies")
            .select("*")
            .eq('tmdb_id', movie.id);

        return { movie, exists: movieData && movieData.length > 0 };
    });

    const checkResults = await Promise.all(checkPromises);

    // Filter out the movies that need to be inserted
    const moviesToInsert = checkResults
        .filter(({ exists }) => !exists)
        .map(({ movie }) => ({
            backdrop_path: movie.backdrop_path,
            genre_ids: movie.genre_ids,
            tmdb_id: movie.id,
            original_language: movie.original_language,
            original_title: movie.original_title,
            overview: movie.overview,
            popularity: movie.popularity,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            title: movie.title,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
        }));

    // Batch insert the new movies
    if (moviesToInsert.length > 0) {
        const { error: insertError } = await supabase
            .from("movies")
            .insert(moviesToInsert);

        if (insertError) {
            console.error("Error inserting movies into Supabase:", insertError);
        } else {
            console.log(`Inserted ${moviesToInsert.length} new movies into the database.`);
        }
    } else {
        console.log("No new movies to insert.");
    }
    
    return {
       movies,
    };
};