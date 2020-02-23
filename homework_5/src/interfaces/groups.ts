export enum Permission {
  READ ='READ',
  WRITE ='WRITE',
  DELETE ='DELETE',
  SHARE ='SHARE',
  UPLOAD_FILES ='UPLOAD_FILES',
}


export interface GroupCreateProps {
  name: string;
  permissions: Permission[];
}

export interface GroupUpdateProps extends GroupCreateProps {}

export interface GroupResponceProps extends GroupCreateProps {}

export interface GroupServiceInterface {
  create: (newData: GroupCreateProps) => Promise<string>;
  update:(id: string, updateDate: GroupUpdateProps) => Promise<void>;
  get: (id: string) => Promise<GroupResponceProps | null>;
  getAll: () => Promise<GroupResponceProps[]>;
  remove: (id: string) => Promise<void>;
}