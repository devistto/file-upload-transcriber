import { BadRequestException, Injectable } from "@nestjs/common";
import path from "path";
import ffmpeg from "src/config/ffmpeg.config";

@Injectable()
export class TranscodeService {
    private validate(filePath: string) {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(filePath, (err, metadata) => {
                if (err) return reject(
                    new BadRequestException("Unable to read media metadata")
                );

                const hasValidStream = metadata.streams?.find(stream => stream.codec_type == "audio");

                if (!hasValidStream) return reject(
                    new BadRequestException("Unable to validate file properities")
                )

                const maxDuration = 300;
                const duration = metadata.format?.duration;

                if (!duration || duration > maxDuration) return reject(
                    new BadRequestException("File exceeds duration limit of 5 minutes")
                );

                return resolve(true)
            });
        })
    }

    async exec(filePath: string): Promise<string> {
        await this.validate(filePath);
        const outputPath = path.join(path.dirname(filePath), "audio.wav");

        return new Promise((resolve, reject) => {
            ffmpeg(filePath)
                .noVideo()
                .audioCodec('pcm_s16le')
                .audioFrequency(16000)
                .audioChannels(1)
                .format("wav")
                .on('end', () => resolve(outputPath))
                .on("error", err => reject(
                    new BadRequestException("Something went wrong while processing file")
                ))
                .save(outputPath);
        })
    }
}