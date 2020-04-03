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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../validators/user");
var user_2 = require("../services/user");
var user_3 = require("../models/user");
var userModel = new user_3.UserModel();
var userService = new user_2.UserService(userModel);
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/:userId', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.params.userId;
                    return [4 /*yield*/, userService.getUser(userId)];
                case 1:
                    user = _a.sent();
                    if (user) {
                        res.send(user);
                    }
                    else {
                        res.status(404).send("There is no user with such id: " + userId);
                    }
                    return [2 /*return*/];
            }
        });
    });
});
exports.userRouter.post('/', user_1.UserValidators.createNewUser, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userDTO, userID, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userDTO = req.query;
                    return [4 /*yield*/, userService.createNewUser(userDTO)];
                case 1:
                    userID = _a.sent();
                    res.send("Request was successful done, new user was added. New user id = " + userID);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    res.status(400).send(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.userRouter.put('/:userId', user_1.UserValidators.updateUser, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var reportMessage, userId, userDTO, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reportMessage = 'Request was successful done, user was updated';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    userId = req.params.userId;
                    userDTO = req.query;
                    return [4 /*yield*/, userService.updateUser(userId, userDTO)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    reportMessage = "Something went wrong, " + e_2.message;
                    return [3 /*break*/, 4];
                case 4:
                    res.send(reportMessage);
                    return [2 /*return*/];
            }
        });
    });
});
exports.userRouter.delete('/:userId', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var reportMessage, userId, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reportMessage = 'Request was successful done, user was deleted';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    userId = req.params.userId;
                    return [4 /*yield*/, userService.removeUser(userId)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    reportMessage = "Something went wrong, " + e_3.message;
                    res.status(400);
                    return [3 /*break*/, 4];
                case 4:
                    res.send(reportMessage);
                    return [2 /*return*/];
            }
        });
    });
});
exports.userRouter.get('/get-suggestions', user_1.UserValidators.autoSuggestUser, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, loginSubstring, limit, suggestions, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.query, loginSubstring = _a.loginSubstring, limit = _a.limit;
                    return [4 /*yield*/, userService.getAutoSuggestUsers(loginSubstring, Number(limit))];
                case 1:
                    suggestions = _b.sent();
                    res.send(suggestions);
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _b.sent();
                    res.status(500).send(e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
//# sourceMappingURL=user.js.map