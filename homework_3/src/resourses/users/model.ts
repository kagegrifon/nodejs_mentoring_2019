import { User } from '../../DB_utils/dbInit';
import { 
  EditablePropsOfUser,
  UpdatingPropsOfUser, 
  UserModelInterface
} from './tsModels';

const { Op } = require("sequelize");


export class UserModel implements UserModelInterface {
  constructor() {
    User.sync();
  }

  async addUser(newUserData: EditablePropsOfUser) {
    const { id } = await User.create(newUserData);
    console.log("Add new user, Done. New user-id:", id);

    return String(id);
  }

  async getUser(userId: string) {
    const [user] = await User.findAll({
      where: {
        id: userId,
        isDeleted: false,
      }
    });
    console.log(`Get user with id ${userId}, Done.`);

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

    console.log(`Update user with id ${userId}, Done`);    
  }

  async removeUser(userId: string) {
    await User.update({ isDeleted: true }, {
      where: {
        id: userId,
        isDeleted: false,
      }
    });
    console.log(`Remove user with id = ${userId}, Done`);
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
    
      
    console.log(`Search loginSubstring=${loginSubstring}, and limit = ${limit},  Done. Found users: ${result.length}`);
    return result;
  }
}
