import express from 'express';

import { infoLogger, errorLogger, getRouterErrorLogger } from '../../logger';
import { UserValidators } from './validators';
import { UserService } from './service';
import { checkToken } from '../../middleware/checkToken'

import { UserDB } from './model';

const userService = new UserService(UserDB);
export const userRouter = express.Router();

const logError = getRouterErrorLogger({
  logger: errorLogger,
  level: 'warn',
  layer: 'UserRouter',
});

userRouter.use(checkToken);

userRouter.get('/:userId', 
  async function (req, res) {
    const { userId } = req.params;
    const user = await userService.get(userId);

    if (user) {
      res.send(user);
    } else {
      infoLogger.log('info', `There is no user with such id: ${userId}`);
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
      logError('Error on create user', req, res, e);
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
      logError('Error on update user', req, res, e);
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
      logError('Error on delete user', req, res, e);
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
      logError('Error on get user suggestions', req, res, e);
      res.status(500).send(e);
    }
  }
);
