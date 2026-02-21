"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanup = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const cleanup = (filePath) => {
    const baseFolder = node_path_1.default.dirname(filePath);
    node_fs_1.default.rm(baseFolder, { recursive: true, force: true }, (err) => {
        if (err)
            console.log(err);
    });
};
exports.cleanup = cleanup;
//# sourceMappingURL=clean-up.js.map