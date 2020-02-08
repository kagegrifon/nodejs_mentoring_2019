import {
  EditablePropsOfUser,
  UpdatingPropsOfUser,
  UserModelInterface,
} from '../interfaces/user';

export class UserService {
  constructor(private userModel: UserModelInterface) {
    this.userModel = userModel;
  }

  createNewUser = async (newUserData: EditablePropsOfUser) => {
    return await this.userModel.addUser(newUserData);
  };

  updateUser = async (userId: string, updatingUserData: UpdatingPropsOfUser) => {
    const currentUserData = await this.userModel.getUser(userId);
    const updatedUserData = Object.assign({}, currentUserData, updatingUserData);
    return await this.userModel.updateUser(userId, updatedUserData);
  };

  getUser = async (userId: string) => await this.userModel.getUser(userId);

  removeUser = async (userId: string) => await this.userModel.removeUser(userId);

  getAutoSuggestUsers = async (loginSubstring: string, limit: number) => {
    return await this.userModel.getAutoSuggestUsers(loginSubstring, limit);
  }
}

// userRouter.post('/', function (req, res) {
//   let reportMessage = 'Request was successful done, new user was added.';

//   try {
//     const newUserData = validateData(req.query, creatingUserSchema);
//     const newUserId = userModel.addUser(newUserData);
//     reportMessage += ` New user id = ${newUserId}`;
//     res.send(reportMessage);
//   } catch(e) {
//     res.status(400).send(e);
//   }  
// });

// userRouter.put('/:userId', function (req, res) {
//   let reportMessage = 'Request was successful done, user was updated';

//   try {
//     const { userId } = req.params;
//     const updatingUserData = validateData(req.query, updatingUserSchema);
//     const currentUserData = userModel.getUser(userId);
//     const updatedUserData = Object.assign({}, currentUserData, updatingUserData);
//     userModel.updateUser(userId, updatedUserData);
//   } catch(e) {
//     reportMessage = `Something went wrong, ${e.message}`;
//   }

//   res.send(reportMessage);
// });

// userRouter.delete('/:userId', function (req, res) {
//   let reportMessage = 'Request was successful done, user was deleted';

//   try {
//     userModel.removeUser(req.params.userId);
//   } catch(e) {
//     reportMessage = `Something went wrong, ${e.message}`;
//     res.status(400);
//   }

//   res.send(reportMessage);
// });

// userRouter.get('/get-suggestions', function (req, res) {  
//   try {
//     const { loginSubstring, limit } = validateData(req.query, autoSuggestUserSchema);
//     const suggestions = userModel.getAutoSuggestUsers(loginSubstring, limit);
//     res.send(suggestions);
//   } catch(e) {
//     res.status(400).send(e);
//   }
// });

// userRouter.get('/:userId', function (req, res) {
//   const user = userModel.getUser(req.params.userId);
//   if (user) {
//     res.send(user);
//   } else {
//     res.status(404).send(`There is no user with such id: ${req.params.userId}`);
//   }
// });

// const mockUsers: EditablePropsOfUser[] = [
//   {
//     login: 'Peter',
//     password: "querty",
//     age: 15,
//   },
//   {
//     login: 'Fedor',
//     password: "123456",
//     age: 16,
//   },
//   {
//     login: 'patric',
//     password: "querty",
//     age: 46,
//   },
//   {
//     login: 'francua',
//     password: "123456",
//     age: 17,
//   },
//   {
//     login: 'CrazyDroid',
//     password: "querty",
//     age: 15,
//   },
//   {
//     login: 'Federal agent',
//     password: "123456",
//     age: 99,
//   },
//   {
//     login: 'Sergey',
//     password: "123456",
//     age: 59,
//   },
//   {
//     login: 'Pasha',
//     password: "querty",
//     age: 25,
//   },
//   {
//     login: 'Nikolay',
//     password: "123456",
//     age: 56,
//   },
//   {
//     login: 'Igor',
//     password: "querty",
//     age: 26,
//   },
//   {
//     login: 'Maria',
//     password: "123456",
//     age: 17,
//   },
//   {
//     login: 'Goga',
//     password: "querty",
//     age: 35,
//   },
//   {
//     login: 'Natalia',
//     password: "123456",
//     age: 29,
//   },
//   {
//     login: 'Sergey',
//     password: "123456",
//     age: 36,
//   }
// ];

// mockUsers.forEach(mockUser => userModel.addUser(mockUser));
