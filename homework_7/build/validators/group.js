"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var groupSchema_1 = require("./groupSchema");
exports.groupValidators = {
    create: function (req, res, next) {
        if (utils_1.validateData(req.body, groupSchema_1.createGroupSchema)) {
            next();
        }
        else {
            res.status(400).send();
        }
    },
    update: function (req, res, next) {
        if (utils_1.validateData(req.body, groupSchema_1.updateGroupSchema)) {
            next();
        }
        else {
            res.status(400).send();
        }
    },
};
//# sourceMappingURL=group.js.map