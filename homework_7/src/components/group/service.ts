import {
  GroupCreateProps,
  GroupUpdateProps,
  GroupServiceInterface
} from './interfaces';

import { errorLogger, getCommonLogger } from '../../logger';

const logError = getCommonLogger({
  logger: errorLogger,
  level: 'warn', 
  layer: 'GroupService',
});

export class GroupService implements GroupServiceInterface {
  constructor(private groupModel: any) {
    this.groupModel = groupModel;
  }

  create = async (newGroupData: GroupCreateProps) => {
    try {
      const result = await this.groupModel.create(newGroupData);

      return String(result.id); 
    } catch(error) {
      logError('Error on create group', { error, params: { newGroupData } });
      throw error;
    }
  };

  update = async (groupId: string, updateData: GroupUpdateProps) => {
    try {
      await this.groupModel.update(updateData, {
        where: {
          id: groupId
        }
      });
    } catch(error) {
      logError('Error on update group', { error, params: { groupId, updateData } });
      throw error;
    }
  };

  get = async (groupId: string) => {
    let group = null;

    try {
      group = await this.groupModel.findByPk(groupId);
    } catch(error) {
      logError('Error on get group', { error, params: { groupId } });
      throw error;
    }

    if (!group) {
      return null;
    }

    return ({
        name: group.name,
        permissions: group.permissions,
    });
  };

  getAll = async () => {
    let groups = null;

    try {
      groups = await this.groupModel.findAll({
        attributes: ['name', 'permissions'],
        raw: true,
      });
    } catch(error) {
      logError('Error on get all groups', { error });
      throw error;
    }

    return groups;
  };

  remove = async (groupId: string) => {
    try {
      await this.groupModel.destroy({
        where: {
          id: groupId,
        }
      });
    } catch(error) {
      logError('Error on remove group', { error, params: { groupId } });
      throw error;
    }
  }
}
