import type { Subtitle } from "$lib";

export const parseSRT = (srtContent: string): Subtitle[] => {
    const subtitles: Subtitle[] = [];
    const entries = srtContent.split('\n\n');
    
    for (const entry of entries) {
        const lines = entry.split('\n');
        if (lines.length < 3) continue;

        const timeMatch = lines[1].match(/(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/);
        if (!timeMatch) continue;

        const startTime = parseInt(timeMatch[1]) * 3600 * 1000 +
                          parseInt(timeMatch[2]) * 60 * 1000 +
                          parseInt(timeMatch[3]) * 1000 +
                          parseInt(timeMatch[4]);

        const endTime = parseInt(timeMatch[5]) * 3600 * 1000 +
                        parseInt(timeMatch[6]) * 60 * 1000 +
                        parseInt(timeMatch[7]) * 1000 +
                        parseInt(timeMatch[8]);

        const text = lines.slice(2).join(' ');

        subtitles.push({ startTime, endTime, text });
    }

    return subtitles; // as array of Subtitles
};