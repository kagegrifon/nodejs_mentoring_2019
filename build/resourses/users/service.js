"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var model_1 = require("./model");
var validation_1 = require("./validation");
exports.userRouter = express_1.default.Router();
var userDB = new model_1.UserModel();
var validateData = function (data, schema) {
    var _a = schema.validate(data), error = _a.error, value = _a.value;
    if (error) {
        throw error;
    }
    return value;
};
exports.userRouter.post('/', function (req, res) {
    var reportMessage = 'Request was successful done, new user was added.';
    try {
        var newUserData = validateData(req.query, validation_1.creatingUserSchema);
        var newUserId = userDB.addUser(newUserData);
        reportMessage += " New user id = " + newUserId;
        res.send(reportMessage);
    }
    catch (e) {
        res.status(400).send(e);
    }
});
exports.userRouter.put('/:userId', function (req, res) {
    var reportMessage = 'Request was successful done, user was updated';
    try {
        var userId = req.params.userId;
        var updatingUserData = validateData(req.query, validation_1.updatingUserSchema);
        var currentUserData = userDB.getUser(userId);
        var updatedUserData = Object.assign({}, currentUserData, updatingUserData);
        userDB.updateUser(userId, updatedUserData);
    }
    catch (e) {
        reportMessage = "Something went wrong, " + e.message;
    }
    res.send(reportMessage);
});
exports.userRouter.delete('/:userId', function (req, res) {
    var reportMessage = 'Request was successful done, user was deleted';
    try {
        userDB.removeUser(req.params.userId);
    }
    catch (e) {
        reportMessage = "Something went wrong, " + e.message;
        res.status(400);
    }
    res.send(reportMessage);
});
exports.userRouter.get('/get-suggestions', function (req, res) {
    try {
        var _a = validateData(req.query, validation_1.autoSuggestUserSchema), loginSubstring = _a.loginSubstring, limit = _a.limit;
        var suggestions = userDB.getAutoSuggestUsers(loginSubstring, limit);
        res.send(suggestions);
    }
    catch (e) {
        res.status(400).send(e);
    }
});
exports.userRouter.get('/:userId', function (req, res) {
    var user = userDB.getUser(req.params.userId);
    if (user) {
        res.send(user);
    }
    else {
        res.status(404).send("There is no user with such id: " + req.params.userId);
    }
});
var mockUsers = [
    {
        login: 'Peter',
        password: "querty",
        age: 15,
    },
    {
        login: 'Fedor',
        password: "123456",
        age: 16,
    },
    {
        login: 'patric',
        password: "querty",
        age: 46,
    },
    {
        login: 'francua',
        password: "123456",
        age: 17,
    },
    {
        login: 'CrazyDroid',
        password: "querty",
        age: 15,
    },
    {
        login: 'Federal agent',
        password: "123456",
        age: 99,
    },
    {
        login: 'Sergey',
        password: "123456",
        age: 59,
    },
    {
        login: 'Pasha',
        password: "querty",
        age: 25,
    },
    {
        login: 'Nikolay',
        password: "123456",
        age: 56,
    },
    {
        login: 'Igor',
        password: "querty",
        age: 26,
    },
    {
        login: 'Maria',
        password: "123456",
        age: 17,
    },
    {
        login: 'Goga',
        password: "querty",
        age: 35,
    },
    {
        login: 'Natalia',
        password: "123456",
        age: 29,
    },
    {
        login: 'Sergey',
        password: "123456",
        age: 36,
    }
];
mockUsers.forEach(function (mockUser) { return userDB.addUser(mockUser); });
//# sourceMappingURL=service.js.map