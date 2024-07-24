import { OPEN_SUBTITLES_API_KEY } from "$env/static/private";
import type { OpenSubtitlesResponse, OpenSubtitlesData, OpenSubtitlesDownloadData } from "$lib";
import { languageMap } from "$lib/languages";
import { supabase } from '$lib/supabaseClient';

export const load = async ({ params }) => {
    const selectedLang = params.language;
    const movieId = (() => {
        const match = params.movie_title.match(/-(\d+)$/); // Match numbers after last hyphen
        return match ? match[1] : '';
    })();
    const movieTitle = params.movie_title.replace(/-\d+$/, '').replace(/-/g, ' ') || '';

    // Check if subtitles are already in the database
    const { data: subtitleData } = await supabase.from("subtitles").select("*").eq('tmdb_id', movieId).eq('language', languageMap[selectedLang]);

    let srtContent = '';

    if (subtitleData && subtitleData.length > 0) {
        // If subtitles are found in the database, use them
        srtContent = subtitleData[0].srt_subtitles;
        console.log("subtitles fetched from db for", movieTitle);
    } else {
        // Otherwise, fetch from OpenSubtitles API
        const options = {
            method: 'GET',
            headers: { 'User-Agent': 'lingostream v1.0.0', 'Api-Key': OPEN_SUBTITLES_API_KEY }
        };

        let fileId: OpenSubtitlesData = { file_id: -1 };

        try {
            const request = await fetch(`https://api.opensubtitles.com/api/v1/subtitles?tmdb_id=${movieId}&languages=${languageMap[selectedLang]}`, options);
            const subtitleData: OpenSubtitlesResponse = await request.json();

            if (subtitleData.data.length > 0 && subtitleData.data[0].attributes.files.length > 0) {
                fileId = { file_id: subtitleData.data[0].attributes.files[0].file_id };
            }
        } catch (error) {
            console.error("Error fetching file ID:", error);
        }

        if (fileId.file_id !== -1) {
            const downloadOptions = {
                method: 'POST',
                headers: {
                    'User-Agent': 'lingostream v1.0.0',
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Api-Key': OPEN_SUBTITLES_API_KEY,
                },
                body: JSON.stringify({ file_id: fileId.file_id })
            };

            try {
                const response = await fetch('https://api.opensubtitles.com/api/v1/download', downloadOptions);
                const downloadData: OpenSubtitlesDownloadData = await response.json();
                if (downloadData && downloadData.link) {
                    const srtResponse = await fetch(downloadData.link);
                    if (srtResponse.ok) {
                        srtContent = await srtResponse.text();
                    } else {
                        console.error("Error fetching SRT content:", srtResponse.statusText);
                    }
                }
            } catch (error) {
                console.error("Error fetching download link:", error);
            }
        }

        if (srtContent) {
            const { error } = await supabase
                .from("subtitles")
                .insert({ tmdb_id: movieId, language: languageMap[selectedLang], title: movieTitle, srt_subtitles: srtContent });

            console.log("inserted new subtitles for", movieTitle);

            if (error) {
                console.error("Error inserting subtitles into database:", error);
            }
        }
    }

    return {
        srtContent,
    };
};
