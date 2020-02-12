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
