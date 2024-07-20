<script lang="ts">
	import { page } from "$app/stores";
	import { derived } from "svelte/store";

    export let data;

    const movieId = (() => {
        // Example route pattern: /en/hidden-desire-298094
        const match = $page.url.pathname.match(/-(\d+)$/); // Match numbers after last hyphen
        return match ? match[1] : '';
    })();

    //console.log(movieId);
    //console.log($page.url.pathname);

    //1001311
    let movieURL = `https://2embed.org/embed/movie/${movieId}`;

    console.log(data.downloadData);

    
</script>


<div class="min-h-screen bg-black mt-2">
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
</div>