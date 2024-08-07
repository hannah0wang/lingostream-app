<script lang="ts">
	import { Popover, Button } from 'flowbite-svelte';
	import { page } from "$app/stores";
	import { languageMap } from "$lib/languages.js";
	import { onDestroy, onMount } from "svelte";
	import { derived } from "svelte/store";
    import { parseSRT } from "$lib/utils/srtToSubtitle.js";

    export let data;

    let { srtContent } = data;
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

	<ul class="menu menu-horizontal mt-6 rounded-box bg-base-200 opacity-70 hover:opacity-100 hover:bg-base-300 transition-all duration-300 ml-5">
		<li class="transition-opacity duration-300">
		  <a class="tooltip" data-tip="Save">
			<svg
			  class="h-5 w-5 text-gray-500 hover:text-gray-300"
			  viewBox="0 -0.5 25 25"
			  fill="none"
			  xmlns="http://www.w3.org/2000/svg"
			>
			  <path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			  />
			</svg>
		  </a>
		</li>
		<li class="transition-opacity duration-300">
		  <a id="details-popover" class="tooltip" data-tip="Details">
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  class="h-5 w-5 text-gray-500 hover:text-gray-300"
			  fill="none"
			  viewBox="0 0 24 24"
			  stroke="currentColor"
			>
			  <path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			  />
			</svg>
		  </a>
		</li>
		<li class="transition-opacity duration-300">
		  <a class="tooltip" data-tip="Stats">
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  class="h-5 w-5 text-gray-500 hover:text-gray-300"
			  fill="none"
			  viewBox="0 0 24 24"
			  stroke="currentColor"
			>
			  <path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
			  />
			</svg>
		  </a>
		</li>
	  </ul>
	  <Popover class="w-64 text-sm font-light " title="Popover title" triggeredBy="#details-popover" placement="bottom" trigger="click">And here's some amazing content. It's very engaging. Right?</Popover>
</div>