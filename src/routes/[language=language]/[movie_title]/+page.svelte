<script lang="ts">
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
    let movieURL = `https://2embed.org/embed/movie/${movieId}`;


    //console.log(subtitles.slice(0, 100));

    function syncSubtitles() {
		const subtitleElement = document.getElementById('subtitles');
		const iframeElement = document.querySelector('iframe');
		const videoElement = iframeElement?.contentWindow?.document.querySelector('video') as HTMLVideoElement | null;

		if (subtitleElement && videoElement) {
			const currentTime = videoElement.currentTime;

			// Find the appropriate subtitle for the current time
			const currentSubtitle = subtitles.find(
				(sub) => currentTime >= sub.startTime / 1000 && currentTime <= sub.endTime / 1000
			);

			if (currentSubtitle) {
				subtitleElement.innerHTML = currentSubtitle.text
					.split(' ')
					.map((word) => `<span class="clickable">${word}</span>`)
					.join(' ');
			} else {
				subtitleElement.innerHTML = '';
			}
		}
	}

	function startSync() {
		if (timer) {
			clearInterval(timer);
		}
		timer = window.setInterval(syncSubtitles, 500);
	}

	onMount(() => {
		const iframeElement = document.querySelector('iframe');
		if (iframeElement) {
			iframeElement.onload = () => {
				startSync();
				iframeElement.contentWindow?.addEventListener('click', startSync);
			};
		}
	});

	onDestroy(() => {
		if (timer) {
			clearInterval(timer);
		}
	});
    
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
    <button
		id="overlayButton"
		class="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
		on:click={() => {
			const overlayButton = document.getElementById('overlayButton');
			if (overlayButton) {
				overlayButton.style.pointerEvents = 'auto';
			}
		}}
		on:mouseleave={() => {
			const overlayButton = document.getElementById('overlayButton');
			if (overlayButton) {
				overlayButton.style.pointerEvents = 'none';
			}
		}}
	></button>
</div>