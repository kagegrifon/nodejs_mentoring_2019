import express from 'express';
import { userRouter } from './routers/user';

import { taskDescribing } from './taskDescribingLayout';

const app = express();
const port = 3000;

app.listen(port, () => console.log(`Start listening on port ${port}`));

process.on('uncaughtException', () => console.log('uncaughtException'));
process.on('SIGTERM', () => console.log('SIGTERM'));

app.get('/', function (req, res) {
  res.send(taskDescribing);
})

app.use('/user', userRouter);




