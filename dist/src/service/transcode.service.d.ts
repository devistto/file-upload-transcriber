export declare class TranscodeService {
    private validate;
    extract(filePath: string): Promise<string>;
    burn(filePath: string, srtPath: string): Promise<unknown>;
}
