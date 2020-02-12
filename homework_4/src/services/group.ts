import {
  GroupCreateProps,
  GroupUpdateProps,
  GroupModelInterface
} from '../interfaces/groups';

export class GroupService {
  constructor(private groupModel: GroupModelInterface) {
    this.groupModel = groupModel;
  }

  create = async (data: GroupCreateProps) => {
    return await this.groupModel.create(data);
  };

  update = async (groupId: string, updateData: GroupUpdateProps) => {
    const currentUserData = await this.groupModel.get(groupId);
    const updatedUserData = Object.assign({}, currentUserData, updateData);
    
    return await this.groupModel.update(groupId, updatedUserData);
  };

  get = async (groupId: string) => await this.groupModel.get(groupId);

  getAll = async () => await this.groupModel.getAll();

  remove = async (groupId: string) => await this.groupModel.remove(groupId);
}
