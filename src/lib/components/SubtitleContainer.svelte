<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let movieId: string;

	let displayedSubtitles = writable<string[]>([]);
	let allSubtitles: string[] = [];
	let increment = 50; // Number of subtitles to load at a time
	let lastLoadedIndex = 0;
    let selectedText = "";

	async function loadSubtitles() {
		const { data: subtitleData } = await supabase
			.from('subtitles')
			.select('srt_subtitles')
			.eq('tmdb_id', movieId);

		if (subtitleData && subtitleData.length > 0) {
			// Split the subtitles by newlines and clean each subtitle block
			allSubtitles = subtitleData[0].srt_subtitles.split('\n\n').map(cleanSubtitle);

			loadMoreSubtitles();
		}
	}

	function cleanSubtitle(subtitle: string): string {
		return subtitle
			.replace(/^\d+\n/, '') // Remove the index number
			.replace(/(\d{2}:\d{2}:\d{2}),\d{3}/g, '$1') // Remove milliseconds from timecodes
			.replace(/{\\an8}/g, '') // Remove {an8} tags
			.replace(/{\\an8}-/g, '') // Remove {an8}- tags
			.replace(/<i>|<\/i>/g, '') // Remove italic tags
			.replace(/(\d{2}:\d{2}:\d{2} --> \d{2}:\d{2}:\d{2})/, '$1 · ') // Add a dot separator with a space
			.trim(); // Remove any leading/trailing whitespace
	}

	function loadMoreSubtitles() {
		const nextBatch = allSubtitles.slice(lastLoadedIndex, lastLoadedIndex + increment);
		displayedSubtitles.update((subs) => [...subs, ...nextBatch]);
		lastLoadedIndex += increment;
	}

	function handleScroll(event: Event) {
		const container = event.target as HTMLElement;
		if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
			loadMoreSubtitles(); // Load more subtitles when scrolled to the bottom
		}
	}

    function highlight(node: HTMLElement) {
        function handleMouseUp() {
            const selection = window.getSelection();
            if (selection && selection.toString().trim()) {
                selectedText = selection.toString().trim(); // Update the variable with the selected text
            }
            }

            node.addEventListener('mouseup', handleMouseUp);

            return {
            destroy() {
                node.removeEventListener('mouseup', handleMouseUp);
            }
        };
    }

    // debugging
    $: console.log(selectedText);
  
	onMount(loadSubtitles);
</script>

<div class="flex items-center justify-center">
	<div
        use:highlight
		class="subtitle-container h-96 max-w-6xl overflow-y-scroll rounded-t-lg text-gray-700
            transition-colors duration-300 hover:bg-base-300 hover:text-gray-500"
		on:scroll={handleScroll}
	>
		<h1 class="mb-4 pl-10"><i>These subtitles aren't synced to the movie yet.</i></h1>
		{#each $displayedSubtitles as subtitle}
			<div class="mb-4 pl-10 text-lg">
				{subtitle}
			</div>
		{/each}
	</div>
</div>
