type UserIdByName = {
  [propName: string]: string[];
}

export class UserSearchModel {
  private searchTable: UserIdByName = {}

  public removeFromSearchTable(userID: string, login: string) {
    const deleteWays = {
      fastDelete: () => { delete this.searchTable[login] },
      deepDelete: () => {
        const deletingIndex = this.searchTable[login].indexOf(userID);
        if (deletingIndex !== -1) {
          this.searchTable[login].splice(deletingIndex, 1);
        }
      },
    };

    const deleteWay = this.searchTable[login].length === 1 ? 'fastDelete' : 'deepDelete';
    deleteWays[deleteWay]();
  }

  public addToSearchTable(userID: string, login: string) {
    this.searchTable[login] = this.searchTable[login] || [];
    this.searchTable[login].push(userID);
  }

  public changeLoginInSearchTable(userID: string, prevLogin: string, newLogin: string) {
    this.removeFromSearchTable(userID, prevLogin);
    this.addToSearchTable(userID, newLogin);
  }

  public getAutoSuggestUserIDs(loginSubstring: string, limit: number):string[] {
    const logins = Object.keys(this.searchTable);
    const regExpSearch = new RegExp(loginSubstring);
    const result = [];
    let i = 0;

    while (i < logins.length && result.length < limit) {
      if (regExpSearch.test(logins[i].toLowerCase())) {
        result.push(...this.searchTable[logins[i]]);
      }
      i++;
    }

    if (result.length > limit) {
      result.length = limit;
    }

    return result;
  }
}
