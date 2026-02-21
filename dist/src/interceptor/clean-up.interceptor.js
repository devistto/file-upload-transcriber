"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanUpInterceptor = void 0;
const common_1 = require("@nestjs/common");
const clean_up_1 = require("../utils/clean-up");
class CleanUpInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        if (!req.file)
            throw new common_1.BadRequestException('File is missing');
        const filePath = req.file.path;
        res.on("close", () => (0, clean_up_1.cleanup)(filePath));
        res.on("finish", () => (0, clean_up_1.cleanup)(filePath));
        res.on("error", (err) => {
            console.log(err);
            (0, clean_up_1.cleanup)(filePath);
        });
        return next.handle();
    }
}
exports.CleanUpInterceptor = CleanUpInterceptor;
//# sourceMappingURL=clean-up.interceptor.js.map