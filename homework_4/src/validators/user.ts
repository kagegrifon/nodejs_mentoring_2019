import { Request, Response, NextFunction } from 'express';
import { validateData } from '../utils';

import {
  creatingUserSchema,
  updatingUserSchema,
  autoSuggestUserSchema
} from './userSchema';

export const UserValidators = {
  createNewUser: (req: Request, res: Response, next: NextFunction) => {
    if (validateData(req.query, creatingUserSchema)) {
     next();
    } else {
      res.status(400).send();
    }
  },
  updateUser: (req: Request, res: Response, next: NextFunction) => {
    if (validateData(req.query, updatingUserSchema)) {
     next();
    } else {
      res.status(400).send();
    }
  },
  autoSuggestUser: (req: Request, res: Response, next: NextFunction) => {
    if (validateData(req.query, autoSuggestUserSchema)) {
     next();
    } else {
      res.status(400).send();
    }
  },
}

