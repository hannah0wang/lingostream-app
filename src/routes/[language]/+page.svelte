<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
    import MovieCard from "$lib/components/MovieCard.svelte";
	import { languageMap } from "$lib/languages.js";

    export let data;

    export let selectedLang = "";
    let activeTab = 2; // Tab 2 is initially active
    let displayEng = false;
    
    // pagination 
    // let lastPage = (data.movies.total_results / 20 < 100)? (data.movies.total_results / 20) : 100;
    let current = 1;
    let num_items = 20;
    let per_page = 3;

    // Access the URL parameter
    $: {
        selectedLang = $page.params.language;
        if (!Object.keys(languageMap).includes(selectedLang)) {
            goto('/'); // Redirect to the home page or an error page if the language is invalid
        }
    }

    const toggleLangTab = (tabNumber: number) => {
        activeTab = tabNumber;
        if (activeTab === 1) {
            displayEng = true;
        }
    };
    
    console.log(data);
    
</script>

<div class="max-w-7xl mx-auto bg-[#0F1117] mt-2">
    <div class="max-w-6xl mx-auto">
        <main class="sm:p-16 py-16 px-8 flex flex-col gap-10">
            <div class="flex items-center mb-4">
                <h1 class="font-bold text-2xl mr-10">Movies in {selectedLang.charAt(0).toUpperCase() + selectedLang.slice(1)}</h1>
                <!-- title language display toggle -->
                <div role="tablist" class="tabs tabs-boxed">
                    <a role="tab" class="tab" class:tab-active={activeTab === 1} on:click={() => toggleLangTab(1)}>English</a>
                    <a role="tab" class="tab" class:tab-active={activeTab === 2} on:click={() => toggleLangTab(2)}>{selectedLang.charAt(0).toUpperCase() + selectedLang.slice(1)}</a>
                </div>
            </div>
            <section class="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {#each data.movies.results as movie (movie.id)}
                    <MovieCard movieData={movie} />
                {/each}
            </section>
        </main>
    </div>
</div>


