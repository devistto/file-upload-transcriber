import { Module } from "@nestjs/common";
import { TranscodeService } from "./service/transcode.service";
import { TranscriptionController } from "./controller/transcription.controller";
import { TranscriptionService } from "./service/transcription.service";

@Module({
    controllers: [TranscriptionController],
    providers: [TranscriptionService, TranscodeService]
})
export class AppModule { }