import { Request, Response, NextFunction } from 'express';
import { validateData } from '../../utils';

import {
  addUsersToGroupSchema,
  removeUsersFromGroupSchema,
} from './validateSchema';

export const UserGroupValidators = {
  addUsersToGroup: (req: Request, res: Response, next: NextFunction) => {
    if (validateData(req.body, addUsersToGroupSchema)) {
     next();
    } else {
      res.status(400).send();
    }
  },
  removeUsersFromGroup: (req: Request, res: Response, next: NextFunction) => {
    if (validateData(req.body, removeUsersFromGroupSchema)) {
     next();
    } else {
      res.status(400).send();
    }
  },
};
