import { infoLogger, errorLogger } from '../logger';
const Sequelize = require('sequelize');
import { SEQUELIZE_DB_PARAMS } from '../config/DB_connection_config';

export const dbConnection = new Sequelize(...SEQUELIZE_DB_PARAMS);

dbConnection
  .authenticate()
  .then(() => { infoLogger.log('info', 'Connection has been established successfully.'); })
  .catch((err: Error) => { errorLogger.log('error', 'Unable to connect to the database:', err); });
