import { Op } from 'sequelize';
import {
  EditablePropsOfUser,
  UpdatingPropsOfUser,
  UserServiceInterface,
} from '../interfaces/user';

import { errorLogger, getCommonLogger } from '../logger';

const logError = getCommonLogger({
  logger: errorLogger,
  level: 'warn', 
  layer: 'UserService',
});

export class UserService implements UserServiceInterface {
  constructor(private userModel: any) {
    this.userModel = userModel;
  }

  create = async (newUserData: EditablePropsOfUser) => {
    try {
      const { id } = await this.userModel.create(newUserData);
      return String(id);
    } catch(error) {
      logError('Error on create user', { error, params: { newUserData } });
      throw error;
    }
  };

  update = async (userId: string, updatingUserData: UpdatingPropsOfUser) => {
    try {
      await this.userModel.update(updatingUserData, {
        where: {
          isDeleted: false,
          id: userId
        }
      });
    } catch(error) {
      logError('Error on update user', { error, params: { userId, updatingUserData } });
      throw error;
    }
  };

  get = async (userId: string) => {
    try {
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
    } catch(error) {
      logError('Error on get user', { error, params: { userId } });
      throw error;
    }
  }

  remove = async (userId: string) => {
    try {
      await this.userModel.update({ isDeleted: true }, {
        where: {
          id: userId,
          isDeleted: false,
        }
      });
    } catch(error) {
      logError('Error on remove user', { error, params: { userId } });
      throw error;
    }
  }

  getAutoSuggestUsers = async (loginSubstring: string, limit: number) => {
    try {
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
    } catch(error) {
      logError('Error on get auto suggest users', { error, params: { loginSubstring, limit } });
      throw error;
    }
  }
}
