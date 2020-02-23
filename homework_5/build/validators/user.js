"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var userSchema_1 = require("./userSchema");
exports.UserValidators = {
    createNewUser: function (req, res, next) {
        if (utils_1.validateData(req.query, userSchema_1.creatingUserSchema)) {
            next();
        }
        else {
            res.status(400).send();
        }
    },
    updateUser: function (req, res, next) {
        if (utils_1.validateData(req.query, userSchema_1.updatingUserSchema)) {
            next();
        }
        else {
            res.status(400).send();
        }
    },
    autoSuggestUser: function (req, res, next) {
        if (utils_1.validateData(req.query, userSchema_1.autoSuggestUserSchema)) {
            next();
        }
        else {
            res.status(400).send();
        }
    },
};
//# sourceMappingURL=user.js.map