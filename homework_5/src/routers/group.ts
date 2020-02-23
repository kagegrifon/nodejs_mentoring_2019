import express from 'express';
import { groupValidators } from '../validators/group';
import { GroupService } from '../services/group';

import { GroupDB } from '../models/group';

// const groupModel = new GroupModel();
const groupService = new GroupService(GroupDB);

export const groupRouter = express.Router();

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
      console.log('req.body',  req.body)

      await groupService.update(groupId, groupDTO);
    } catch(e) {
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
      reportMessage = `Something went wrong, ${e.message}`;
      res.status(400);
    }

    res.send(reportMessage);
  }
);
