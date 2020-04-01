import { Op } from 'sequelize';
import {
  EditablePropsOfUser,
  UpdatingPropsOfUser,
  GetUserResponce,
} from './interfaces';
import { UserService } from './service';

const validUserData: EditablePropsOfUser = {
  login: 'Vasya',
  password: 'querwy',
  age: 3
};
const validUpdatignUserData: UpdatingPropsOfUser = {
  login: 'Kolya',
  password: 'neverWinterNight',
  age: 27
};

const validResponseUserData: GetUserResponce = {
  login: 'Petya',
  password: 'Zlatogorye',
  age: 31,
  id: "5",
};

const validUserItemResponseFromDB = { isDeleted: false, oneMoreProps: 'anything', ... validResponseUserData };

const userDB = {
  create: jest.fn(data => Promise.resolve({ id: 3 })),
  update: jest.fn(data => Promise.resolve()),
  findOne: jest
    .fn()
    .mockImplementationOnce(data => Promise.resolve())
    .mockImplementationOnce(data => Promise.resolve(null))
    .mockImplementation(data => Promise.resolve(validUserItemResponseFromDB)),
  findAll: jest.fn().mockImplementation(data => Promise.resolve([])),
};

const brokenUserDB = {
  create: jest.fn(data => Promise.reject(new Error)),
  update: jest.fn(data => Promise.reject(new Error)),
  findOne: jest.fn(data => Promise.reject(new Error)),
  findAll: jest.fn(data => Promise.reject(new Error)),
};


const userService = new UserService(userDB);
const userServiceWithBrokenDB = new UserService(brokenUserDB);

describe('Testing create user', () => {
  let result:any = null;

  beforeEach(async () => {
    result = await userService.create(validUserData);
  });

  afterEach(() => { result = null; });

  test('called once create method of UserDB', () => {
    expect(userDB.create.mock.calls.length).toBe(1);
  });

  test('called create method of UserDB with passed userData', () => {
    expect(userDB.create.mock.calls).toContainEqual([validUserData]);
  });
  
  test('expect to return string', () => {
    expect(typeof result).toBe('string');
  });

  test('expect to catch and throw error when DB fails', async () => {
    await expect(userServiceWithBrokenDB.create(validUserData)).rejects.toThrow();
  });
});


describe('Testing update user', () => {
  type updateArgs = [string, UpdatingPropsOfUser]
  const callArgs: updateArgs = ["3", validUpdatignUserData];

  beforeEach(async () => {
    await userService.update(callArgs[0], callArgs[1]);
  });

  test('called once update method of UserDB', () => {
    expect(userDB.update.mock.calls.length).toBe(1);
  });

  test('called update method of UserDB with passed userData', () => {
    const expectedArgs = [callArgs[1], {
      where: {
        isDeleted: false,
        id: callArgs[0]
      }
    }];
    expect(userDB.update.mock.calls).toContainEqual(expectedArgs);
  });

  test('expect to catch and throw error when DB fails', async () => {
    await expect(userServiceWithBrokenDB.update(callArgs[0], callArgs[1])).rejects.toThrow();
  });
});

describe('Testing get user', () => {
  let result:any = undefined;
  const callArgs = ["3"];

  beforeEach(async () => {
    result = await userService.get(callArgs[0]);
  });

  afterEach(() => { result = undefined; });

  test('called once findOne method of UserDB', () => {
    expect(userDB.findOne.mock.calls.length).toBe(1);
  });

  test('expect to return null when DB findOne return null', () => {
    expect(result).toBeNull();
  });

  test('called findOne method of UserDB with passed userID', () => {
    const expectedArgs = {
      where: {
        id: callArgs[0],
        isDeleted: false,
      },
      raw: true,
    };
    expect(userDB.findOne.mock.calls[userDB.findOne.mock.calls.length - 1]).toContainEqual(expectedArgs);
  });

  test('expect to return userData when DB findOne return data', () => {
    expect(result).toEqual(validResponseUserData);
  });

  test('expect to catch and throw error when DB fails', async () => {
    await expect(userServiceWithBrokenDB.get(callArgs[0])).rejects.toThrow();
  });
});


