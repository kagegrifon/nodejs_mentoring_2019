import { Op } from 'sequelize';

import { userGroupDB } from './userGroupDBSchema';
import { UserGroupModelInterface, UsersToGroupParams } from '../interfaces/userGroup';

export class UserGroupModel implements UserGroupModelInterface {  
  async addUsersToGroup(data: UsersToGroupParams) {
    const { groupId, usersId } = data;
      usersId.forEach(userId => {
        userGroupDB.create({ groupId, userId: userId });
      });
  }

  async deleteUsersFromGroup(data: UsersToGroupParams) {
    const { groupId, usersId } = data;

    await userGroupDB.destroy({
      where: {
        groupId: groupId,
        userId: {
          [Op.or]: usersId
        }
      }
    });
  }
}
