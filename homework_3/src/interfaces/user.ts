export interface UpdatingPropsOfUser {
  login?: string;
  password?: string;
  age?: number;
}

export interface EditablePropsOfUser {
  login: string;
  password: string;
  age: number;
}

export interface GetUserResponce extends EditablePropsOfUser {
  id: string;
  login: string;
  password: string;
  age: number;
}

interface UserInDB extends GetUserResponce {
  login: string;
  password: string;
  age: number;
  id: string;
  isDeleted: boolean;
}

export interface UserModelInterface {
  addUser: (newUserData: EditablePropsOfUser) => Promise<string>;
  updateUser:(userID: string, updatedUser: EditablePropsOfUser) => Promise<void>;
  getUser: (userID: string) => Promise<GetUserResponce | null>;
  removeUser: (userID: string) => Promise<void>;
  getAutoSuggestUsers: (loginSubstring: string, limit: number) => Promise<GetUserResponce[]>;
}
