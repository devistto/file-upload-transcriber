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
exports.WhisperOptionsDto = exports.WhisperLanguage = void 0;
const class_validator_1 = require("class-validator");
var WhisperLanguage;
(function (WhisperLanguage) {
    WhisperLanguage["Afrikaans"] = "af";
    WhisperLanguage["Arabic"] = "ar";
    WhisperLanguage["Armenian"] = "hy";
    WhisperLanguage["Azerbaijani"] = "az";
    WhisperLanguage["Belarusian"] = "be";
    WhisperLanguage["Bosnian"] = "bs";
    WhisperLanguage["Bulgarian"] = "bg";
    WhisperLanguage["Catalan"] = "ca";
    WhisperLanguage["Chinese"] = "zh";
    WhisperLanguage["Croatian"] = "hr";
    WhisperLanguage["Czech"] = "cs";
    WhisperLanguage["Danish"] = "da";
    WhisperLanguage["Dutch"] = "nl";
    WhisperLanguage["English"] = "en";
    WhisperLanguage["Estonian"] = "et";
    WhisperLanguage["Finnish"] = "fi";
    WhisperLanguage["French"] = "fr";
    WhisperLanguage["Galician"] = "gl";
    WhisperLanguage["German"] = "de";
    WhisperLanguage["Greek"] = "el";
    WhisperLanguage["Hebrew"] = "he";
    WhisperLanguage["Hindi"] = "hi";
    WhisperLanguage["Hungarian"] = "hu";
    WhisperLanguage["Icelandic"] = "is";
    WhisperLanguage["Indonesian"] = "id";
    WhisperLanguage["Italian"] = "it";
    WhisperLanguage["Japanese"] = "ja";
    WhisperLanguage["Kannada"] = "kn";
    WhisperLanguage["Kazakh"] = "kk";
    WhisperLanguage["Korean"] = "ko";
    WhisperLanguage["Latvian"] = "lv";
    WhisperLanguage["Lithuanian"] = "lt";
    WhisperLanguage["Macedonian"] = "mk";
    WhisperLanguage["Malay"] = "ms";
    WhisperLanguage["Marathi"] = "mr";
    WhisperLanguage["Maori"] = "mi";
    WhisperLanguage["Nepali"] = "ne";
    WhisperLanguage["Norwegian"] = "no";
    WhisperLanguage["Persian"] = "fa";
    WhisperLanguage["Polish"] = "pl";
    WhisperLanguage["Portuguese"] = "pt";
    WhisperLanguage["Romanian"] = "ro";
    WhisperLanguage["Russian"] = "ru";
    WhisperLanguage["Serbian"] = "sr";
    WhisperLanguage["Slovak"] = "sk";
    WhisperLanguage["Slovenian"] = "sl";
    WhisperLanguage["Spanish"] = "es";
    WhisperLanguage["Swahili"] = "sw";
    WhisperLanguage["Swedish"] = "sv";
    WhisperLanguage["Tagalog"] = "tl";
    WhisperLanguage["Tamil"] = "ta";
    WhisperLanguage["Thai"] = "th";
    WhisperLanguage["Turkish"] = "tr";
    WhisperLanguage["Ukrainian"] = "uk";
    WhisperLanguage["Urdu"] = "ur";
    WhisperLanguage["Vietnamese"] = "vi";
    WhisperLanguage["Welsh"] = "cy";
})(WhisperLanguage || (exports.WhisperLanguage = WhisperLanguage = {}));
class WhisperOptionsDto {
    task;
    audio_language;
}
exports.WhisperOptionsDto = WhisperOptionsDto;
__decorate([
    (0, class_validator_1.IsIn)(["translate", "transcribe"]),
    __metadata("design:type", String)
], WhisperOptionsDto.prototype, "task", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(WhisperLanguage),
    __metadata("design:type", String)
], WhisperOptionsDto.prototype, "audio_language", void 0);
//# sourceMappingURL=whisper-options.dto.js.map