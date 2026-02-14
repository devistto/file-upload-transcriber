import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer"
import path from "path";
import fs from "node:fs"
import { customAlphabet } from "nanoid"
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export const multerConfig: MulterOptions = {
    storage: diskStorage({
        destination(req, file, callback) {
            const baseFolder = path.join(process.cwd(), "tmp");
            const folder = customAlphabet("ASDFGHJKMNBVCXZ123456789", 10);
            const folderPath = path.join(baseFolder, folder());

            if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
            return callback(null, folderPath)
        },
        filename(req, file, callback) {
            return callback(null, file.originalname)
        },
    }),
    limits: {
        fileSize: 100 * 1024 * 1024
    },

    fileFilter(req, file, callback) {
        const exts = ["video/mpeg", "video/mov", "video/mp4", "video/wmv",
            "audio/m4a", "audio/aac", "audio/wav", "audio/mp3", "audio/ogg", "audio/wma"]

        if (!exts.includes(file.mimetype)) {
            const message = `Acceptable extensions incluede ${exts.map(ext => ext.split("/")[1]).join(", ")}`;
            return callback(new BadRequestException(message), false)
        };

        return callback(null, true)
    }
} 