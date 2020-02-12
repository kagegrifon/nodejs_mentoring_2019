import express from 'express';
import { userRouter } from './routers/user';
import { groupRouter } from './routers/group';
import { userGroupRouter } from './routers/userGroup';


import { taskDescribing } from './taskDescribingLayout';

const app = express();
const port = 3000;

app.listen(port, () => console.log(`Start listening on port ${port}`));

process.on('uncaughtException', () => console.log('uncaughtException'));
process.on('SIGTERM', () => console.log('SIGTERM'));

app.get('/', function (req, res) {
  res.send(taskDescribing);
});

app.use(express.json());

app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/user-group', userGroupRouter); 
