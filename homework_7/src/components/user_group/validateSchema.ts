import Joi from '@hapi/joi';

export const addUsersToGroupSchema = Joi.object({
  groupId: Joi.number()
    .required()
    .integer(),

  usersId: Joi.array()
    .items(Joi.number().integer())
    .required()
});

export const removeUsersFromGroupSchema = addUsersToGroupSchema;


