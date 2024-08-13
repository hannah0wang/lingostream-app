<script lang="ts">
	import { page } from '$app/stores';
	import { Popover, Button } from 'flowbite-svelte';

	export let data;
	export let movieId: string;
	export let lang: string;

	let { supabase, session } = data; // destructure these from data object
	$: ({ supabase, session } = data); // reactive statement - listen to changes

	let userMovies: string[] = [];
	let userLangs: string[] = [];	
	let isMovieSaved = false;

	

	// page.subscribe(async () => {
	// 	const {data: userLibData, error: userLibError } = await supabase.from("user_library").select("movie_ids").eq("user_id", session?.user?.id);
	// 	if (userLibData?.length == 0) {
	// 		const { data, error } = await supabase
	// 			.from("user_library")
	// 			.insert({ user_id: session?.user?.id, movie_id: userMovies });

	// 	} else {
	// 		userMovies = userLibData[0];
	// 	}

	// 	console.log(userLibData[0]);
		
	// });

	// Function to toggle save status of a movie
	async function toggleSave() {
		if (!session) {
			alert('You need to be logged in to save movies.');
			return;
		}

		if (isMovieSaved) {
			// Remove movie from list
			userMovies = userMovies.filter((id) => id !== movieId);
		} else {
			// Add movie to list
			userMovies.push(movieId);
		}
		
		const { data: movieData, error: movieError } = await supabase
				.from('user_library')
				.select('movie_ids')
				.eq('user_id', session.user.id);

		if (movieData?.length == 0) {
			const { data, error } = await supabase
				.from("user_library")
				.insert({ user_id: session?.user?.id, movie_ids: userMovies })
		} else {
			// Save the updated list to the database
			const { error } = await supabase
				.from('user_library')
				.update({ movie_ids: userMovies })
				.eq('user_id', session.user.id);

			if (error) {
				console.error('Error saving movie:', error);
				return;
			}
		}

		isMovieSaved = !isMovieSaved; // Toggle the saved state
		// console.log(userMovies);
		// console.log(movieId);
	}

</script>

<ul
	class="bg-base-500 menu menu-horizontal ml-5 mt-6 rounded-box opacity-70 transition-all duration-300 hover:bg-base-300 hover:opacity-100"
>
	<li class="transition-opacity duration-300">
		<a class="tooltip" data-tip={isMovieSaved? "Saved" : "Save"} on:click={toggleSave}>
			{#if !isMovieSaved}
				<svg
					class="h-5 w-5 text-gray-700 hover:text-gray-300"
					viewBox="0 -0.5 25 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{:else}
				<img 
					src="/save.png"
					alt="save"
					class="h-5 w-5"/>
			{/if}
		</a>
	</li>
	<li class="transition-opacity duration-300">
		<a id="details-popover" class="tooltip" data-tip="Details">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 text-gray-700 hover:text-gray-300"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</a>
	</li>
	<li class="transition-opacity duration-300">
		<a class="tooltip" data-tip="Stats">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 text-gray-700 hover:text-gray-300"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
				/>
			</svg>
		</a>
	</li>
	<li class="transition-opacity duration-300">
		<a id="help-popover" class="tooltip flex items-center" data-tip="Help">
		  <svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4 text-gray-700 hover:text-gray-300 mt-0.5"
			viewBox="0 0 512 512"
			fill="currentColor"
		  >
			<g>
			  <path
				fill="currentColor"
				d="M 238.5,-0.5 C 249.833,-0.5 261.167,-0.5 272.5,-0.5C 337.959,10.115 380.793,47.115 401,110.5C 415.038,174.388 397.205,227.222 347.5,269C 333.474,280.013 317.807,287.846 300.5,292.5C 300.667,312.836 300.5,333.169 300,353.5C 293.697,376.063 278.864,387.729 255.5,388.5C 227.616,386.449 212.449,371.449 210,343.5C 209.333,313.833 209.333,284.167 210,254.5C 211.235,231.189 223.069,216.356 245.5,210C 279.209,211.086 301.709,195.92 313,164.5C 318.518,128.693 304.352,104.527 270.5,92C 239.017,86.1596 215.85,97.3262 201,125.5C 197.297,136.511 195.297,147.845 195,159.5C 190.772,176.062 180.605,187.229 164.5,193C 134.981,198.998 115.481,187.831 106,159.5C 103.51,96.2958 129.343,48.7958 183.5,17C 200.925,7.90175 219.258,2.06841 238.5,-0.5 Z"
				style="opacity:0.986"
			  />
			</g>
			<g>
			  <path
				fill="currentColor"
				d="M 265.5,511.5 C 258.833,511.5 252.167,511.5 245.5,511.5C 219.354,502.573 207.854,484.24 211,456.5C 220.481,428.169 239.981,417.002 269.5,423C 293.49,432.8 303.656,450.633 300,476.5C 294.984,494.682 283.484,506.348 265.5,511.5 Z"
				style="opacity:0.976"
			  />
			</g>
		  </svg>
		</a>
	  </li>
</ul>

<Popover
	class="w-64 text-sm font-light p-3"
	title="Movie title"
	triggeredBy="#details-popover"
	placement="bottom"
	trigger="click">And here's some amazing content. It's very engaging. Right?</Popover
>
<Popover
	class="w-64 text-sm font-light p-3"
	triggeredBy="#help-popover"
	placement="bottom"
	trigger="click">Double-click any word to view its translation, or highlight text to see the translation for the entire phrase.</Popover
>
