"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("./routers/user");
var group_1 = require("./routers/group");
var userGroup_1 = require("./routers/userGroup");
var taskDescribingLayout_1 = require("./taskDescribingLayout");
var app = express_1.default();
var port = 3000;
app.listen(port, function () { return console.log("Start listening on port " + port); });
process.on('uncaughtException', function () { return console.log('uncaughtException'); });
process.on('SIGTERM', function () { return console.log('SIGTERM'); });
app.get('/', function (req, res) {
    res.send(taskDescribingLayout_1.taskDescribing);
});
app.use(express_1.default.json());
app.use('/user', user_1.userRouter);
app.use('/group', group_1.groupRouter);
app.use('/user-group', userGroup_1.userGroupRouter);
//# sourceMappingURL=index.js.map