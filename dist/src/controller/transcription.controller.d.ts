import { TranscriptionService } from "src/service/transcription.service";
import { WhisperOptionsDto } from "src/dto/whisper-options.dto";
import { type Response } from "express";
export declare class TranscriptionController {
    private transcriptionService;
    constructor(transcriptionService: TranscriptionService);
    create(req: Request, res: Response, file: Express.Multer.File, dto: WhisperOptionsDto): Promise<void>;
}
