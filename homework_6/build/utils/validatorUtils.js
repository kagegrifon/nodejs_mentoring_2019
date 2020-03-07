"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = function (data, schema) {
    var _a = schema.validate(data), error = _a.error, value = _a.value;
    if (error) {
        throw error;
    }
    return value;
};
//# sourceMappingURL=validatorUtils.js.map