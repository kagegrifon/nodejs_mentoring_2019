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
var group_1 = require("../validators/group");
var group_2 = require("../services/group");
var group_3 = require("../models/group");
var groupModel = new group_3.GroupModel();
var groupService = new group_2.GroupService(groupModel);
exports.groupRouter = express_1.default.Router();
exports.groupRouter.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var groups;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, groupService.getAll()];
                case 1:
                    groups = _a.sent();
                    res.send(groups);
                    return [2 /*return*/];
            }
        });
    });
});
exports.groupRouter.get('/:groupId', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var groupId, group;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    groupId = req.params.groupId;
                    return [4 /*yield*/, groupService.get(groupId)];
                case 1:
                    group = _a.sent();
                    if (group) {
                        res.send(group);
                    }
                    else {
                        res.status(404).send("There is no group with such id: " + groupId);
                    }
                    return [2 /*return*/];
            }
        });
    });
});
exports.groupRouter.post('/', group_1.groupValidators.create, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var groupDTO, groupID, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    groupDTO = req.body;
                    return [4 /*yield*/, groupService.create(groupDTO)];
                case 1:
                    groupID = _a.sent();
                    res.send("Request was successful done, new group was added. New group id = " + groupID);
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
exports.groupRouter.put('/:groupId', group_1.groupValidators.update, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var reportMessage, groupId, groupDTO, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reportMessage = 'Request was successful done, group was updated';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    groupId = req.params.groupId;
                    groupDTO = req.body;
                    console.log('req.body', req.body);
                    return [4 /*yield*/, groupService.update(groupId, groupDTO)];
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
exports.groupRouter.delete('/:groupId', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var reportMessage, groupId, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reportMessage = 'Request was successful done, group was deleted';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    groupId = req.params.groupId;
                    return [4 /*yield*/, groupService.remove(groupId)];
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
//# sourceMappingURL=group.js.map