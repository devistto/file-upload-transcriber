import "dotenv/config"
import { Injectable } from "@nestjs/common";
import { TranscodeService } from "./transcode.service";
import Openai from 'openai'
import fs from "node:fs"
import path from "node:path";


@Injectable()
export class TranscriptionService {
    constructor(private transcodeService: TranscodeService) { }
    
    async create(filePath: string) {

    }
}