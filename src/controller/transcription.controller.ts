import { Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { multerConfig } from "src/config/multer.config";
import { FileInterceptor } from "@nestjs/platform-express"
import { TranscriptionService } from "src/service/transcription.service";

@Controller("media")
export class TranscriptionController {
    constructor(private transcriptionService: TranscriptionService) { }

    @Post("transcriptions")
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async create(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
        const result = await this.transcriptionService.create(file.path);
    }
}