import { DataTypes } from 'sequelize';

import { dbConnection } from '../data-access/dbInit';
import { Permission } from '../interfaces/groups';

import { errorLogger } from '../logger';

const TABLE_NAME = 'groups';
export const groupDBTableProps = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,        
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.ENUM(
      ...Object.keys(Permission)
    )),
    allowNull: false,
  },
};

const GroupDB = dbConnection.define(TABLE_NAME, groupDBTableProps);

GroupDB.sync()
  .catch((err: Error) => { errorLogger.log('error', 'Error on sync GroupDB', err); });

export { GroupDB };
 