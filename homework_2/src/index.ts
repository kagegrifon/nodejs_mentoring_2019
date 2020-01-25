import express from 'express';
import { userRouter } from './resourses/users/service';

const app = express();
const port = 3000;

app.listen(port, () => console.log(`Start listening on port ${port}`));

process.on('uncaughtException', () => console.log('uncaughtException'));
process.on('SIGTERM', () => console.log('SIGTERM'));

app.get('/', function (req, res) {
  const taskDescribing = `
  <h1>API description:</h1>
    <ul>
      <li>
        get user by id: <b>GET</b> on url: {HOST}/user/:userId;
      </li>
      <li>add user: <b>POST</b> on url: {HOST}/user/{queries: login, password, age},<br>
        queries description see in creatingUserSchema;
      </li>
      <li>
        update user: <b>PUT</b> on url: {HOST}/user/:userId{queries: login, password, age},<br>
        queries description see in updatingUserSchema;
      </li>
      <li>
        delete user: <b>DELETE</b> on url: {HOST}/user/:userId;
      </li>
      <li>
        get suggestion by name and limit: <b>GET</b> on url: {HOST}/user/get-suggestions{queries: loginSubstring, limit},<br>
        queries description see in autoSuggestUserSchema;
      </li>
    </ul>
  `;
  res.send(taskDescribing);
})

app.use('/user', userRouter);




