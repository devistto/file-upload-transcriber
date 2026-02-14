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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscribeOptionsDto = exports.Language = void 0;
const class_validator_1 = require("class-validator");
var Language;
(function (Language) {
    Language["Portuguese"] = "pt";
    Language["English"] = "en";
    Language["Spanish"] = "es";
    Language["French"] = "fr";
    Language["German"] = "de";
    Language["Italian"] = "it";
    Language["Japanese"] = "ja";
    Language["Korean"] = "ko";
    Language["Chinese"] = "zh";
    Language["Russian"] = "ru";
    Language["Arabic"] = "ar";
})(Language || (exports.Language = Language = {}));
class TranscribeOptionsDto {
    language;
    translate;
}
exports.TranscribeOptionsDto = TranscribeOptionsDto;
__decorate([
    (0, class_validator_1.IsEnum)(Language),
    __metadata("design:type", String)
], TranscribeOptionsDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsIn)(["None", "English"]),
    __metadata("design:type", String)
], TranscribeOptionsDto.prototype, "translate", void 0);
//# sourceMappingURL=transcribe.options.dto.js.map