import { Request, Response, NextFunction } from 'express';
import { validateData } from '../utils';

import {
  createGroupSchema,
  updateGroupSchema,
} from './groupSchema';

export const groupValidators = {
  create: (req: Request, res: Response, next: NextFunction) => {
    if (validateData(req.body, createGroupSchema)) {
     next();
    } else {
      res.status(400).send();
    }
  },
  update: (req: Request, res: Response, next: NextFunction) => {
    if (
      validateData(req.body, updateGroupSchema)
    ) {
     next();
    } else {
      res.status(400).send();
    }
  },
}

