import express from 'express';
import { Validators } from './validators';
import { UserService } from './service';

import { UserModel } from './model';

const userModel = new UserModel();
const userService = new UserService(userModel);

// userService.getUser('14').then(user => console.log(user));
// userService.removeUser('13').then(() => {
//   console.log(`delete user 13`)
//   userService.getUser('13').then(user => console.log(user));
// });

// userService.getUser('14').then(user => console.log(user));
// userService.createNewUser({ login: 'sdfa', password: '2342rdsf', age: 43 }).then(data =>
//   console.log('data', data)
// );
// userService.updateUser('12', { login: 'vasyad1' });
// userService.getAutoSuggestUsers('vas', 10).then(result => console.log(result));


export const userRouter = express.Router();

userRouter.get('/:userId', 
  async function (req, res) {
    console.log(`get, params = ${req.params}`);

    const { userId } = req.params;
    const user = await userService.getUser(userId);

    if (user) {
      res.send(user);
    } else {
      res.status(404).send(`There is no user with such id: ${userId}`);
    }
  }
);

userRouter.post('/',
  Validators.createNewUser,
  async function (req, res) {
    console.log(`create, query = ${req.query}`);

    try {      
      const userDTO = req.query;
      const userID = await userService.createNewUser(userDTO);
      res.send(`Request was successful done, new user was added. New user id = ${userID}`);
    } catch(e) {
      res.status(400).send(e);
    }  
  }
);

userRouter.put('/:userId', 
  Validators.updateUser,
  async function (req, res) {
    console.log(`update, params = ${req.params}, query = ${req.query}`);

    let reportMessage = 'Request was successful done, user was updated';

    try {
      const { userId } = req.params;

      const userDTO = req.query;
      await userService.updateUser(userId, userDTO);
    } catch(e) {
      reportMessage = `Something went wrong, ${e.message}`;
    }

    res.send(reportMessage);
  }
);

userRouter.delete('/:userId',
  async function (req, res) {
    console.log(`delete, params = ${req.params}`);

    let reportMessage = 'Request was successful done, user was deleted';

    try {
      const { userId } = req.params;

      await userService.removeUser(userId);
    } catch(e) {
      reportMessage = `Something went wrong, ${e.message}`;
      res.status(400);
    }

    res.send(reportMessage);
  }
);

userRouter.get('/get-suggestions', 
  Validators.autoSuggestUser,
  async function (req, res) {
    console.log(`get-suggestions, query = ${req.query}`);

    try {
      const { loginSubstring, limit } = req.query;
      
      const suggestions = await userService.getAutoSuggestUsers(loginSubstring, Number(limit));
      res.send(suggestions);
    } catch(e) {
      res.status(500).send(e);
    }
  }
);

