<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import DropDownMenu from '$lib/components/DropDownMenu.svelte';
	import LangSearchModal from '$lib/components/LangSearchModal.svelte';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import '../app.css';

	let searchInput = "";
	let isLoginModalOpen = false;
	let isSearchModalOpen = false;

	export let data;

	let { supabase, session } = data; // destructure these from data object
	$: ({ supabase, session } = data); // reactive statement - listen to changes from either supabase or session

	supabase.auth.onAuthStateChange(async (event, session) => {
		if(event === "SIGNED_IN") {
			invalidateAll(); // force all the data to reload. when someone logs in we want data to refresh
		}

		if(event === "SIGNED_OUT") {
			await goto("/"); // go back to home page when logged out
			invalidateAll(); // when logged out, page will refresh
		}
	});
	
</script>

<div class="navbar max-w-6xl bg-base-100 justify-between mx-auto pt-5" data-theme="sunset">
	<div class="flex-none">
	  <DropDownMenu />
	</div>
	<div class="flex-1">
	  <a href="/" class="btn btn-ghost text-2xl font-bold">
		<img 
			src="./lingostream-logo-3.png"
			alt="logo"
			class="h-8 object-contain mr-[-10px]"
		/>
		<img
			src="./lingostream-text.png"
			alt="logo-text"
			class="h-8 object-contain"
		/></a>
	</div>
	<div class="flex items-center space-x-2 ml-auto">
		<label class="input input-bordered w-96 flex items-center gap-2 hover:bg-gray-300 hover:border-gray-300 hover:text-black transition duration-500 ease-in-out">
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
		  <input type="text" class="grow" placeholder="Search for a movie" bind:value={searchInput} />
		</label>
	</div>

	<div class="pl-8">
		<button class="btn btn-primary" on:click={() => isSearchModalOpen = true}>Search by Language</button>
		<LangSearchModal bind:isModalOpen={isSearchModalOpen} />
	</div>

	<div class="flex-none pl-10">
		{#if session == null}
	  <button class="btn btn-ghost" on:click={() => isLoginModalOpen = true}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			class="h-6 w-6 opacity-70">
			<path
			d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
		</svg>
	  Login</button>
	  {:else}
		<div class="dropdown dropdown-hover">
			<div tabindex="0" role="button" class="btn btn-square">
				<img 
				src="./user-account.png"
				alt="avatar"
				class="h-10 object-fill"
				/>
			</div>
			<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-20 p-1 shadow">
				<li>
					<button class="btn btn-ghost" on:click={async () => { await supabase.auth.signOut() }}>
						Logout
					</button>
				</li>
			</ul>
		</div>
	  {/if}
	<LoginModal bind:isModalOpen={isLoginModalOpen} {data} />
	</div>
  </div>

<slot></slot>
