import express from 'express';

import { errorLogger, getRouterErrorLogger } from '../../logger';
import { UserGroupValidators } from './validators';
import { UserGroupService } from './service';

import { userGroupDB } from './model';

const groupService = new UserGroupService(userGroupDB);
export const userGroupRouter = express.Router();
const logError = getRouterErrorLogger({
  logger: errorLogger,
  level: 'warn',
  layer: 'UserGroupRouter',
});

userGroupRouter.post('/',
  UserGroupValidators.addUsersToGroup,
  async function (req, res) {
    try {      
      const data = req.body;
      
      await groupService.addUsersToGroup(data);
      res.send(`Request was successful done, users was added to group`);
    } catch(e) {
      logError('Error on add users group', req, res, e);
      res.status(400).send(e);
    }  
  }
);

userGroupRouter.delete('/', 
  UserGroupValidators.removeUsersFromGroup,
  async function (req, res) {
    try {      
      const data = req.body;
      
      await groupService.deleteUsersFromGroup(data);
      res.send(`Request was successful done, users was removed from group`);
    } catch(e) {
      logError('Error on remove users from group', req, res, e);
      res.status(400).send(e);
    }  
  }
);
