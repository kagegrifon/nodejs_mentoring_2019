import {
  UserGroupModelInterface,
  UsersToGroupParams
} from '../interfaces/userGroup';

export class UserGroupService {
  constructor(private userGroupModel: UserGroupModelInterface) {
    this.userGroupModel = userGroupModel;
  }

  addUsersToGroup = async (data: UsersToGroupParams) => {
    return await this.userGroupModel.addUsersToGroup(data);
  };

  deleteUsersFromGroup = async (data: UsersToGroupParams) => {
    return await this.userGroupModel.deleteUsersFromGroup(data);
  };
}
