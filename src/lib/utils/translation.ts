import type { TranslationProp } from "$lib";


export async function getTranslation(text: string, language: string) {
    const res = await fetch("http://127.0.0.1:5000/translate", {
        method: "POST",
        body: JSON.stringify({
            q: text,
            source: language,
            target: "en",
            format: "text",
            alternatives: 3,
            api_key: ""
        }),
        headers: { "Content-Type": "application/json" }
    });
    
    const translated: TranslationProp = await res.json();
    
    return translated;
}