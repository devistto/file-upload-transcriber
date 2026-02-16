import { BadRequestException, Body, Controller, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { multerConfig } from "src/config/multer.config";
import { FileInterceptor } from "@nestjs/platform-express"
import { TranscriptionService } from "src/service/transcription.service";
import { WhisperOptionsDto } from "src/dto/whisper-options.dto";
import { type Response } from "express";
import fs from "node:fs"
import path from "node:path";

@Controller("media")
export class TranscriptionController {
    constructor(private transcriptionService: TranscriptionService) { }

    @Post("transcriptions")
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async create(@Req() req: Request, @Res() res: Response, @UploadedFile() file: Express.Multer.File, @Body() dto: WhisperOptionsDto) {
        if (!file) throw new BadRequestException("File is missing");

        const videoPath = await this.transcriptionService.create(file.path, dto);

        res.sendFile(videoPath, (err) => {
            if (err) console.error(err);

            const dirPath = path.dirname(videoPath);

            fs.rm(dirPath, { recursive: true, force: true }, (rmErr) => {
                if (rmErr) console.error(rmErr);
            });
        });

    }
}