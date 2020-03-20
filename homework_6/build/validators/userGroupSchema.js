"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
exports.addUsersToGroupSchema = joi_1.default.object({
    groupId: joi_1.default.number()
        .required()
        .integer(),
    usersId: joi_1.default.array()
        .items(joi_1.default.number().integer())
        .required()
});
exports.removeUsersFromGroupSchema = exports.addUsersToGroupSchema;
//# sourceMappingURL=userGroupSchema.js.map