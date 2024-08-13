<script lang="ts">
	import { goto } from "$app/navigation";
    import { languageMap } from "$lib/languages";
    
    let searchInput = "";
    let selectedLang = "";
    let showAlert = false;
    let alertMessage = "";

    export let isModalOpen: boolean;

	function toggleLang(language: string) {
		if (selectedLang === language) {
            selectedLang = "";
        } else {
            selectedLang = language;
            showAlert = false; // Reset showAlert when a language is selected
        }
        console.log('Selected Language:', selectedLang); // Debugging: check the selected language
	}

    function handleSubmit() {
        // Handle form submission logic here
        console.log("Submitting with selected language:", selectedLang);

        // navigate to the language's route
        if (selectedLang) {
            // Close the modal after submission
            isModalOpen = false;
            goto(`/${selectedLang}`);
            selectedLang = "";
        } else {
            showAlert = true;
            alertMessage = "Please select a language!";
        }
    }


</script>

<dialog class="modal" class:modal-open={isModalOpen}>
    <div class="modal-box max-w-xl">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={() => {
            isModalOpen = false; 
            setTimeout(() => {
                selectedLang = "";
                searchInput = "";
            }, 200);
        }}>✕</button>
        <div class="grid grid-cols-3 overflow-y-auto max-h-96 m-3">
            <div class="col-span-3">
                <label class="input input-bordered w-full mb-4 flex items-center gap-2 hover:bg-gray-300 hover:border-gray-300 hover:text-black transition duration-500 ease-in-out">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      class="h-6 w-6 text-gray-400 transition-colors duration-300">
                      <path
                        fill-rule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clip-rule="evenodd" />
                    </svg>
                    <input type="text" class="grow" placeholder="Enter a language" bind:value={searchInput} />
                  </label>
            </div>
            <!-- Loop through each filtered language -->
            {#each Object.keys(languageMap) as language}
            {#if language.includes(searchInput.toLocaleLowerCase())}
                <button
                class={`card h-12 p-1 m-1 justify-center items-center mb-4
                    ${selectedLang === language ? 'bg-accent text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
            on:click={() => toggleLang(language)}
                >
                    <div class="text-center">
                        <h2 class="text-white text-md">{language.charAt(0).toUpperCase() + language.slice(1)}</h2>
                    </div>
                </button>
                {/if}
             {/each}
        </div>
        <div class="flex justify-center mt-4">
            <!-- Change to route of selected language if any -->
            <button class="btn btn-success" on:click={handleSubmit}>Search</button>
        </div>
        <!-- if user submits with no language selected -->
        {#if showAlert}
        <div role="alert" class="alert alert-warning mt-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{alertMessage}</span>
        </div>
        {/if}
    </div>
</dialog>
