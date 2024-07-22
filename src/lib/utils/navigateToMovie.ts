import { goto } from "$app/navigation";
import { languageMap } from "$lib/languages";


const convertToSlug = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-');
};

const getFullOriginalLang = (lang: string) => {
    return Object.keys(languageMap).find(key => languageMap[key] === lang);
}

export const navigateToMovieDetails = (original_language:string, title:string, id:number) => {
    goto(`/${getFullOriginalLang(original_language)}/${convertToSlug(title)}-${id}`);
};