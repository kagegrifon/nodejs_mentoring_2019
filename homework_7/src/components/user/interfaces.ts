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

export interface UserServiceInterface {
  create: (newUserData: EditablePropsOfUser) => Promise<string>;
  update:(userID: string, updatedUser: EditablePropsOfUser) => Promise<void>;
  get: (userID: string) => Promise<GetUserResponce | null>;
  remove: (userID: string) => Promise<void>;
  getByName: (login: string) => Promise<GetUserResponce | null>;
  getAutoSuggestUsers: (loginSubstring: string, limit: number) => Promise<GetUserResponce[]>;
}
