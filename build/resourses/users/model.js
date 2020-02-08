"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var searchUserModel_1 = require("./searchUserModel");
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.counter = 1;
        this.users = {};
        this.searchModel = new searchUserModel_1.UserSearchModel();
    }
    UserModel.prototype.addUser = function (addingUser) {
        var newID = String(this.counter++);
        this.users[newID] = Object.assign({}, addingUser, { id: newID, isDeleted: false });
        this.searchModel.addToSearchTable(newID, addingUser.login);
        return newID;
    };
    UserModel.prototype.removeUser = function (userID) {
        if (this.users[userID] === undefined) {
            throw new Error("There is no user with such ID = " + userID);
        }
        this.users[userID].isDeleted = true;
        this.searchModel.removeFromSearchTable(userID, this.users[userID].login);
    };
    UserModel.prototype.updateUser = function (userID, updatedUser) {
        var updatingUser = this._getUser(userID);
        if (updatingUser) {
            // ToDo find deep joining object method in future
            Object.assign(updatingUser, updatedUser);
            var prevLogin = updatingUser.login;
            var newLogin = updatedUser.login;
            if (prevLogin !== newLogin) {
                this.searchModel.changeLoginInSearchTable(userID, prevLogin, newLogin);
            }
        }
    };
    UserModel.prototype.getUser = function (userID) {
        var userFromDB = this._getUser(userID);
        var result = null;
        if (userFromDB) {
            var isDeleted = userFromDB.isDeleted, avaliableData = __rest(userFromDB, ["isDeleted"]);
            result = avaliableData;
        }
        return result;
    };
    UserModel.prototype.getAutoSuggestUsers = function (loginSubstring, limit) {
        var _this = this;
        var userIDs = this.searchModel.getAutoSuggestUserIDs(loginSubstring, limit);
        var result = userIDs
            .map(function (userId) { return _this.getUser(userId); })
            .filter(function (user) { return user !== null; });
        result.sort(function (user1, user2) {
            var _a, _b;
            var stringCompare = ((_a = user1) === null || _a === void 0 ? void 0 : _a.login.toLowerCase()) > ((_b = user2) === null || _b === void 0 ? void 0 : _b.login.toLowerCase());
            return stringCompare ? 1 : -1;
        });
        return result;
    };
    UserModel.prototype._getUser = function (userID) {
        var result = null;
        if (this.users[userID] && !this.users[userID].isDeleted) {
            result = this.users[userID];
        }
        return result;
    };
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=model.js.map