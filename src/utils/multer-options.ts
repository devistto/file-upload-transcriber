import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer"
import path from "path";
import fs from "node:fs"
import { customAlphabet } from "nanoid"
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export const multerOptions: MulterOptions = {
    storage: diskStorage({
        destination(req, file, callback) {
            const base = path.join(process.cwd(), "temp");
            const fileFolder = customAlphabet("abcdefghijklmnopqrstuvwxyz123456789", 10);
            const filePath = path.join(base, fileFolder());

            if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
            return callback(null, filePath)
        },
        filename(req, file, callback) {
            return callback(null, file.originalname)
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
            return callback(new BadRequestException(`Acceptable mimetypes incluede ${mimetypes}`), false)
        };

        return callback(null, true)
    }
} 