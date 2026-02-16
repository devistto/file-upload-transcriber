import { Injectable } from "@nestjs/common";
import { TranscodeService } from "./transcode.service";
import { readFile } from "fs/promises";
import { type IWhisperOptions } from "src/interface/whisper-options";
import fs from "node:fs"
import path from "node:path"

@Injectable()
export class TranscriptionService {
    constructor(private transcodeService: TranscodeService) { }

    async create(filePath: string, options: IWhisperOptions) {
        const audioPath = await this.transcodeService.extract(filePath);

        const buffer = await readFile(audioPath);
        const blob = new Blob([buffer], { type: "audio/wav" });
        const formData = new FormData();

        formData.append("audio_file", blob, "audio.wav");

        const baseUrl = "http://localhost:9000/asr?output=srt";
        const queryParams = `?task=${options.task}&language=${options.audio_language}&initial_prompt=${options.prompt}&output=srt`;
        const url = baseUrl+queryParams

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const srt = await response.text();
        const dir = path.dirname(filePath);
        const srtPath = `${dir}/subs.srt`;

        fs.writeFileSync(srtPath, srt, { encoding: "utf8" });

        const videoPath = await this.transcodeService.burn(filePath, srtPath) as string;
        return videoPath
    }
}