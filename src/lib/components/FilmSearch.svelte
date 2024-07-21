<!-- autocomplete search not implemented -->
<script lang="ts">
    import debounce from 'debounce';
    import { Input } from 'flowbite-svelte';
    let query = '';
    let movieResults: any[] = [];

    async function fetchMovies() {
        if (query.length === 0) {
            movieResults = [];
            return;
        }

        const response = await fetch('/api/search-movies', {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: {
                'content-type': 'application/json'
            }
        });

        movieResults = await response.json();
    }

    const debouncedFetchMovies = debounce(fetchMovies, 300);

    function handleInput(event: Event) {
        query = (event.target as HTMLInputElement).value;
        debouncedFetchMovies();
    }
</script>


<div class="max-w-lg mx-auto mt-10">
    <Input
        type="text"
        bind:value={query}
        on:input={handleInput}
        placeholder="Search for a movie..."
        class="input input-bordered w-full"
    />

    {#if movieResults.length > 0}
        <div class="border border-gray-300 rounded-lg max-h-48 overflow-y-auto mt-2 bg-white">
            {#each movieResults as movie}
                <div class="p-2 cursor-pointer bg-gray-200;">
                    {movie.title}
                </div>
            {/each}
        </div>
    {/if}
</div>
