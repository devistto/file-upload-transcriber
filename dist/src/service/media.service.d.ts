import "dotenv/config";
import { TranscodeService } from "./transcode.service";
type Options = {
    language: string;
    translate: "None" | "English";
};
export declare class MediaService {
    private transcodeService;
    constructor(transcodeService: TranscodeService);
    transcribe(filePath: string, options: Options): Promise<any>;
}
export {};
