
const Sequelize = require("sequelize");

import { infoLogger, errorLogger } from '../logger';

import { UserDB } from '../models/user';
import { GroupDB } from '../models/group';
import { authDB } from '../models/authorization';
import { userGroupDB } from '../models/userGroup';

import { groupMocks } from './dataSet/mockGroups';

const usersMocks = require('./dataSet/mockUsers.json');
const authMocks = require('./dataSet/mockAuth.json');

const config = require('config');
const connectionConfig = config.get('dbConntection');

const dbConnection = new Sequelize(...connectionConfig);

dbConnection
  .authenticate()
  .then(() => { infoLogger.log('info', 'Connection has been established successfully.'); })
  .catch((err: Error) => { errorLogger.log('error', 'Unable to connect to the database:', err); });

  dbConnection.sync({ force: true }).then(async () => {
    try {
      await UserDB.bulkCreate(usersMocks);
      await GroupDB.bulkCreate(groupMocks);
      await authDB.bulkCreate(authMocks);
    } catch(e) {
      errorLogger.log('error', 'Error while bulk create', e);
    }

    UserDB.belongsToMany(GroupDB, { through: userGroupDB });
    GroupDB.belongsToMany(UserDB, { through: userGroupDB });
  }); 
