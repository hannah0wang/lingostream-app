<script lang="ts">
	import FilmSearch from "$lib/components/FilmSearch.svelte";

</script>
<div class="flex min-h-screen flex-col" data-theme="sunset">
    <div class="st-dark-theme flex flex-col pt-10 text-white">
        <h1 class="font-bold text-6xl pt-5 pl-10">Discover a new way to learn languages.</h1>
        <p class="py-6 mx-auto text-4xl pb-10 pl-10 pr-20"> 
            Explore interactive movie transcripts. Click any word to instantly see its English translation. 
            Immerse yourself in authentic language learning, one movie at a time.</p>
    </div>
    <div class="flex justify-center gap-16 py-10 pt-15">
        <div class="text-center max-w-xs">
            <img 
                src="./global.png"
                alt="globe"
                class="h-20 object-contain mx-auto"
            />
            <h1 class="font-bold text-xl py-5">Diverse selection of languages</h1>
            <p class="max-w-xs px-5 mx-auto">Explore foreign language films of various genres and cultures.</p>
        </div>
        <div class="text-center max-w-xs">
            <img 
                src="./translate.png"
                alt="translate"
                class="h-20 object-contain mx-auto"
            />
            <h1 class="font-bold text-xl py-5">Interactive movie transcripts</h1>
            <p class="max-w-xs px-5 mx-auto">Click any word to instantly see its English translation.</p>
        </div>
        <div class="text-center max-w-xs">
            <img 
                src="./save.png"
                alt="save"
                class="h-20 object-contain mx-auto"
            />
            <h1 class="font-bold text-xl py-5">Save and review from transcripts</h1>
            <p class="max-w-xs px-5 mx-auto">Expand your vocabulary by saving new words to your library.</p>
        </div>
    </div>
</div>
