<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';
    import { getTranslation } from '$lib/utils/translation';
    import { supabase } from '$lib/supabaseClient';

    export let movieId: string;
    export let lang: string;

    let displayedSubtitles = writable<string[]>([]);
    let allSubtitles: string[] = [];
    let increment = 50;
    let lastLoadedIndex = 0;
    let selectedText = "";
    let translated: string = "";
    let displayTranslation = false;
    let popoverStyle = '';
    let popoverContent = '';

    async function loadSubtitles() {
        const { data: subtitleData } = await supabase
            .from('subtitles')
            .select('srt_subtitles')
            .eq('tmdb_id', movieId);

        if (subtitleData && subtitleData.length > 0) {
            allSubtitles = subtitleData[0].srt_subtitles.split('\n\n').map(cleanSubtitle);
            loadMoreSubtitles();
        }
    }

    function cleanSubtitle(subtitle: string): string {
        return subtitle
            .replace(/^\d+\n/, '')
            .replace(/(\d{2}:\d{2}:\d{2}),\d{3}/g, '$1')
            .replace(/{\\an8}/g, '')
            .replace(/{\\an8}-/g, '')
            .replace(/<i>|<\/i>/g, '')
            .replace(/(\d{2}:\d{2}:\d{2} --> \d{2}:\d{2}:\d{2})/, '$1 · ')
            .trim();
    }

    function loadMoreSubtitles() {
        const nextBatch = allSubtitles.slice(lastLoadedIndex, lastLoadedIndex + increment);
        displayedSubtitles.update((subs) => [...subs, ...nextBatch]);
        lastLoadedIndex += increment;
    }

    function handleScroll(event: Event) {
        const container = event.target as HTMLElement;
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
            loadMoreSubtitles();
        }
    }

    function highlight(node: HTMLElement) {
        function handleMouseUp() {
            const selection = window.getSelection();
            if (selection && selection.toString().trim()) {
                selectedText = selection.toString().trim();
                handleTranslation();
            }
        }

        node.addEventListener('mouseup', handleMouseUp);

        return {
            destroy() {
                node.removeEventListener('mouseup', handleMouseUp);
            }
        };
    }

    async function handleTranslation() {
        try {
            const result = await getTranslation(selectedText, lang);
            translated = result.translatedText;
            popoverContent = `<b>${selectedText}</b><br>${translated}`;
            calculatePopoverPosition();
            displayTranslation = true;
        } catch (err) {
            console.error('Error translating text:', err);
        }
    }

    function calculatePopoverPosition() {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            popoverStyle = `position: absolute; top: ${rect.top + window.scrollY - 70}px; left: ${rect.left + window.scrollX}px;`;
        }
    }

    function handleDocumentClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest('.popover')) {
            displayTranslation = false;
        }
    }

    function handleDocumentScroll() {
        displayTranslation = false;
    }

    onMount(() => {
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('scroll', handleDocumentScroll);
        loadSubtitles();
    });

    onDestroy(() => {
        document.removeEventListener('click', handleDocumentClick);
        document.removeEventListener('scroll', handleDocumentScroll);
    });
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

<!-- Popover -->
{#if displayTranslation}
    <div
        class="popover bg-white border text-black border-gray-300 rounded-lg shadow-lg p-3 z-50"
        style={popoverStyle}
    >
        {@html popoverContent}
    </div>
{/if}
