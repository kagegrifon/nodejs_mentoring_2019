const Sequelize = require('sequelize');
import { SEQUELIZE_DB_PARAMS } from '../config/DB_connection_config';
const usersMocks = require('./dataSet/mockUsers.json');

const db = new Sequelize(...SEQUELIZE_DB_PARAMS);

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

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

  User.sync({ force: true }).then(() => {
    User.bulkCreate(usersMocks);
  });

  
