import express from 'express';
import { UserValidators } from '../validators/user';
import { UserService } from '../services/user';

import { UserDB } from '../models/user';

const userService = new UserService(UserDB);
export const userRouter = express.Router();

userRouter.get('/:userId', 
  async function (req, res) {
    const { userId } = req.params;
    const user = await userService.get(userId);

    if (user) {
      res.send(user);
    } else {
      res.status(404).send(`There is no user with such id: ${userId}`);
    }
  }
);

userRouter.post('/',
  UserValidators.createNewUser,
  async function (req, res) {
    try {      
      const userDTO = req.query;
      const userID = await userService.create(userDTO);
      res.send(`Request was successful done, new user was added. New user id = ${userID}`);
    } catch(e) {
      res.status(400).send(e);
    }  
  }
);

userRouter.put('/:userId', 
  UserValidators.updateUser,
  async function (req, res) {
    let reportMessage = 'Request was successful done, user was updated';

    try {
      const { userId } = req.params;

      const userDTO = req.body;
      await userService.update(userId, userDTO);
    } catch(e) {
      reportMessage = `Something went wrong, ${e.message}`;
    }

    res.send(reportMessage);
  }
);

userRouter.delete('/:userId',
  async function (req, res) {
    let reportMessage = 'Request was successful done, user was deleted';

    try {
      const { userId } = req.params;

      await userService.remove(userId);
    } catch(e) {
      reportMessage = `Something went wrong, ${e.message}`;
      res.status(400);
    }

    res.send(reportMessage);
  }
);

userRouter.get('/get-suggestions', 
  UserValidators.autoSuggestUser,
  async function (req, res) {
    try {
      const { loginSubstring, limit } = req.query;
      
      const suggestions = await userService.getAutoSuggestUsers(loginSubstring, Number(limit));
      res.send(suggestions);
    } catch(e) {
      res.status(500).send(e);
    }
  }
);
