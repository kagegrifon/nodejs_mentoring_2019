import { Op } from 'sequelize';
import {
  UserGroupServiceInterface,
  UsersToGroupParams
} from '../interfaces/userGroup';

import { errorLogger, getCommonLogger } from '../logger';

const logError = getCommonLogger({
  logger: errorLogger,
  level: 'warn', 
  layer: 'UserGroupService',
});

export class UserGroupService implements UserGroupServiceInterface {
  constructor(private userGroupModel: any) {
    this.userGroupModel = userGroupModel;
  }

  addUsersToGroup = async (data: UsersToGroupParams) => {
    const { groupId, usersId } = data;
    try {
      usersId.forEach(userId => {
        this.userGroupModel.create({ groupId, userId: userId });
      });
    } catch(error) {
      logError('Error on add users to group', { error, params: data });
      throw error;
    }
  };

  deleteUsersFromGroup = async (data: UsersToGroupParams) => {
    const { groupId, usersId } = data;

    try {
      await this.userGroupModel.destroy({
        where: {
          groupId: groupId,
          userId: {
            [Op.or]: usersId
          }
        }
      });
    } catch(error) {
      logError('Error on delete users from group', { error, params: data });
      throw error;
    }
  };
}
