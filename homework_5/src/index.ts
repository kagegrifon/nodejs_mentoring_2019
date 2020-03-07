import express from 'express';
import { userRouter } from './routers/user';
import { groupRouter } from './routers/group';
import { userGroupRouter } from './routers/userGroup';
import { infoLogger, errorLogger, exceptionLogger, serverInfoLoggerHandler } from './logger';


const app = express();
const port = 3000;

app.listen(port, () => infoLogger.log('info', `Start listening on port ${port}`));

app.use(express.json());
app.use(serverInfoLoggerHandler);
app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/user-group', userGroupRouter); 


process.on('uncaughtException', (error) => { exceptionLogger.log('error', 'Get uncaughtException error', error); });
process.on('SIGTERM', () => { errorLogger.log('warn', 'Ocurred SIGTERM'); });