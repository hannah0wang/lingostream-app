import { languageMap } from "$lib/languages";

export function match(param) {
	return Object.keys(languageMap).includes(param);
}