<script lang="ts">
	import { page } from "$app/stores";
	import { languageMap } from "$lib/languages.js";
	import { onDestroy, onMount } from "svelte";
	import { parseSRT } from "$lib/utils/srtToSubtitle.js";
	import MovieActions from "$lib/components/MovieActions.svelte";
  
	export let data;
  
	let { srtContent } = data;
	let subtitles = parseSRT(srtContent);
  
	$: selectedLang = $page.params.language;
	$: movieTitle = $page.params.movie_title.replace(/-\d+$/, '').replace(/-/g, ' ') || '';
  
	const movieId = (() => {
	  const match = $page.url.pathname.match(/-(\d+)$/);
	  return match ? match[1] : '';
	})();
  
	let movieURL = `https://vidsrc.xyz/embed/movie?tmdb=${movieId}&ds_lang=${languageMap[selectedLang]}`;
  
	
  </script>
  
  <div class="min-h-screen bg-black mt-2 relative">
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

	<div class="ml-2">
		<MovieActions />
	</div>
  </div>