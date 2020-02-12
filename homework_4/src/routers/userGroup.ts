import express from 'express';
import { UserGroupValidators } from '../validators/userGroup';
import { UserGroupService } from '../services/userGroup';

import { UserGroupModel } from '../models/userGroup';

const groupModel = new UserGroupModel();
const groupService = new UserGroupService(groupModel);

export const userGroupRouter = express.Router();

userGroupRouter.post('/',
  UserGroupValidators.addUsersToGroup,
  async function (req, res) {
    try {      
      const data = req.body;
      
      await groupService.addUsersToGroup(data);
      res.send(`Request was successful done, users was added to group`);
    } catch(e) {
      console.log(e);
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
      console.log(e);
      res.status(400).send(e);
    }  
  }
);
