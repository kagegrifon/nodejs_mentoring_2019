"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var userDBSchema_1 = require("./userDBSchema");
var Op = require("sequelize").Op;
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.addUser = function (newUserData) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userDBSchema_1.UserDB.create(newUserData)];
                    case 1:
                        id = (_a.sent()).id;
                        return [2 /*return*/, String(id)];
                }
            });
        });
    };
    UserModel.prototype.getUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userDBSchema_1.UserDB.findOne({
                            where: {
                                id: userId,
                                isDeleted: false,
                            },
                            raw: true,
                        })];
                    case 1:
                        user = _a.sent();
                        result = null;
                        if (user) {
                            result = {
                                id: user.id,
                                login: user.login,
                                password: user.password,
                                age: user.age,
                            };
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    UserModel.prototype.updateUser = function (userId, updatedUserData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userDBSchema_1.UserDB.update(updatedUserData, {
                            where: {
                                isDeleted: false,
                                id: userId
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.removeUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userDBSchema_1.UserDB.update({ isDeleted: true }, {
                            where: {
                                id: userId,
                                isDeleted: false,
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.getAutoSuggestUsers = function (loginSubstring, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var dbFoundUsers, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, userDBSchema_1.UserDB.findAll({ limit: limit, order: [['login', 'DESC']] }, {
                            where: {
                                isDeleted: false,
                                login: (_a = {},
                                    _a[Op.like] = loginSubstring,
                                    _a)
                            }
                        })];
                    case 1:
                        dbFoundUsers = _b.sent();
                        result = dbFoundUsers.map(function (dbUser) {
                            return {
                                id: dbUser.id,
                                login: dbUser.login,
                                password: dbUser.password,
                                age: dbUser.age,
                            };
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map