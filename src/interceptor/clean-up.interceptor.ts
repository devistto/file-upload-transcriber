import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable } from "rxjs";
import { cleanup } from "src/utils/clean-up";

export class CleanUpInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const ctx = context.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request & { file?: Express.Multer.File }>();

        if (!req.file) throw new BadRequestException('File is missing');

        const filePath = req.file.path;

        res.on("close", () => cleanup(filePath));
        res.on("finish", () => cleanup(filePath))

        res.on("error", (err) => {
            console.log(err);
            cleanup(filePath)
        })

        return next.handle()
    }
}