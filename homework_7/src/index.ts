import express from 'express';

import { userRouter } from './components/user/router';
import { groupRouter } from './components/group/router';
import { userGroupRouter } from './components/user_group/router';
import { authRouter } from './components/authorization/router';
import { checkToken } from './middleware/checkToken';
import { infoLogger, errorLogger, exceptionLogger, serverInfoLoggerHandler } from './logger';

const config = require('config');
const app = express();
const port = config.get('app.port');

const cors = require('cors');

app.listen(port, () => infoLogger.log('info', `Start listening on port ${port}`));

app.use(cors())
app.use(express.json());
app.use(serverInfoLoggerHandler);
app.use('/user', checkToken, userRouter);
app.use('/group', checkToken, groupRouter);
app.use('/user-group', checkToken, userGroupRouter); 
app.use('/login', authRouter);

process.on('uncaughtException', (error) => { exceptionLogger.log('error', 'Get uncaughtException error', error); });
process.on('SIGTERM', () => { errorLogger.log('warn', 'Ocurred SIGTERM'); });