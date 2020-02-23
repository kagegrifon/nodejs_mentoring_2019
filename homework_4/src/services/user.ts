import { Op } from 'sequelize';
import {
  EditablePropsOfUser,
  UpdatingPropsOfUser,
  UserServiceInterface,
} from '../interfaces/user';

export class UserService implements UserServiceInterface {
  constructor(private userModel: any) {
    this.userModel = userModel;
  }

  create = async (newUserData: EditablePropsOfUser) => {
    const { id } = await this.userModel.create(newUserData);

    return String(id);
  };

  update = async (userId: string, updatingUserData: UpdatingPropsOfUser) => {
    await this.userModel.update(updatingUserData, {
      where: {
        isDeleted: false,
        id: userId
      }
    });
  };

  get = async (userId: string) => {
    const user = await this.userModel.findOne({
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

  remove = async (userId: string) => {
    await this.userModel.update({ isDeleted: true }, {
      where: {
        id: userId,
        isDeleted: false,
      }
    });
  }

  getAutoSuggestUsers = async (loginSubstring: string, limit: number) => {
    const dbFoundUsers = await this.userModel.findAll({ limit, order: [['login', 'DESC']] }, {
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
