import express from 'express';

import { userRouter } from './routers/user';
import { groupRouter } from './routers/group';
import { userGroupRouter } from './routers/userGroup';
import { authRouter } from './routers/authorization';
import { checkToken } from './middleware/checkToken';
import { infoLogger, errorLogger, exceptionLogger, serverInfoLoggerHandler } from './logger';

const app = express();
const port = 3000;

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