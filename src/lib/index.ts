// place files you want to import through the `$lib` alias in this folder.

export type MovieProp = {
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    vote_average: number,
    vote_count: number,
}

export type MovieApiResponse = {
    page: number;
    results: MovieProp[];
    total_pages: number;
    total_results: number;
}