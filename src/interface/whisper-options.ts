import { WhisperLanguage } from "src/dto/whisper-options.dto";

export interface IWhisperOptions {
    task: "translate" | "transcribe";
    audio_language: WhisperLanguage;
    prompt?: string
}