"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const transcode_service_1 = require("./transcode.service");
const openai_1 = __importDefault(require("openai"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
let MediaService = class MediaService {
    transcodeService;
    constructor(transcodeService) {
        this.transcodeService = transcodeService;
    }
    async transcribe(filePath, options) {
        const audioPath = await this.transcodeService.exec(filePath);
        const openai = new openai_1.default({ apiKey: process.env.OPENAI_WHISPER_KEY });
        let srt = "";
        const basePayload = {
            model: "whisper-1",
            response_format: "srt",
            temperature: 0.1
        };
        if (options.translate === "English") {
            srt = await openai.audio.translations.create({
                ...basePayload,
                file: node_fs_1.default.createReadStream(audioPath)
            });
        }
        else {
            srt = await openai.audio.transcriptions.create({
                ...basePayload,
                file: node_fs_1.default.createReadStream(audioPath),
                language: options.language
            });
        }
        const removePath = node_path_1.default.dirname(filePath);
        node_fs_1.default.rmSync(removePath, { force: true, recursive: true });
        return srt;
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transcode_service_1.TranscodeService])
], MediaService);
//# sourceMappingURL=media.service.js.map