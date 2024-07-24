<script lang="ts">
	import { page } from "$app/stores";
    import MovieCard from "$lib/components/MovieCard.svelte";
	import Pagination from "$lib/components/Pagination.svelte";

    export let data;

    let selectedLang = "";
    let pageNumber = 1;
    let lastPage = (Math.ceil(data.movies.total_results / 20) < 100)? Math.ceil(data.movies.total_results / 20) : 100;

    let activeTab = 2; // Tab 2 (original language) is initially active
    let displayEng = false;

    // Access the URL parameter
    $: selectedLang = $page.params.language;
    $: pageNumber = parseInt($page.params.page, 10) || 1; // Fallback to 1 if not valid

    const toggleLangTab = (tabNumber: number) => {
        activeTab = tabNumber;
        displayEng = (activeTab === 1);
    };
    
    //console.log(data);

</script>

<div class="max-w-7xl mx-auto bg-[#0F1117] mt-2">
    <div class="max-w-6xl mx-auto">
        <main class="sm:p-16 py-16 px-8 flex flex-col gap-10">
            <div class="flex items-center mb-4">
                <h1 class="font-bold text-2xl mr-10">Movies in {selectedLang.charAt(0).toUpperCase() + selectedLang.slice(1)}</h1>
                <!-- title language display toggle -->
                {#if selectedLang !== 'english'}
                    <div role="tablist" class="tabs tabs-boxed">
                        <a role="tab" class="tab" class:tab-active={activeTab === 1} on:click={() => toggleLangTab(1)}>English</a>
                        <a role="tab" class="tab" class:tab-active={activeTab === 2} on:click={() => toggleLangTab(2)}>{selectedLang.charAt(0).toUpperCase() + selectedLang.slice(1)}</a>
                    </div>
                {/if}
            </div>
            <section class="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {#each data.movies.results as movie (movie.id)}
                    {#if movie.poster_path}
                        <MovieCard movieData={movie} {displayEng} />
                    {/if}
                {/each}
            </section>
            <!-- <div class="flex justify-center items-center mb-6 mt-[-10px]">
                <PaginateItems
                    lastPage={lastPage} 
                    centerSize={3}
                    sideSize={2} 
                    previousLabel="❮"
                    nextLabel="❯"
                    firstLabel="❮❮"
                    lastLabel="❯❯"
                    slug="[page=int]" 
                />
            </div> -->
            <Pagination currentPage={pageNumber} lastPage={lastPage}  />
        </main>
    </div>
</div>

<!-- 
<style>
    div {
      /* Container styling to center and space pagination */
    }
    div :global(.paginate-page-link) {
      @apply mx-1 px-2 py-2 cursor-pointer rounded-xl text-gray-700 bg-transparent text-center shadow-sm transition duration-200 ease-in-out hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95;
      @apply h-10 w-10; /* Ensure uniform button size */
    }
    div :global(.paginate-navigation) {
      @apply inline-block cursor-pointer rounded-xl bg-transparent px-3 py-2.5 text-center text-sm text-gray-700 transition duration-200 ease-in-out hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95;
      @apply h-10 w-10; /* Ensure uniform button size */
    }
    div :global(.paginate-rest-indicator) {
      @apply mx-1 px-3 py-2 text-gray-500;
      @apply h-10 w-10; /* Ensure uniform button size */
    }
    div :global(.paginate-current-page) {
      @apply inline-block cursor-pointer rounded-xl bg-gray-700 px-3 py-2.5 text-center text-sm text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95;
      @apply h-10 w-10; /* Ensure uniform button size */
    }
  </style> -->