describe('Testing remove user', () => {
  const userId = "3";

  test('called once update method of UserDB', async () => {
    userDB.update.mockClear();
    await userService.remove(userId);
    expect(userDB.update.mock.calls.length).toBe(1);
  });

  test('called update method of UserDB with passed userData', async () => {
    const expectedArgs = [{ isDeleted: true }, {
      where: {
        id: userId,
        isDeleted: false,
      }
    }];

    await userService.remove(userId);  
    expect(userDB.update.mock.calls).toContainEqual(expectedArgs);
  });

  test('expect to catch and throw error when DB fails', async () => {
    await expect(userServiceWithBrokenDB.remove(userId)).rejects.toThrow();
  });
});


describe('Testing getByName user', () => {
  const callArgs = ["login"];

  test('called once findOne method of UserDB', async () => {
    userDB.findOne.mockReset();
    await userService.getByName(callArgs[0]);
    expect(userDB.findOne.mock.calls.length).toBe(1);
  });

  test('expect to return null when DB findOne return null', async () => {
    userDB.findOne.mockImplementationOnce(data => Promise.resolve(null));
    const result = await userService.getByName(callArgs[0]);

    expect(result).toBeNull();
  });

  test('called findOne method of UserDB with passed userID', async () => {
    const expectedArgs = {
      where: {
        login: callArgs[0],
        isDeleted: false,
      },
      raw: true,
    };
    await userService.getByName(callArgs[0]);

    expect(userDB.findOne.mock.calls[userDB.findOne.mock.calls.length - 1]).toContainEqual(expectedArgs);
  });

  test('expect to return userData when DB findOne return data', async () => {
    userDB.findOne.mockImplementation(data => Promise.resolve(validUserItemResponseFromDB))
    const result = await userService.getByName(callArgs[0]);

    expect(result).toEqual(validResponseUserData);
  });

  test('expect to catch and throw error when DB fails', async () => {
    await expect(userServiceWithBrokenDB.getByName(callArgs[0])).rejects.toThrow();
  });
});


describe('Testing getAutoSuggestUsers', () => {
  type funcArgTypes = [string, number];
  const callArgs: funcArgTypes = ["loginSubstring", 10];

  test('called once findAll method of UserDB', async () => {
    await userService.getAutoSuggestUsers(callArgs[0], callArgs[1]);
    expect(userDB.findAll.mock.calls.length).toBe(1);
  });

  test('expect to return [] when DB findAll return []', async () => {
    const result = await userService.getAutoSuggestUsers(callArgs[0], callArgs[1]);

    expect(result).toEqual(expect.arrayContaining([]));
  });

  test('called findAll method of UserDB with passed loginSubstring and limit', async () => {
    const expectedArgs = [{ limit: callArgs[1], order: [['login', 'DESC']] }, {
      where: {
        isDeleted: false,
        login: {
          [Op.like]: callArgs[0],
        }
      },
    }];

    await userService.getAutoSuggestUsers(callArgs[0], callArgs[1]);

    expect(userDB.findAll).toHaveBeenLastCalledWith(...expectedArgs);
  });

  test('expect to return userData when DB findAll return data', async () => {
    userDB.findAll.mockImplementation(data => Promise.resolve([validUserItemResponseFromDB]));
    const result = await userService.getAutoSuggestUsers(callArgs[0], callArgs[1]);

    expect(result).toEqual(expect.arrayContaining([validResponseUserData]));
  });

  test('expect to catch and throw error when DB fails', async () => {
    await expect(userServiceWithBrokenDB.getAutoSuggestUsers(callArgs[0], callArgs[1])).rejects.toThrow();
  });
});

