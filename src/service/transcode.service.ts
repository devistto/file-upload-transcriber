import { BadRequestException, Injectable } from "@nestjs/common";
import path from "path";
import fs from "node:fs"
import ffmpeg from "src/utils/ffmpeg-config";

@Injectable()
export class TranscodeService {

    validate(filePath: string) {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(filePath, (err, metadata) => {
                if (err) {
                    return reject(new BadRequestException("Unable to read media metadata"));
                }

                const hasValidStream = metadata.streams?.find(stream => stream.codec_type == "video");

                if (!hasValidStream) {
                    return reject(new BadRequestException("Unable to validate file properities"))
                }

                const maxDuration = 180;
                const duration = metadata.format?.duration;

                if (!duration || duration > maxDuration) {
                    return reject(new BadRequestException("File exceeds max time limit of 3 minutes"));
                }

                return resolve(true)
            });
        })
    }

    async extract(filePath: string): Promise<string> {
        const outputPath = path.join(path.dirname(filePath), "audio.wav");

        return new Promise((resolve, reject) => {
            ffmpeg(filePath)
                .noVideo()
                .audioCodec('pcm_s16le')
                .audioFrequency(16000)
                .audioChannels(1)
                .format("wav")
                .on('end', () => resolve(outputPath))
                .on("error", err => {
                    reject(new Error("Something went wrong while processing file"))
                })
                .save(outputPath);
        })
    }

    async burn(filePath: string, content: string) {
        const dir = path.dirname(filePath);
        const contentPath = `${dir}/subs.srt`;

        fs.writeFileSync(contentPath, content, { encoding: "utf8" });

        const outputPath = path.join(path.dirname(filePath), "output.mp4");

        const normalizedSrtPath = contentPath
            .replace(/\\/g, "/")
            .replace(/:/g, "\\:");

        return new Promise((resolve, reject) => {
            ffmpeg(filePath)
                .outputOptions([
                    `-vf subtitles='${normalizedSrtPath}:force_style=FontName=Arial,FontSize=12,PrimaryColour=&H00FFFFFF,Outline=0.8,OutlineColour=&H70000000,Shadow=0.8,BackColour=&H80000000,Alignment=1,MarginV=30'`,
                    "-c:a copy"
                ])
                .videoCodec("libx264")
                .format("mp4")
                .on("end", () => resolve(outputPath))
                .on("error", err => {
                    reject(new Error("Something went wrong while processing file"));
                })
                .save(outputPath);
        });
    }
}