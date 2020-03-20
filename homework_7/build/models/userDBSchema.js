"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbInit_1 = require("../data-access/dbInit");
var sequelize_1 = require("sequelize");
var UserDB = dbInit_1.dbConnection.define('users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    isDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    login: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
});
exports.UserDB = UserDB;
UserDB.sync()
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=userDBSchema.js.map