import express from 'express';
import jwt from 'jsonwebtoken';

import { SECRET } from '../config/secret';

import { errorLogger, getRouterErrorLogger } from '../logger';
import { authValidators } from '../validators/authorization';

import { AuthService } from '../services/authorization';
import { UserService } from '../services/user';


import { authDB } from '../models/authorization';
import { UserDB } from '../models/user';

const authService = new AuthService(authDB);
const userService = new UserService(UserDB);

export const authRouter = express.Router();
const logError = getRouterErrorLogger({
  logger: errorLogger,
  level: 'warn',
  layer: 'AuthRouter',
});

authRouter.post('/',
  authValidators.getToken,
  async function (req, res) {
    try {
      const authDTO = req.body;
      const user = await userService.getByName(authDTO.username);
      let isValid = false;

      if (user !== null) isValid = await authService.login(authDTO);

      if (isValid) {
        const payload = { userId: user?.id };
        var token = jwt.sign(payload, SECRET, { expiresIn: 120 });
        res.send(token);
      } else {
        res.status(401).send({ message: 'Authentication fails. Incorrect login or password'});
      }
    } catch(e) {
      logError('Error on login', req, res, e);
      res.status(500).send(e);
    }  
  }
);
