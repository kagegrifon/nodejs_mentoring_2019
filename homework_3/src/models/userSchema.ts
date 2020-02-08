import { db } from '../data-access/dbInit';

const Sequelize = require('sequelize');

const User = db.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,        
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

export { User };
