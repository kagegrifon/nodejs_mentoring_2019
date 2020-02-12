"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
var groups_1 = require("../interfaces/groups");
exports.createGroupSchema = joi_1.default.object({
    name: joi_1.default.string()
        .required()
        .alphanum()
        .min(3)
        .max(30),
    permissions: joi_1.default.array()
        .valid(groups_1.Permission.DELETE, groups_1.Permission.READ, groups_1.Permission.WRITE, groups_1.Permission.SHARE, groups_1.Permission.UPLOAD_FILES)
        .required()
});
exports.updateGroupSchema = joi_1.default.object({
    name: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30),
    permissions: joi_1.default.array()
        .valid(groups_1.Permission.DELETE, groups_1.Permission.READ, groups_1.Permission.WRITE, groups_1.Permission.SHARE, groups_1.Permission.UPLOAD_FILES)
});
//# sourceMappingURL=groupSchema.js.map