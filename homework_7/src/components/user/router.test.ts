import { app, server } from '../../index';
import { EndpointRoutes } from '../../constants';
import { UserService } from './service';
import {
  UpdatingPropsOfUser,
  UserServiceInterface,
  EditablePropsOfUser,
  GetUserResponce
} from './interfaces';

const request = require("supertest");

// export interface UpdatingPropsOfUser {
//   login?: string;
//   password?: string;
//   age?: number;
// }

// export interface EditablePropsOfUser {
//   login: string;
//   password: string;
//   age: number;
// }

// export interface GetUserResponce extends EditablePropsOfUser {
//   id: string;
//   login: string;
//   password: string;
//   age: number;
// }


const mockEditableUserData: EditablePropsOfUser = {
  login: 'login value',
  password: 'password value',
  age: 7,
}

const mockUserDataInResponce: GetUserResponce = {
  id: '3',
  ...mockEditableUserData,
}

const serviceGetAll = jest.fn().mockResolvedValue([mockUserDataInResponce]);
const serviceGet = jest.fn().mockResolvedValue(mockUserDataInResponce);
const serviceCreate = jest.fn().mockResolvedValue(undefined);
const serviceUpdate = jest.fn().mockResolvedValue(undefined);
const serviceRemove = jest.fn().mockResolvedValue(undefined);
const serviceGetByName = jest.fn().mockResolvedValue(mockUserDataInResponce);
const serviceGetAutoSuggestUsers = jest.fn().mockResolvedValue([mockUserDataInResponce]);

jest.mock('./service', () => ({
  UserService: class implements UserServiceInterface {
    constructor() {}

    create(newUserData: EditablePropsOfUser) {
      return serviceCreate(newUserData);
    };

    update(userId: string, updatingUserData: EditablePropsOfUser) {
      return serviceUpdate(userId, updatingUserData);
    };

    remove(userId: string) {
      return serviceRemove(userId);
    };

    get(groupId: string) {
      return serviceGet(groupId);
    };

    getByName(login: string) {
      return serviceGetByName(login);
    };

    getAutoSuggestUsers(loginSubstring: string, limit: number) {
      return serviceGetAutoSuggestUsers(loginSubstring, limit);
    };
  }
}));

afterAll((done) => { server.close(done); });

// describe(`Test GET ${EndpointRoutes.group}`, () => {
//   beforeEach(() => {
//     serviceGetAll.mockClear();
//   });

//   test('Call groupService.getAll one time', async () => {
//     await request(app)
//       .get(EndpointRoutes.group);
    
//     expect(serviceGetAll.mock.calls.length).toBe(1);
//   });

//   test('Data from groupService.getAll is in response', async () => {
//     serviceGetAll.mockResolvedValueOnce([mockGroup]);

//     const res = await request(app)
//       .get(EndpointRoutes.group);
    
//     expect(res.body).toEqual(expect.arrayContaining([mockGroup]));
//   });

//   test('Send error with 500 code on service error', async () => {
//     serviceGetAll.mockRejectedValueOnce(new Error('Some happens'));

//     const res = await request(app)
//       .get(EndpointRoutes.group);
    
//     expect(res.statusCode).toBe(500);
//   });
// });

// describe(`Test GET ${EndpointRoutes.group}/:groupId`, () => {
//   beforeEach(() => {
//     serviceGet.mockClear();
//   });

//   const groupId = '3';

//   test('Call groupService.get one time', async () => {
//     await request(app)
//       .get(`${EndpointRoutes.group}/${groupId}`);
    
//     expect(serviceGet.mock.calls.length).toBe(1);
//   });

//   test('Call groupService.get with passed gpoupId', async () => {
//     await request(app)
//       .get(`${EndpointRoutes.group}/${groupId}`);
    
//     expect(serviceGet.mock.calls[0][0]).toBe(groupId);
//   });

//   test('Data from groupService.get is in response', async () => {
//     serviceGet.mockResolvedValueOnce(mockGroup);

//     const res = await request(app)
//       .get(`${EndpointRoutes.group}/${groupId}`);
    
//     expect(res.body).toEqual(mockGroup);
//   });

//   test('Send response with 404 when empty data from service', async () => {
//     serviceGet.mockResolvedValueOnce(null);

//     const res = await request(app)
//       .get(`${EndpointRoutes.group}/${groupId}`);
    
//     expect(res.statusCode).toBe(404);
//   });

//   test('Send error with 500 code on service error', async () => {
//     serviceGet.mockRejectedValueOnce(new Error('Some happens'));

//     const res = await request(app)
//       .get(`${EndpointRoutes.group}/${groupId}`);
    
//     expect(res.statusCode).toBe(500);
//   });
// });


