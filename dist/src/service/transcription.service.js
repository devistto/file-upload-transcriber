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
exports.TranscriptionService = void 0;
const common_1 = require("@nestjs/common");
const transcode_service_1 = require("./transcode.service");
const promises_1 = require("fs/promises");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
let TranscriptionService = class TranscriptionService {
    transcodeService;
    constructor(transcodeService) {
        this.transcodeService = transcodeService;
    }
    async create(filePath, options) {
        const audioPath = await this.transcodeService.extract(filePath);
        const buffer = await (0, promises_1.readFile)(audioPath);
        const blob = new Blob([buffer], { type: "audio/wav" });
        const formData = new FormData();
        formData.append("audio_file", blob, "audio.wav");
        const baseUrl = "http://localhost:9000/asr?output=srt";
        const queryParams = `?task=${options.task}&language=${options.audio_language}&initial_prompt=${options.prompt}&output=srt`;
        const url = baseUrl + queryParams;
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        const srt = await response.text();
        const dir = node_path_1.default.dirname(filePath);
        const srtPath = `${dir}/subs.srt`;
        node_fs_1.default.writeFileSync(srtPath, srt, { encoding: "utf8" });
        const videoPath = await this.transcodeService.burn(filePath, srtPath);
        return videoPath;
    }
};
exports.TranscriptionService = TranscriptionService;
exports.TranscriptionService = TranscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transcode_service_1.TranscodeService])
], TranscriptionService);
//# sourceMappingURL=transcription.service.js.map