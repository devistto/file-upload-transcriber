"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = __importDefault(require("path"));
const node_fs_1 = __importDefault(require("node:fs"));
const nanoid_1 = require("nanoid");
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination(req, file, callback) {
            const base = path_1.default.join(process.cwd(), "uploads");
            const fileFolder = (0, nanoid_1.customAlphabet)("123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);
            const filePath = path_1.default.join(base, fileFolder());
            if (!node_fs_1.default.existsSync(filePath))
                node_fs_1.default.mkdirSync(filePath, { recursive: true });
            return callback(null, filePath);
        },
        filename(req, file, callback) {
            return callback(null, file.originalname);
        },
    }),
    limits: {
        fileSize: 250 * 1024 * 1024
    },
    fileFilter(req, file, callback) {
        const mimetypes = [
            "video/mp4", "video/mpeg", "video/quicktime", "video/mov", "video/wmv", "video/avi",
            "video/x-msvideo", "video/webm", "video/ogg", "video/x-flv", "video/3gpp", "video/3gpp2",
            "video/x-matroska"
        ];
        if (!mimetypes.includes(file.mimetype)) {
            return callback(new common_1.BadRequestException(`Acceptable mimetypes incluede ${mimetypes}`), false);
        }
        ;
        return callback(null, true);
    }
};
//# sourceMappingURL=multer.config.js.map