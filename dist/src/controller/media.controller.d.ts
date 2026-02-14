import { TranscribeOptionsDto } from "src/dto/transcribe.options.dto";
import { MediaService } from "src/service/media.service";
export declare class MediaController {
    private mediaservice;
    constructor(mediaservice: MediaService);
    transcribe(req: Request, dto: TranscribeOptionsDto, file: Express.Multer.File): Promise<any>;
}
