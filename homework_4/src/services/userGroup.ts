import { Op } from 'sequelize';
import {
  UserGroupServiceInterface,
  UsersToGroupParams
} from '../interfaces/userGroup';

export class UserGroupService implements UserGroupServiceInterface {
  constructor(private userGroupModel: any) {
    this.userGroupModel = userGroupModel;
  }

  addUsersToGroup = async (data: UsersToGroupParams) => {
    const { groupId, usersId } = data;
    usersId.forEach(userId => {
      this.userGroupModel.create({ groupId, userId: userId });
    });
  };

  deleteUsersFromGroup = async (data: UsersToGroupParams) => {
    const { groupId, usersId } = data;

    await this.userGroupModel.destroy({
      where: {
        groupId: groupId,
        userId: {
          [Op.or]: usersId
        }
      }
    });
  };
}
