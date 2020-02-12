"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var dbInit_1 = require("../data-access/dbInit");
var groups_1 = require("../interfaces/groups");
var TABLE_NAME = 'groups';
// const tableFields = {
//   id: {
//     primaryKey: true,
//     autoIncrement: true,
//     type: DataTypes.INTEGER,        
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   permissions: {
//     type: DataTypes.ARRAY(DataTypes.ENUM(
//       ...Object.keys(Permission)
//     )),
//     allowNull: false,
//   },
// };
// class GroupDB extends Model {}
var GroupDB = dbInit_1.dbConnection.define(TABLE_NAME, {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.ENUM.apply(sequelize_1.DataTypes, Object.keys(groups_1.Permission))),
        allowNull: true,
    },
});
exports.GroupDB = GroupDB;
// GroupDB.init(
//   tableFields,
//   { sequelize: dbConnection, modelName: TABLE_NAME, timestamps: false },
// );
GroupDB.sync()
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=groupDBSchema.js.map