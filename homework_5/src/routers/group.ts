import express from 'express';

import { infoLogger, errorLogger, getRouterErrorLogger } from '../logger';
import { groupValidators } from '../validators/group';
import { GroupService } from '../services/group';

import { GroupDB } from '../models/group';

const groupService = new GroupService(GroupDB);
export const groupRouter = express.Router();
const logError = getRouterErrorLogger({
  logger: errorLogger,
  level: 'warn',
  layer: 'GroupRouter',
});

groupRouter.get('/', 
  async function (req, res) {
    const groups = await groupService.getAll();
    res.send(groups);
  }
);

groupRouter.get('/:groupId', 
  async function (req, res) {
    const { groupId } = req.params;
    const group = await groupService.get(groupId);

    if (group) {
      res.send(group);
    } else {
      infoLogger.log('info', `There is no group with such id: ${groupId}`);
      res.status(404).send(`There is no group with such id: ${groupId}`);
    }
  }
);

groupRouter.post('/',
  groupValidators.create,
  async function (req, res) {
    try {      
      const groupDTO = req.body;
      
      const groupID = await groupService.create(groupDTO);
      res.send(`Request was successful done, new group was added. New group id = ${groupID}`);
    } catch(e) {
      logError('Error on create user', req, res, e);
      res.status(400).send(e);
    }  
  }
);

groupRouter.put('/:groupId', 
  groupValidators.update,
  async function (req, res) {
    let reportMessage = 'Request was successful done, group was updated';

    try {
      const { groupId } = req.params;
      const groupDTO = req.body;

      await groupService.update(groupId, groupDTO);
    } catch(e) {
      logError('Error on update user', req, res, e);
      reportMessage = `Something went wrong, ${e.message}`;
    }

    res.send(reportMessage);
  }
);

groupRouter.delete('/:groupId',
  async function (req, res) {
    let reportMessage = 'Request was successful done, group was deleted';

    try {
      const { groupId } = req.params;

      await groupService.remove(groupId);
    } catch(e) {
      logError('Error on delete user', req, res, e);
      reportMessage = `Something went wrong, ${e.message}`;
      res.status(400);
    }

    res.send(reportMessage);
  }
);
