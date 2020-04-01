import { infoLogger, errorLogger } from '../logger';

const Sequelize = require('sequelize');
const config = require('config');

const connectionConfig = config.get('dbConntection');
export const dbConnection = new Sequelize(...connectionConfig);

dbConnection
  .authenticate()
  .then(() => { infoLogger.log('info', 'Connection has been established successfully.'); })
  .catch((err: Error) => { errorLogger.log('error', 'Unable to connect to the database:', err); });
