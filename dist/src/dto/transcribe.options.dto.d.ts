export declare enum Language {
    Portuguese = "pt",
    English = "en",
    Spanish = "es",
    French = "fr",
    German = "de",
    Italian = "it",
    Japanese = "ja",
    Korean = "ko",
    Chinese = "zh",
    Russian = "ru",
    Arabic = "ar"
}
export declare class TranscribeOptionsDto {
    language: Language;
    translate: "None" | "English";
}
