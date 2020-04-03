import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { validateData } from '../../utils';

export const authSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .required(),
  password: Joi.string()
    .required()
});

export const authValidators = {
  getToken: (req: Request, res: Response, next: NextFunction) => {
    if (validateData(req.body, authSchema)) {
     next();
    } else {
      res.status(400).send();
    }
  },
}