describe(`Test POST ${EndpointRoutes.user}`, () => {
//   userRouter.post('/',
//   UserValidators.createNewUser,
//   async function (req, res) {
//     try {      
//       const userDTO = req.query;
//       const userID = await userService.create(userDTO);
//       res.send(`Request was successful done, new user was added. New user id = ${userID}`);
//     } catch(e) {
//       logError('Error on create user', req, res, e);
//       res.status(400).send(e);
//     }  
//   }
// );
  beforeEach(() => {
    serviceCreate.mockClear();
  });

  const route = EndpointRoutes.user;

  test("500 status in response, when invalid data was send", async () => {
    const res = await request(app)
      .post(route)
      .send({ invalidData: 'test' });

    expect(res.statusCode).toBe(500);
  });

  test("UserService.create wasn't called, when invalid data was send", async () => {
    await request(app)
      .post(route);
    
    expect(serviceCreate.mock.calls.length).toBe(0);
  });

  test('Call userService.create one time', async () => {
    await request(app)
      .post(route)
      .send(mockEditableUserData);
    
    expect(serviceCreate.mock.calls.length).toBe(1);
  });

  test('Call userService.create with passed userDTO in body', async () => {
    await request(app)
      .post(route)
      .send(mockEditableUserData);
    
    expect(serviceCreate.mock.calls[0][0]).toEqual(mockEditableUserData);
  });

  test("200 status in response, when valid data was send", async () => {
    const res = await request(app)
      .post(route)
      .send(mockEditableUserData);
    
      expect(res.statusCode).toBe(200);
  });

  test('Send error with 500 code on service error', async () => {
    serviceCreate.mockRejectedValueOnce(new Error('Some happens'));

    const res = await request(app)
      .post(route)
      .send(mockEditableUserData);
    
    expect(res.statusCode).toBe(500);
  });
});


// describe(`Test PUT ${EndpointRoutes.group}`, () => {
//   beforeEach(() => {
//     serviceUpdate.mockClear();
//   });

//   const groupId = '3';
//   const route = `${EndpointRoutes.group}/${groupId}`;

//   test("500 status in response, when invalid data was send", async () => {
//     const res = await request(app)
//       .put(route)
//       .send({ invalidData: 'test' });

//     expect(res.statusCode).toBe(500);
//   });

//   test("GroupService.update wasn't called, when invalid data was send", async () => {
//     await request(app)
//       .put(route)
//       .send({ invalidData: 'test' });
    
//     expect(serviceUpdate.mock.calls.length).toBe(0);
//   });

//   test('Call groupService.update 1 time, when valid data was send', async () => {
//     await request(app)
//       .put(route)
//       .send(mockGroup);
    
//     expect(serviceUpdate.mock.calls.length).toBe(1);
//   });

//   test('Call groupService.update with passed groupId in params and groupDTO in body', async () => {
//     await request(app)
//       .put(route)
//       .send(mockGroup);
    
//     expect(serviceUpdate.mock.calls[0][0]).toEqual(groupId);
//     expect(serviceUpdate.mock.calls[0][1]).toEqual(mockGroup);
//   });

//   test("200 status in response, when valid data was send", async () => {
//     const res = await request(app)
//       .put(route)
//       .send(mockGroup);
    
//       expect(res.statusCode).toBe(200);
//   });

//   test('Send error with 500 code on service error', async () => {
//     serviceUpdate.mockRejectedValueOnce(new Error('Some happens'));

//     const res = await request(app)
//       .put(route)
//       .send(mockGroup);
    
//     expect(res.statusCode).toBe(500);
//   });
// });


// describe(`Test DELETE ${EndpointRoutes.group}`, () => {
//   beforeEach(() => {
//     serviceRemove.mockClear();
//   });

//   const groupId = '3';
//   const route = `${EndpointRoutes.group}/${groupId}`;

//   test('Call groupService.delete 1 time', async () => {
//     await request(app)
//       .delete(route);
    
//     expect(serviceRemove.mock.calls.length).toBe(1);
//   });

//   test('Call groupService.delete with passed groupId in params', async () => {
//     await request(app)
//       .delete(route);
    
//     expect(serviceRemove.mock.calls[0][0]).toEqual(groupId);
//   });

//   test("200 status in response when no errors", async () => {
//     const res = await request(app)
//       .delete(route);
    
//       expect(res.statusCode).toBe(200);
//   });

//   test('Send error with 500 code on service error', async () => {
//     serviceRemove.mockRejectedValueOnce(new Error('Some happens'));

//     const res = await request(app)
//       .delete(route);
    
//     expect(res.statusCode).toBe(500);
//   });
// });
