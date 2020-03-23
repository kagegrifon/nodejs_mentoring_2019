
const Sequelize = require("sequelize");

import { infoLogger, errorLogger } from '../logger';

import { UserDB } from '../components/user/model';
import { GroupDB } from '../components/group/model';
import { authDB } from '../components/authorization/model';
import { userGroupDB } from '../components/user_group/model';

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
