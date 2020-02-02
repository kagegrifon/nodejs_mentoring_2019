"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
exports.creatingUserSchema = joi_1.default.object({
    login: joi_1.default.string()
        .required()
        .alphanum()
        .min(3)
        .max(30),
    password: joi_1.default.string()
        .required()
        .pattern(new RegExp('[a-zA-Z]'))
        .pattern(new RegExp('[0-9]')),
    age: joi_1.default.number()
        .required()
        .integer()
        .min(4)
        .max(130),
});
exports.updatingUserSchema = joi_1.default.object({
    login: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30),
    password: joi_1.default.string()
        .pattern(new RegExp('[a-zA-Z]'))
        .pattern(new RegExp('\d')),
    age: joi_1.default.number()
        .integer()
        .min(4)
        .max(130),
});
exports.autoSuggestUserSchema = joi_1.default.object({
    loginSubstring: joi_1.default.string()
        .required(),
    limit: joi_1.default.number()
        .required()
        .integer()
        .min(1)
        .max(100),
});
//# sourceMappingURL=validation.js.map