<script lang="ts">
    import { goto } from '$app/navigation';

    export let currentPage: number;
    export let lastPage: number;

    $: inputPage = currentPage.toString();

    function incrementPage() {
        if (currentPage < lastPage)
            goto(`${currentPage + 1}`);
    }

    function decrementPage() {
        if (currentPage > 1)
            goto(`${currentPage - 1}`);
    }

    function handlePageSearch(event: Event) {
        event.preventDefault(); // Prevent default form submission
        if (parseInt(inputPage, 10) < 1) {
            inputPage = '1';
        }
        if (parseInt(inputPage, 10) > lastPage) {
            inputPage = lastPage.toString();
        }
        goto(`${isNaN(parseInt(inputPage))? currentPage : inputPage}`);
        inputPage = currentPage.toString();
    }
</script>

<div class="flex justify-between items-center mx-auto mr-0 p-4">
    <!-- Centered buttons -->
    <div class="flex items-center gap-4 flex-grow justify-center">
        {#if currentPage > 1}
            <button class="btn btn-ghost flex items-center gap-2 text-white" on:click={decrementPage}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" class="w-5 h-5">
                    <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Previous page
            </button>
        {/if}
        {#if currentPage < lastPage}
            <button class="btn btn-primary flex items-center gap-2 text-black" on:click={incrementPage}>
                Next page
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" class="w-5 h-5">
                    <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        {/if}
    </div>

    <!-- Right side: Page input and navigation buttons -->
    <div class="flex items-center gap-2 ml-40">
        <form on:submit={handlePageSearch} class="flex items-center space-x-2">
            <label class="input input-bordered flex items-center h-8 gap-2 bg-gray-300 p-1 rounded">
                <input
                    type="text"
                    class="w-10 text-center bg-transparent text-black rounded border-none appearance-none"
                    placeholder={currentPage.toString()}
                    bind:value={inputPage}
                />
            </label>
            <span class="text-lg">of {lastPage}</span>
        </form>

        <div class="flex gap-2">
            <button class="btn btn-ghost rounded-full w-10 h-10 flex items-center justify-center text-white" on:click={decrementPage}>❮</button>
            <button class="btn btn-ghost rounded-full w-10 h-10 flex items-center justify-center text-white" on:click={incrementPage}>❯</button>
        </div>
    </div>
</div>
