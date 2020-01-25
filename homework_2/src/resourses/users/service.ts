import express from 'express';

import { 
  UserModel,
  EditablePropsOfUser,
} from './model';

import { 
  creatingUserSchema,
  updatingUserSchema,
  autoSuggestUserSchema
} from './validation';

export const userRouter = express.Router();

const userDB = new UserModel();

const validateData = (data: any, schema: any) => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw error;
  }
  
  return value;
}

userRouter.post('/', function (req, res) {
  let reportMessage = 'Request was successful done, new user was added.';

  try {
    const newUserData = validateData(req.query, creatingUserSchema);
    const newUserId = userDB.addUser(newUserData);
    reportMessage += ` New user id = ${newUserId}`;
    res.send(reportMessage);
  } catch(e) {
    res.status(400).send(e);
  }  
});

userRouter.put('/:userId', function (req, res) {
  let reportMessage = 'Request was successful done, user was updated';

  try {
    const { userId } = req.params;
    const updatingUserData = validateData(req.query, updatingUserSchema);
    const currentUserData = userDB.getUser(userId);
    const updatedUserData = Object.assign({}, currentUserData, updatingUserData);
    userDB.updateUser(userId, updatedUserData);
  } catch(e) {
    reportMessage = `Something went wrong, ${e.message}`;
  }

  res.send(reportMessage);
});

userRouter.delete('/:userId', function (req, res) {
  let reportMessage = 'Request was successful done, user was deleted';

  try {
    userDB.removeUser(req.params.userId);
  } catch(e) {
    reportMessage = `Something went wrong, ${e.message}`;
    res.status(400);
  }

  res.send(reportMessage);
});

userRouter.get('/get-suggestions', function (req, res) {  
  try {
    const { loginSubstring, limit } = validateData(req.query, autoSuggestUserSchema);
    const suggestions = userDB.getAutoSuggestUsers(loginSubstring, limit);
    res.send(suggestions);
  } catch(e) {
    res.status(400).send(e);
  }
});

userRouter.get('/:userId', function (req, res) {
  const user = userDB.getUser(req.params.userId);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send(`There is no user with such id: ${req.params.userId}`);
  }
});

const mockUsers: EditablePropsOfUser[] = [
  {
    login: 'Peter',
    password: "querty",
    age: 15,
  },
  {
    login: 'Fedor',
    password: "123456",
    age: 16,
  },
  {
    login: 'patric',
    password: "querty",
    age: 46,
  },
  {
    login: 'francua',
    password: "123456",
    age: 17,
  },
  {
    login: 'CrazyDroid',
    password: "querty",
    age: 15,
  },
  {
    login: 'Federal agent',
    password: "123456",
    age: 99,
  },
  {
    login: 'Sergey',
    password: "123456",
    age: 59,
  },
  {
    login: 'Pasha',
    password: "querty",
    age: 25,
  },
  {
    login: 'Nikolay',
    password: "123456",
    age: 56,
  },
  {
    login: 'Igor',
    password: "querty",
    age: 26,
  },
  {
    login: 'Maria',
    password: "123456",
    age: 17,
  },
  {
    login: 'Goga',
    password: "querty",
    age: 35,
  },
  {
    login: 'Natalia',
    password: "123456",
    age: 29,
  },
  {
    login: 'Sergey',
    password: "123456",
    age: 36,
  }
];

mockUsers.forEach(mockUser => userDB.addUser(mockUser));
