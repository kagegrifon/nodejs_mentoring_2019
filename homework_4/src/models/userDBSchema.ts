import { dbConnection } from '../data-access/dbInit';
import { DataTypes } from 'sequelize';

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
  .catch((err: Error)=> console.log(err));

export { UserDB };
