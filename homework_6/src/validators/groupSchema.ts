import Joi from '@hapi/joi';
import { Permission } from '../interfaces/groups';

export const createGroupSchema = Joi.object({
  name: Joi.string()
    .required()
    .alphanum()
    .min(3)
    .max(30),

  permissions: Joi.array()
    .items(Joi.string().valid(Permission.DELETE, Permission.READ, Permission.WRITE, Permission.SHARE, Permission.UPLOAD_FILES))
    .min(1)
    .required()
});

export const updateGroupSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30),

  permissions: Joi.array()
    .items(Joi.string().valid(Permission.DELETE, Permission.READ, Permission.WRITE, Permission.SHARE, Permission.UPLOAD_FILES))
    .min(1)
});
