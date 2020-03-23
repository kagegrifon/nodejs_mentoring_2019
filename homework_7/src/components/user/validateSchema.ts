import Joi from '@hapi/joi';

export const creatingUserSchema = Joi.object({
  login: Joi.string()
    .required()
    .alphanum()
    .min(3)
    .max(30),

  password: Joi.string()
    .required()
    .pattern(new RegExp('[a-zA-Z]'))
    .pattern(new RegExp('[0-9]')),

  age: Joi.number()
    .required()
    .integer()
    .min(4)
    .max(130),
});

export const updatingUserSchema = Joi.object({
  login: Joi.string()
    .alphanum()
    .min(3)
    .max(30),

  password: Joi.string()
    .pattern(new RegExp('[a-zA-Z]'))
    .pattern(new RegExp('\d')),

  age: Joi.number()
    .integer()
    .min(4)
    .max(130),
});

export const autoSuggestUserSchema = Joi.object({
  loginSubstring: Joi.string()
    .required(),

  limit: Joi.number()
    .required()
    .integer()
    .min(1)
    .max(100),
});

