"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var userDBSchema_1 = require("./userDBSchema");
var groupDBSchema_1 = require("./groupDBSchema");
var dbInit_1 = require("../data-access/dbInit");
var TABLE_NAME = 'UserGroup';
var userGroupDB = dbInit_1.dbConnection.define(TABLE_NAME, {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.userGroupDB = userGroupDB;
userGroupDB.sync()
    .then(function () {
    userDBSchema_1.UserDB.belongsToMany(groupDBSchema_1.GroupDB, { through: userGroupDB });
    groupDBSchema_1.GroupDB.belongsToMany(userDBSchema_1.UserDB, { through: userGroupDB });
})
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=userGroupDBSchema.js.map