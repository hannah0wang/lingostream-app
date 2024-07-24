<!-- src/routes/search/[query]/+page.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import LargeMovieCard from '$lib/components/LargeMovieCard.svelte';
	import MovieCard from '$lib/components/MovieCard.svelte';

    export let data;

    console.log(data.movies);

	$: query = $page.params.query;
	// $: console.log(query);

</script>

<div class="max-w-7xl mx-auto bg-[#0F1117] mt-2">
    <div class="max-w-6xl mx-auto">
        <main class="sm:p-16 py-16 px-8 flex flex-col gap-10">
            <div class="flex items-center mb-4">
                <h1 class="font-bold text-2xl mr-10">Search results for "{query.replace(/\+/g, ' ')}"</h1>
            </div>
            <section class="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {#each data.movies as movie (movie.id)}
                    {#if movie.poster_path && movie.release_date}
                        <MovieCard movieData={movie} displayEng={true} />
                    {/if}
                {/each}
            </section>
        </main>
    </div>
</div>