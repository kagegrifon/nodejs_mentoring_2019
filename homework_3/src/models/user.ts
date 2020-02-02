import { User } from './userSchema';
import { 
  EditablePropsOfUser,
  UpdatingPropsOfUser, 
  UserModelInterface
} from '../interfaces/user';

const { Op } = require("sequelize");


export class UserModel implements UserModelInterface {
  constructor() {
    User.sync();
  }

  async addUser(newUserData: EditablePropsOfUser) {
    const { id } = await User.create(newUserData);

    return String(id);
  }

  async getUser(userId: string) {
    const [user] = await User.findAll({
      where: {
        id: userId,
        isDeleted: false,
      }
    });

    let result = null;

    if (user) {
      result = {
        id: user.id,
        login: user.login,
        password: user.password,
        age: user.age,
      };
    }
    return result;
  }

  async updateUser(userId: string, updatedUserData: UpdatingPropsOfUser) {
    await User.update(updatedUserData, {
      where: {
        isDeleted: false,
        id: userId
      }
    });
  }

  async removeUser(userId: string) {
    await User.update({ isDeleted: true }, {
      where: {
        id: userId,
        isDeleted: false,
      }
    });    
  }

  async getAutoSuggestUsers(loginSubstring: string, limit: number) {
    const dbFoundUsers = await User.findAll({ limit, order: [['login', 'DESC']] }, {
      where: {
        isDeleted: false,
        login: {
          [Op.like]: loginSubstring,
        }
      }
    });
    const result = dbFoundUsers.map((dbUser: any) => {
      return {
        id: dbUser.id,
        login: dbUser.login,
        password: dbUser.password,
        age: dbUser.age,
      }
    });
    
    return result;
  }
}
