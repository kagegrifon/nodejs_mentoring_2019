import { dbConnection } from '../data-access/dbInit';
import { DataTypes } from 'sequelize';

import { errorLogger } from '../logger';

const UserDB = dbConnection.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,        
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

UserDB.sync()
  .catch((err: Error) => { errorLogger.log('error', 'Error on sync UserDB', err); });

export { UserDB };
