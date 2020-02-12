const Sequelize = require('sequelize');
import sequelize from 'sequelize';
import { SEQUELIZE_DB_PARAMS } from '../config/DB_connection_config';

import { UserDB } from '../models/userDBSchema';
import { GroupDB } from '../models/groupDBSchema';
import { userGroupDB } from '../models/userGroupDBSchema';
import { groupMocks } from './dataSet/mockGroups';
const usersMocks = require('./dataSet/mockUsers.json');


const dbConnection = new Sequelize(...SEQUELIZE_DB_PARAMS);

dbConnection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

  dbConnection.sync({ force: true}).then(async () => {
    await UserDB.bulkCreate(usersMocks);
    await GroupDB.bulkCreate(groupMocks);

    UserDB.belongsToMany(GroupDB, { through: userGroupDB });
    GroupDB.belongsToMany(UserDB, { through: userGroupDB });
  }); 
