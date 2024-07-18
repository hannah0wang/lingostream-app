<script lang="ts">
    import { goto } from '$app/navigation';
    import type { MovieProp } from '$lib/index';
    export let movieData: MovieProp;

    let { id, original_language, original_title, overview, poster_path, release_date, title, vote_average, } = movieData;

    const convertToSlug = (text: string) => {
        return text.toLowerCase().replace(/\s+/g, '-');
    };

    const navigateToMovieDetails = () => {
        goto(`/${original_language}/${convertToSlug(title)}-${id}`);
    };
</script>

<a 
    href={`/${original_language}/${convertToSlug(original_title)}`} 
    class="block cursor-pointer" 
    on:click|preventDefault={() => navigateToMovieDetails()}>
    <div class="max-w-xs mx-auto rounded relative w-full">
        <div class="relative w-48 h-full">
            <img 
                class="object-cover w-full h-full rounded-md"
                src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
                alt={original_title}
            />
        </div>
        <div class="py-4 flex flex-col gap-3">
            <div class="flex justify-between items-center gap-1">
                <h2 class="text-white text-md line-clamp-1 w-full">
                    {original_title}
                </h2>
                <div class="py-1 px-2 bg-[#202430] rounded-md">
                    <p class="text-white text-sm font-bold capitalize">
                        {release_date.split('-')[0]}
                    </p>
                </div>
            </div>
            <!-- <div class="flex gap-4 items-center">
                <div class="flex flex-row gap-2 items-center">
                    <img
                        src="/episodes.svg"
                        alt="episodes"
                        class="object-contain"
                    />
                </div>
                <div class="flex flex-row gap-2 items-center">
                    <img
                        src="/star.svg"
                        alt="star"
                        class="object-contain"
                    />
                    <p class="text-base font-bold text-[#FFAD49]">{vote_average}</p>
                </div>
            </div> -->
        </div>
    </div>
</a>
