<script lang="ts">
	import LoginModal from "./LoginModal.svelte";

    export let data;
    export let isLoggedIn = false;
    let isLoginModalOpen = false;

</script>

<div class="drawer z-10">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content tooltip tooltip-bottom" data-tip="Library">
      <!-- Page content here -->
      <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-10 w-10 stroke-current">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16">
            </path>
        </svg>
      </label>
    </div>
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      {#if isLoggedIn}
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4 text-lg">
            <!-- Sidebar content here -->
            <li><a>
                <img
                    src="./video-camera.png"
                    alt="movie"
                    class="h-8 pt-2 pl-1 pr-1" />
                My Movies</a></li>
            <li><a>
                <img
                    src="./language-choice.png"
                    alt="languages"
                    class="h-8" />
                My Languages</a></li>
            <li><a>
                <img
                    src="./flash-card.png"
                    alt="flashcard"
                    class="h-5 pl-1 pr-2" />
                Flashcards</a></li>
            <li><a>
                <img
                    src="./save.png"
                    alt="save"
                    class="h-5 pl-1 pr-2" />
                Saved Vocab</a></li>
        </ul>
        {:else}
        <div role="alert" class="alert bg-base-200 text-base-content min-h-full w-80 p-4 text-xl flex flex-col text-center items-center">
            <!-- Lock Icon on Top -->
            <img 
                src="./lock.png"
                alt="lock"
                class="h-10 mb-4 mt-10" />
                
            <!-- Alert Message -->
            <h1 class="text-md ml-10 mr-10 mb-20">You must log in to access the library.</h1>
            
            <!-- Button Section -->
             
            <button class="btn btn-primary text-xl w-60" on:click={() => isLoginModalOpen = true}>Login</button>
        </div>
        
      {/if}
    </div>
  </div>
  <LoginModal bind:isModalOpen={isLoginModalOpen} {data} />




<!-- <div class="dropdown dropdown-hover">
    <div tabindex="0" role="button" class="btn btn-square btn-ghost">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-10 w-10 stroke-current">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16">
            </path>
        </svg>
    </div>
    <ul tabindex="0" class="menu dropdown-content bg-base-300 rounded-box z-[1] w-96 p-2 shadow">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
</div> -->


<!-- <div class="dropdown dropdown-bottom">
    <button class="btn btn-square btn-ghost">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block h-10 w-10 stroke-current">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    </button>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
    </ul>
</div> -->