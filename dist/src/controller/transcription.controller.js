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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscriptionController = void 0;
const common_1 = require("@nestjs/common");
const multer_config_1 = require("../config/multer.config");
const platform_express_1 = require("@nestjs/platform-express");
const transcription_service_1 = require("../service/transcription.service");
const whisper_options_dto_1 = require("../dto/whisper-options.dto");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
let TranscriptionController = class TranscriptionController {
    transcriptionService;
    constructor(transcriptionService) {
        this.transcriptionService = transcriptionService;
    }
    async create(req, res, file, dto) {
        if (!file)
            throw new common_1.BadRequestException("File is missing");
        const videoPath = await this.transcriptionService.create(file.path, dto);
        res.sendFile(videoPath, (err) => {
            if (err)
                console.error(err);
            const dirPath = node_path_1.default.dirname(videoPath);
            node_fs_1.default.rm(dirPath, { recursive: true, force: true }, (rmErr) => {
                if (rmErr)
                    console.error(rmErr);
            });
        });
    }
};
exports.TranscriptionController = TranscriptionController;
__decorate([
    (0, common_1.Post)("transcriptions"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_config_1.multerConfig)),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object, Object, whisper_options_dto_1.WhisperOptionsDto]),
    __metadata("design:returntype", Promise)
], TranscriptionController.prototype, "create", null);
exports.TranscriptionController = TranscriptionController = __decorate([
    (0, common_1.Controller)("media"),
    __metadata("design:paramtypes", [transcription_service_1.TranscriptionService])
], TranscriptionController);
//# sourceMappingURL=transcription.controller.js.map