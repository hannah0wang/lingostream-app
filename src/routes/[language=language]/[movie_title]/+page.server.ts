import { OPEN_SUBTITLES_API_KEY } from "$env/static/private";
import type { OpenSubtitlesResponse, OpenSubtitlesData, OpenSubtitlesDownloadData } from "$lib";
import { languageMap } from "$lib/languages";

export const load = async ({ params }) => {
    const selectedLang = params.language;
    const movieId = (() => {
        const match = params.movie_title.match(/-(\d+)$/); // Match numbers after last hyphen
        return match ? match[1] : '';
    })();

    const options = {
        method: 'GET',
        headers: { 'User-Agent': 'lingostream v1.0.0', 'Api-Key': OPEN_SUBTITLES_API_KEY }
    };

    // First, get the file ID of the requested movie
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

    console.log(fileId);

    // Request for download link if fileId fetch is successful
    let downloadData: OpenSubtitlesDownloadData | null = null;

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
            downloadData = await response.json();
            console.log(downloadData);
        } catch (error) {
            console.error("Error fetching download link:", error);
        }
    }


    // get the srt file content
    let srtContent: string | null = null;

    if (downloadData) {
        const srtResponse = await fetch(downloadData.link);
        if (srtResponse.ok) {
            srtContent = await srtResponse.text();
        } else {
            console.error("Error fetching SRT content:", srtResponse.statusText);
        }
    }

    console.log(srtContent?.slice(0, 500));
    
    return {
        srtContent,
    };
};
