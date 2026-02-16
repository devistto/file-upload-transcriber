import { TranscodeService } from "./transcode.service";
import { type IWhisperOptions } from "src/interface/whisper-options";
export declare class TranscriptionService {
    private transcodeService;
    constructor(transcodeService: TranscodeService);
    create(filePath: string, options: IWhisperOptions): Promise<string>;
}
