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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const multer_config_1 = require("../config/multer.config");
const transcribe_options_dto_1 = require("../dto/transcribe.options.dto");
const media_service_1 = require("../service/media.service");
const platform_express_1 = require("@nestjs/platform-express");
const throttler_1 = require("@nestjs/throttler");
let MediaController = class MediaController {
    mediaservice;
    constructor(mediaservice) {
        this.mediaservice = mediaservice;
    }
    async transcribe(req, dto, file) {
        if (!file)
            throw new common_1.BadRequestException("File field is not defined");
        const srt = await this.mediaservice.transcribe(file.path, dto);
        return srt;
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.Post)("transcribe"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_config_1.multerConfig)),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, transcribe_options_dto_1.TranscribeOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "transcribe", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)("media"),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map