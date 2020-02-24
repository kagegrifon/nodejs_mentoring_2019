import { DataTypes } from 'sequelize';
import { UserDB } from './user';
import { GroupDB } from './group';

import { errorLogger } from '../logger';

import { dbConnection } from '../data-access/dbInit';

const TABLE_NAME = 'UserGroup';

const userGroupDB = dbConnection.define(TABLE_NAME, {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,      
    allowNull: false,  
  },
});

UserDB.belongsToMany(GroupDB, { through: userGroupDB });
GroupDB.belongsToMany(UserDB, { through: userGroupDB });

userGroupDB.sync()
  .catch((err: Error) => { errorLogger.log('error', 'Error on sync userGroupDB', err); });

export { userGroupDB };
 