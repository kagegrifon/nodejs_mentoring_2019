import express from 'express';

import { infoLogger, errorLogger, getRouterErrorLogger } from '../../logger';
import { UserValidators } from './validators';
import { UserService } from './service';

import { UserDB } from './model';

const userService = new UserService(UserDB);
export const userRouter = express.Router();

const logError = getRouterErrorLogger({
  logger: errorLogger,
  level: 'warn',
  layer: 'UserRouter',
});

userRouter.get('/get-suggestions', 
  UserValidators.autoSuggestUser,
  async function (req, res) {
    try {
      const { loginSubstring, limit } = req.query;
      
      const suggestions = await userService.getAutoSuggestUsers(loginSubstring, Number(limit));
      res.send(suggestions);
    } catch(error) {
      logError('Error on get user suggestions', req, res, error);
      res.status(500).send(error);
    }
  }
);

userRouter.get('/:userId', 
  async function (req, res) {
    const { userId } = req.params;

    try {      
      const user = await userService.get(userId);

      if (user) {
        res.send(user);
      } else {
        infoLogger.log('info', `There is no user with such id: ${userId}`);
        res.status(404).send(`There is no user with such id: ${userId}`);
      }
    } catch(error) {
      logError('Error on get user', req, res, error);
      res.status(500).send(error);
    }
  }
);

userRouter.post('/',
  UserValidators.createNewUser,
  async function (req, res) {
    try {      
      const userDTO = req.body;
      const userID = await userService.create(userDTO);
      res.send(`Request was successful done, new user was added. New user id = ${userID}`);
    } catch(error) {
      logError('Error on create user', req, res, error);
      res.status(500).send(error);
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
    } catch(error) {
      logError('Error on update user', req, res, error);
      reportMessage = `Something went wrong, ${error.message}`;
      res.status(500);
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
    } catch(error) {
      logError('Error on delete user', req, res, error);
      reportMessage = `Something went wrong, ${error.message}`;
      res.status(500);
    }

    res.send(reportMessage);
  }
);
