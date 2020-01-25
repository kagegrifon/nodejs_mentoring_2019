import { UserSearchModel } from './searchUserModel'

export interface EditablePropsOfUser {
  login: string;
  password: string;
  age: number;
}

export interface getUserResponce extends EditablePropsOfUser {
  id: string;
  login: string;
  password: string;
  age: number;
}

interface UserInDB extends getUserResponce {
  login: string;
  password: string;
  age: number;
  id: string;
  isDeleted: boolean;
}

type Users = {
  [propName: string]: UserInDB;
}

export class UserModel {
  private counter = 1;
  private users:Users = {};
  private searchModel = new UserSearchModel();

  public addUser(addingUser: EditablePropsOfUser): string {
    const newID = String(this.counter++);
    this.users[newID] = Object.assign({}, addingUser, { id: newID, isDeleted: false });
    this.searchModel.addToSearchTable(newID, addingUser.login);

    return newID;
  }

  public removeUser(userID: string): void {
    if (this.users[userID] === undefined) {
      throw new Error(`There is no user with such ID = ${userID}`);
    }

    this.users[userID].isDeleted = true;
    this.searchModel.removeFromSearchTable(userID, this.users[userID].login)
  }

  public updateUser(userID: string, updatedUser: EditablePropsOfUser): void {
    const updatingUser = this._getUser(userID);

    if (updatingUser) {
      // ToDo find deep joining object method in future
      Object.assign(updatingUser, updatedUser);

      const prevLogin = updatingUser.login;
      const newLogin = updatedUser.login;
      if (prevLogin !== newLogin) {
        this.searchModel.changeLoginInSearchTable(userID,prevLogin, newLogin);
      }
    }
  }

  public getUser(userID: string): getUserResponce | null {
    const userFromDB = this._getUser(userID);
    let result = null;

    if (userFromDB) {
      const { isDeleted, ...avaliableData } = userFromDB; 
      result = avaliableData;
    }

    return result;
  }

  public getAutoSuggestUsers(loginSubstring: string, limit: number): getUserResponce[] {
    const userIDs = this.searchModel.getAutoSuggestUserIDs(loginSubstring, limit);

    const result = userIDs
      .map((userId: string) => this.getUser(userId))
      .filter((user) => user !== null);

    (result as getUserResponce[]).sort((user1, user2) => {
      const stringCompare = user1?.login.toLowerCase() > user2?.login.toLowerCase();
      return stringCompare ? 1 : -1;
    });
    return result as getUserResponce[];
  }

  private _getUser(userID: string):UserInDB | null {
    let result = null;
    if (this.users[userID] && !this.users[userID].isDeleted) {
      result = this.users[userID];
    }

    return result;
  }
}
