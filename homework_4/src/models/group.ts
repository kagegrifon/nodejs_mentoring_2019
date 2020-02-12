import { GroupDB } from './groupDBSchema';
import {
  GroupCreateProps,
  GroupUpdateProps,
  GroupModelInterface
} from '../interfaces/groups';



export class GroupModel implements GroupModelInterface {
  async create(newGroupData: GroupCreateProps) {
    try {
      const result = await GroupDB.create(newGroupData);

      return String(result.id); 
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

  async get(groupId: string) {
    let group = null;

    try {
      group = await GroupDB.findByPk(groupId);
    } catch(error) {
      console.log(error);
      throw error;
    }

    if (!group) {
      return null;
    }

    return ({
        name: group.name,
        permissions: group.permissions,
    });
  }

  async getAll() {
    let groups = null;

    try {
      groups = await GroupDB.findAll({
        attributes: ['name', 'permissions'],
        raw: true,
      });
    } catch(error) {
      console.log(error);
      throw error;
    }

    return groups;
  }


  async update(groupId: string, updateData: GroupUpdateProps) {
    try {
      await GroupDB.update(updateData, {
        where: {
          id: groupId
        }
      });
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

  async remove(groupId: string) {
    try {
      await GroupDB.destroy({
        where: {
          id: groupId,
        }
      });
    } catch(error) {
      console.log(error);
      throw error;
    }
  }
}
