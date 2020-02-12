import { UserDB } from './userDBSchema';
import { 
  EditablePropsOfUser,
  UpdatingPropsOfUser, 
  UserModelInterface
} from '../interfaces/user';

const { Op } = require("sequelize");

export class UserModel implements UserModelInterface {
  async addUser(newUserData: EditablePropsOfUser) {
    const { id } = await UserDB.create(newUserData);

    return String(id);
  }

  async getUser(userId: string) {
    const user = await UserDB.findOne({
      where: {
        id: userId,
        isDeleted: false,
      },
      raw: true,
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
    await UserDB.update(updatedUserData, {
      where: {
        isDeleted: false,
        id: userId
      }
    });
  }

  async removeUser(userId: string) {
    await UserDB.update({ isDeleted: true }, {
      where: {
        id: userId,
        isDeleted: false,
      }
    });    
  }

  async getAutoSuggestUsers(loginSubstring: string, limit: number) {
    const dbFoundUsers = await UserDB.findAll({ limit, order: [['login', 'DESC']] }, {
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
