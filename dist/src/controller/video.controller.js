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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const multer_options_1 = require("../utils/multer-options");
const platform_express_1 = require("@nestjs/platform-express");
const video_service_1 = require("../service/video.service");
const whisper_options_dto_1 = require("../dto/whisper-options.dto");
const fs_1 = require("fs");
const swagger_1 = require("@nestjs/swagger");
const clean_up_interceptor_1 = require("../interceptor/clean-up.interceptor");
let VideoController = class VideoController {
    videoService;
    constructor(videoService) {
        this.videoService = videoService;
    }
    async create(file, dto) {
        const videoPath = await this.videoService.create(file.path, dto);
        const stream = (0, fs_1.createReadStream)(videoPath);
        return new common_1.StreamableFile(stream, {
            type: 'video/mp4',
            disposition: `attachment; filename="${file.originalname}"`,
        });
    }
};
exports.VideoController = VideoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('video', multer_options_1.multerOptions), clean_up_interceptor_1.CleanUpInterceptor),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a subtitled video',
        description: 'Uploads a video, processes it using Whisper and FFmpeg, and returns the final MP4 with embedded subtitles.'
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                video: {
                    type: 'string',
                    format: 'binary',
                    description: "A 500MB video file, maximum 5 minutes long - Supported formats: MP4, MPEG, QuickTime, WMV, AVI, WebM, Ogg, FLV, 3GPP, 3GPP2",
                },
                task: {
                    type: "string",
                    enum: ["translate", "transcribe"],
                    default: "transcribe"
                },
                audio_language: {
                    type: "string",
                    enum: Object.values(whisper_options_dto_1.WhisperLanguage),
                    default: whisper_options_dto_1.WhisperLanguage.English
                }
            },
            required: ["task", 'video', "audio_language"]
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        content: {
            'video/mp4': {
                schema: { type: 'string', format: 'binary' }
            }
        },
        description: 'Returns a processed video with embedded subtitles.'
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid request: missing file, exceeded file size / duration limit or else.',
        schema: {
            example: {
                statusCode: 400,
                message: 'File is missing',
                error: 'Bad Request'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error',
        schema: {
            example: {
                statusCode: 500,
                message: "Something went wrong while processing file",
                error: 'Internal Server Error'
            }
        }
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, whisper_options_dto_1.WhisperOptionsDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "create", null);
exports.VideoController = VideoController = __decorate([
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoController);
//# sourceMappingURL=video.controller.js.map