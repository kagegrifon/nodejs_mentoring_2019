"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require('sequelize');
var DB_connection_config_1 = require("../config/DB_connection_config");
exports.dbConnection = new (Sequelize.bind.apply(Sequelize, __spreadArrays([void 0], DB_connection_config_1.SEQUELIZE_DB_PARAMS)))();
exports.dbConnection
    .authenticate()
    .then(function () {
    console.log('Connection has been established successfully.');
})
    .catch(function (err) {
    console.error('Unable to connect to the database:', err);
});
// export const User = db.define('users', {
//   id: {
//     primaryKey: true,
//     autoIncrement: true,
//     type: Sequelize.INTEGER,        
//   },
//   isDeleted: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false,
//   },
//   login: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   age: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   }
// });
//# sourceMappingURL=dbInit.js.map