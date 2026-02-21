"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscodeService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = __importDefault(require("path"));
const node_fs_1 = __importDefault(require("node:fs"));
const ffmpeg_config_1 = __importDefault(require("../utils/ffmpeg-config"));
let TranscodeService = class TranscodeService {
    validate(filePath) {
        return new Promise((resolve, reject) => {
            ffmpeg_config_1.default.ffprobe(filePath, (err, metadata) => {
                if (err) {
                    return reject(new common_1.BadRequestException("Unable to read media metadata"));
                }
                const hasValidStream = metadata.streams?.find(stream => stream.codec_type == "video");
                if (!hasValidStream) {
                    return reject(new common_1.BadRequestException("Unable to validate file properities"));
                }
                const maxDuration = 180;
                const duration = metadata.format?.duration;
                if (!duration || duration > maxDuration) {
                    return reject(new common_1.BadRequestException("File exceeds max time limit of 3 minutes"));
                }
                return resolve(true);
            });
        });
    }
    async extract(filePath) {
        const outputPath = path_1.default.join(path_1.default.dirname(filePath), "audio.wav");
        return new Promise((resolve, reject) => {
            (0, ffmpeg_config_1.default)(filePath)
                .noVideo()
                .audioCodec('pcm_s16le')
                .audioFrequency(16000)
                .audioChannels(1)
                .format("wav")
                .on('end', () => resolve(outputPath))
                .on("error", err => {
                reject(new Error("Something went wrong while processing file"));
            })
                .save(outputPath);
        });
    }
    async burn(filePath, content) {
        const dir = path_1.default.dirname(filePath);
        const contentPath = `${dir}/subs.srt`;
        node_fs_1.default.writeFileSync(contentPath, content, { encoding: "utf8" });
        const outputPath = path_1.default.join(path_1.default.dirname(filePath), "output.mp4");
        const normalizedSrtPath = contentPath
            .replace(/\\/g, "/")
            .replace(/:/g, "\\:");
        return new Promise((resolve, reject) => {
            (0, ffmpeg_config_1.default)(filePath)
                .outputOptions([
                `-vf subtitles='${normalizedSrtPath}:force_style=FontName=Arial,FontSize=12,PrimaryColour=&H00FFFFFF,Outline=0.8,OutlineColour=&H70000000,Shadow=0.8,BackColour=&H80000000,Alignment=1,MarginV=30'`,
                "-c:a copy"
            ])
                .videoCodec("libx264")
                .format("mp4")
                .on("end", () => resolve(outputPath))
                .on("error", err => {
                reject(new Error("Something went wrong while processing file"));
            })
                .save(outputPath);
        });
    }
};
exports.TranscodeService = TranscodeService;
exports.TranscodeService = TranscodeService = __decorate([
    (0, common_1.Injectable)()
], TranscodeService);
//# sourceMappingURL=transcode.service.js.map