<script lang="ts">
	import { page } from "$app/stores";
	import { languageMap } from "$lib/languages.js";
	import { onMount } from "svelte";
	import { derived } from "svelte/store";

    export let data;

    let { supabase } = data; // destructure these from data object
    $: ({ supabase } = data);

    $: selectedLang = $page.params.language;
    $: movieTitle = $page.params.movie_title.replace(/-\d+$/, '').replace(/-/g, ' ') || '';

    let srtSubtitles = data.srtContent;

    const movieId = (() => {
        // Example route pattern: /en/hidden-desire-298094
        const match = $page.url.pathname.match(/-(\d+)$/); // Match numbers after last hyphen
        return match ? match[1] : '';
    })();

    async function saveSubtitles() {
        const {data: subtitleData, error: subtitleError } = await supabase.from("subtitles").select("*").eq('tmdb_id', movieId);
            
        if(subtitleData?.length == 0) { // if profileData has length 0, then insert data (create new row)
            const { data, error} = await supabase
                .from("subtitles")
                .insert({ tmdb_id: movieId, language: languageMap[selectedLang], title: movieTitle, srt_subtitles: srtSubtitles }) 
        }
    }

    onMount(() => {
        saveSubtitles();
    });

    //console.log(movieId);
    //console.log($page.url.pathname);

    //1001311
    let movieURL = `https://2embed.org/embed/movie/${movieId}`;

    console.log(data.srtContent?.slice(0, 100));


    
</script>


<div class="min-h-screen bg-black mt-2">
    <!-- Full-width iframe -->
    <iframe
        src={movieURL}
        width="100%"
        height="360px"
        frameborder="0"
        scrolling="no"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="movie"
        allowfullscreen
    ></iframe>
</div>