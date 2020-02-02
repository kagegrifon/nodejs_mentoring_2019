import express from 'express';
import { userRouter } from './resourses/users/controller';

import { taskDescribing } from './tastDescribingLayout';

const app = express();
const port = 3000;

app.listen(port, () => console.log(`Start listening on port ${port}`));

process.on('uncaughtException', () => console.log('uncaughtException'));
process.on('SIGTERM', () => console.log('SIGTERM'));

app.get('/', function (req, res) {
  res.send(taskDescribing);
})

app.use('/user', userRouter);




