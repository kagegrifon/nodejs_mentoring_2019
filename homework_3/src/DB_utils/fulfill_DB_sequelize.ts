const Sequelize = require('sequelize');
import { SEQUELIZE_DB_PARAMS } from '../config/DB_connection_config';

import { User } from '../models/userSchema';
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

  User.sync({ force: true }).then(() => {
    User.bulkCreate(usersMocks);
  });

  
