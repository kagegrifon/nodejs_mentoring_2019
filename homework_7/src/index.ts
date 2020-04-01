import express from 'express';

import { EndpointRoutes } from './constants';
import { userRouter } from './components/user/router';
import { groupRouter } from './components/group/router';
import { userGroupRouter } from './components/user_group/router';
import { authRouter } from './components/authorization/router';
import { checkToken } from './middleware/checkToken';
import { infoLogger, errorLogger, exceptionLogger, serverInfoLoggerHandler } from './logger';

const config = require('config');
export const app = express();
const port = config.get('app.port');

const cors = require('cors');

export const server = app.listen(port, () => infoLogger.log('info', `Start listening on port ${port}`));

app.use(cors())
app.use(express.json());
app.use(serverInfoLoggerHandler);
app.use(EndpointRoutes.user, checkToken, userRouter);
app.use(EndpointRoutes.group, checkToken, groupRouter);
app.use(EndpointRoutes.userGroup, checkToken, userGroupRouter); 
app.use(EndpointRoutes.login, authRouter);

process.on('uncaughtException', (error) => { exceptionLogger.log('error', 'Get uncaughtException error', error); });
process.on('SIGTERM', () => { errorLogger.log('warn', 'Ocurred SIGTERM'); });
