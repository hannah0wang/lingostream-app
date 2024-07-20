<!-- Save for later -->

<script lang="ts">
    export let data;

    let lastPage = (Math.ceil(data.movies.total_results / 20) < 100)? Math.ceil(data.movies.total_results / 20) : 100;
    let current = 1;
    let currentQuint = 1;
    let numItems = 20;
    let perPage = 3;

</script>

<!-- <div>
    {#if current > 1}
    <button>&lt;&lt;</button>
    {/if}
    {#if current > 5}
    <button>&lt;</button>
    {/if}
    {#each Array(lastPage) as _, index}
    <button>{currentQuint}</button>
    <button>{currentQuint + 1}</button>
    <button>{currentQuint + 2}</button>
    <button>{currentQuint + 3}</button>
    <button>{currentQuint + 4}</button>
    <button>&t;</button>
    <button></button>
</div> -->