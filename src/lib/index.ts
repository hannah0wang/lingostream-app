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

export type OpenSubtitlesResponse = {
    data: {
        attributes: {
            files: {
                file_id: number;
            }[];
        };
    }[];
}

export type OpenSubtitlesData = {
    file_id: number;
}

export type OpenSubtitlesDownloadData = {
    "link": string,
    "file_name": string,
    "requests": number,
    "remaining": number,
    "message": string,
    "reset_time": string,
    "reset_time_utc": string,
}