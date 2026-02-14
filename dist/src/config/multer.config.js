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
            const baseFolder = path_1.default.join(process.cwd(), "tmp");
            const folder = (0, nanoid_1.customAlphabet)("ASDFGHJKMNBVCXZ123456789", 10);
            const folderPath = path_1.default.join(baseFolder, folder());
            if (!node_fs_1.default.existsSync(folderPath))
                node_fs_1.default.mkdirSync(folderPath, { recursive: true });
            return callback(null, folderPath);
        },
        filename(req, file, callback) {
            return callback(null, file.originalname);
        },
    }),
    limits: {
        fileSize: 100 * 1024 * 1024
    },
    fileFilter(req, file, callback) {
        const exts = ["video/mpeg", "video/mov", "video/mp4", "video/wmv",
            "audio/m4a", "audio/aac", "audio/wav", "audio/mp3", "audio/ogg", "audio/wma"];
        if (!exts.includes(file.mimetype)) {
            const message = `Acceptable extensions incluede ${exts.map(ext => ext.split("/")[1]).join(", ")}`;
            return callback(new common_1.BadRequestException(message), false);
        }
        ;
        return callback(null, true);
    }
};
//# sourceMappingURL=multer.config.js.map