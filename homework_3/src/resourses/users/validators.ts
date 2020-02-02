import { Request, Response, NextFunction } from 'express';
import {
  creatingUserSchema,
  updatingUserSchema,
  autoSuggestUserSchema
} from './validationSchema';

export const validateData = (data: any, schema: any) => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw error;
  }
  
  return value;
}

export const Validators = {
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

