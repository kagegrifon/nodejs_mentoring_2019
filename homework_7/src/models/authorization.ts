import { DataTypes } from 'sequelize';

import { errorLogger } from '../logger';

import { dbConnection } from '../data-access/dbInit';

const TABLE_NAME = 'auth';

const authDB = dbConnection.define(TABLE_NAME, {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,      
    allowNull: false,  
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, 
  }
});

authDB.sync()
  .catch((err: Error) => { errorLogger.log('error', 'Error on sync authDB', err); });

export { authDB };
 