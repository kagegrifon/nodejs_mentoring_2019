"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserSearchModel = /** @class */ (function () {
    function UserSearchModel() {
        this.searchTable = {};
    }
    UserSearchModel.prototype.removeFromSearchTable = function (userID, login) {
        var _this = this;
        var deleteWays = {
            fastDelete: function () { delete _this.searchTable[login]; },
            deepDelete: function () {
                var deletingIndex = _this.searchTable[login].indexOf(userID);
                if (deletingIndex !== -1) {
                    _this.searchTable[login].splice(deletingIndex, 1);
                }
            },
        };
        var deleteWay = this.searchTable[login].length === 1 ? 'fastDelete' : 'deepDelete';
        deleteWays[deleteWay]();
    };
    UserSearchModel.prototype.addToSearchTable = function (userID, login) {
        this.searchTable[login] = this.searchTable[login] || [];
        this.searchTable[login].push(userID);
    };
    UserSearchModel.prototype.changeLoginInSearchTable = function (userID, prevLogin, newLogin) {
        this.removeFromSearchTable(userID, prevLogin);
        this.addToSearchTable(userID, newLogin);
    };
    UserSearchModel.prototype.getAutoSuggestUserIDs = function (loginSubstring, limit) {
        var logins = Object.keys(this.searchTable);
        var regExpSearch = new RegExp(loginSubstring);
        var result = [];
        var i = 0;
        while (i < logins.length && result.length < limit) {
            if (regExpSearch.test(logins[i].toLowerCase())) {
                result.push.apply(result, this.searchTable[logins[i]]);
            }
            i++;
        }
        if (result.length > limit) {
            result.length = limit;
        }
        return result;
    };
    return UserSearchModel;
}());
exports.UserSearchModel = UserSearchModel;
//# sourceMappingURL=searchUserModel.js.map