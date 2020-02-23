"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var userGroupSchema_1 = require("./userGroupSchema");
exports.UserGroupValidators = {
    addUsersToGroup: function (req, res, next) {
        if (utils_1.validateData(req.body, userGroupSchema_1.addUsersToGroupSchema)) {
            next();
        }
        else {
            res.status(400).send();
        }
    },
    removeUsersFromGroup: function (req, res, next) {
        if (utils_1.validateData(req.body, userGroupSchema_1.removeUsersFromGroupSchema)) {
            next();
        }
        else {
            res.status(400).send();
        }
    },
};
//# sourceMappingURL=userGroup.js.map