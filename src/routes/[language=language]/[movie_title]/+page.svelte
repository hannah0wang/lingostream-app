<script lang="ts">
	import { page } from "$app/stores";
	import { languageMap } from "$lib/languages.js";
	import { onDestroy, onMount } from "svelte";
	import { derived } from "svelte/store";
    import { parseSRT } from "$lib/utils/srtToSubtitle.js";
	import MovieActionBar from "$lib/components/MovieActionBar.svelte";
	import SubtitleContainer from "$lib/components/SubtitleContainer.svelte";

    export let data;

    // let { srtContent } = data;
	
    let { supabase, session, srtContent } = data; // destructure these from data object
    $: ({ supabase, session, srtContent } = data); // reactive statement - listen to changes 
	
    let subtitles = parseSRT(srtContent);

    $: selectedLang = $page.params.language;
    $: movieTitle = $page.params.movie_title.replace(/-\d+$/, '').replace(/-/g, ' ') || '';

	let timer: number | undefined;
	let currentSubtitleIndex = 0;

	let startTime = 0;

    const movieId = (() => {
        // Example route pattern: /en/hidden-desire-298094
        const match = $page.url.pathname.match(/-(\d+)$/); // Match numbers after last hyphen
        return match ? match[1] : '';
    })();

    //console.log(movieId);
    //console.log($page.url.pathname);
    //1001311
    //let movieURL = `https://2embed.org/embed/movie/${movieId}`;

	//Detailed representation of the API endpoints for Vidsrc includes comprehensive information regarding the available methods, request formats, required parameters and optional parameters.
	//Use one of these domains for embed urls:
	//vidsrc.in , vidsrc.pm , vidsrc.xyz , vidsrc.net
	let movieURL = `https://vidsrc.xyz/embed/movie?tmdb=${movieId}&ds_lang=${languageMap[selectedLang]}`


    //console.log(subtitles.slice(0, 100));
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
	<MovieActionBar {movieId} {data} lang={selectedLang} />
    <SubtitleContainer {movieId} />
</div>