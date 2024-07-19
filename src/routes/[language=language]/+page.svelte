<script lang="ts">
    import { goto } from '$app/navigation'
	import { page } from '$app/stores';
    import { onMount } from 'svelte'
  
    let selectedLang = "";
    $: selectedLang = $page.params.language;
    
    onMount(() => goto(`${selectedLang}/1`))
  </script>

