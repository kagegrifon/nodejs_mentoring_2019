export interface UserGroupServiceInterface {
  addUsersToGroup: (data: UsersToGroupParams) => Promise<void>;
  deleteUsersFromGroup: (data: UsersToGroupParams) => Promise<void>;
}

export type UsersToGroupParams = {
  groupId: number,
  usersId: number[],
}