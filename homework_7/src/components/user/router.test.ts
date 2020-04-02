import { app, server } from '../../index';

import { EndpointRoutes } from '../../constants';
import { UserService } from './service';
import {
  UserServiceInterface,
  EditablePropsOfUser,
  GetUserResponce
} from './interfaces';

import { getToken } from '../../utils';
import { SECRET } from '../../../config/secret';

const request = require("supertest");

const mockEditableUserData: EditablePropsOfUser = {
  login: 'loginValue',
  password: 'passwordValue1',
  age: 7,
}

const mockUserDataInResponce: GetUserResponce = {
  id: '3',
  ...mockEditableUserData,
}

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

    get(userId: string) {
      return serviceGet(userId);
    };

    getByName(login: string) {
      return serviceGetByName(login);
    };

    getAutoSuggestUsers(loginSubstring: string, limit: number) {
      return serviceGetAutoSuggestUsers(loginSubstring, limit);
    };
  }
}));

const token = getToken({ userId: '3' }, SECRET);

afterAll((done) => { server.close(done); });

describe(`Test GET ${EndpointRoutes.user}/:userId`, () => {
  beforeEach(() => {
    serviceGet.mockClear();
  });

  const userId = '3';
  const route = `${EndpointRoutes.user}/${userId}`;

  test('403 status in response, when no token', async () => {
    const res = await request(app)
      .get(route);
    
      expect(res.statusCode).toBe(403);
  });

  test('Call userService.get one time', async () => {
    await request(app)
      .get(route)
      .set('my-hidden-access-token', token);
    
    expect(serviceGet.mock.calls.length).toBe(1);
  });

  test('Call userService.get with passed userId', async () => {
    await request(app)
      .get(route)
      .set('my-hidden-access-token', token);
    
    expect(serviceGet.mock.calls[0][0]).toBe(userId);
  });

  test('Data from userService.get is in response', async () => {
    const res = await request(app)
      .get(route)
      .set('my-hidden-access-token', token);
    
    expect(res.body).toEqual(mockUserDataInResponce);
  });

  test('Send response with 404 when empty data from service', async () => {
    serviceGet.mockResolvedValueOnce(null);

    const res = await request(app)
      .get(route)
      .set('my-hidden-access-token', token);
    
    expect(res.statusCode).toBe(404);
  });

  test('Send error with 500 code on service error', async () => {
    serviceGet.mockRejectedValueOnce(new Error('Some happens'));

    const res = await request(app)
      .get(route)
      .set('my-hidden-access-token', token);
    
    expect(res.statusCode).toBe(500);
  });
});


describe(`Test POST ${EndpointRoutes.user}`, () => {
  beforeEach(() => {
    serviceCreate.mockClear();
  });

  const route = EndpointRoutes.user;

  test('403 status in response, when no token', async () => {
    const res = await request(app)
      .post(route);
    
      expect(res.statusCode).toBe(403);
  });

  test("500 status in response, when invalid data was send", async () => {
    const res = await request(app)
      .post(route)
      .set('my-hidden-access-token', token)
      .set('Content-Type', 'application/json')
      .send({ invalidData: 'test' });

    expect(res.statusCode).toBe(500);
  });

  test("UserService.create wasn't called, when invalid data was send", async () => {
    await request(app)
      .post(route)
      .set('my-hidden-access-token', token)
      .set('Content-Type', 'application/json')
      .send({ invalidData: 'test' });
    
    expect(serviceCreate.mock.calls.length).toBe(0);
  });

  test('Call userService.create one time', async () => {
    const res = await request(app)
      .post(route)
      .set('my-hidden-access-token', token)
      .set('Content-Type', 'application/json')
      .send(mockEditableUserData);

    expect(serviceCreate.mock.calls.length).toBe(1);
  });

  test('Call userService.create with passed userDTO in body', async () => {
    await request(app)
      .post(route)
      .set('my-hidden-access-token', token)
      .send(mockEditableUserData);
    
    expect(serviceCreate.mock.calls[0][0]).toEqual(mockEditableUserData);
  });

  test("200 status in response, when valid data was send", async () => {
    const res = await request(app)
      .post(route)
      .set('my-hidden-access-token', token)
      .set('Content-Type', 'application/json')
      .send(mockEditableUserData);
    
      expect(res.statusCode).toBe(200);
  });

  test('Send error with 500 code on service error', async () => {
    serviceCreate.mockRejectedValueOnce(new Error('Some happens'));

    const res = await request(app)
      .post(route)
      .set('my-hidden-access-token', token)
      .set('Content-Type', 'application/json')
      .send(mockEditableUserData);
    
    expect(res.statusCode).toBe(500);
  });
});


describe(`Test PUT ${EndpointRoutes.user}`, () => {
  beforeEach(() => {
    serviceUpdate.mockClear();
  });

  const userId = '3';
  const route = `${EndpointRoutes.user}/${userId}`;

  test('403 status in response, when no token', async () => {
    const res = await request(app)
      .put(route);
    
      expect(res.statusCode).toBe(403);
  });

  test("500 status in response, when invalid data was send", async () => {
    const res = await request(app)
      .put(route)
      .set('my-hidden-access-token', token)
      .send({ invalidData: 'test' });

    expect(res.statusCode).toBe(500);
  });

  test("UserService.update wasn't called, when invalid data was send", async () => {
    await request(app)
      .put(route)
      .set('my-hidden-access-token', token)
      .send({ invalidData: 'test' });
    
    expect(serviceUpdate.mock.calls.length).toBe(0);
  });

  test('Call userService.update 1 time, when valid data was send', async () => {
    await request(app)
      .put(route)
      .set('my-hidden-access-token', token)
      .send(mockEditableUserData);
    
    expect(serviceUpdate.mock.calls.length).toBe(1);
  });

  test('Call userService.update with passed userId in params and userDTO in body', async () => {
    await request(app)
      .put(route)
      .set('my-hidden-access-token', token)
      .send(mockEditableUserData);
    
    expect(serviceUpdate.mock.calls[0][0]).toEqual(userId);
    expect(serviceUpdate.mock.calls[0][1]).toEqual(mockEditableUserData);
  });

  test("200 status in response, when valid data was send", async () => {
    const res = await request(app)
      .put(route)
      .set('my-hidden-access-token', token)
      .send(mockEditableUserData);
    
      expect(res.statusCode).toBe(200);
  });

  test('Send error with 500 code on service error', async () => {
    serviceUpdate.mockRejectedValueOnce(new Error('Some happens'));

    const res = await request(app)
      .put(route)
      .set('my-hidden-access-token', token)
      .send(mockEditableUserData);
    
    expect(res.statusCode).toBe(500);
  });
});


describe(`Test DELETE ${EndpointRoutes.user}`, () => {
  beforeEach(() => {
    serviceRemove.mockClear();
  });

  const userId = '3';
  const route = `${EndpointRoutes.user}/${userId}`;

  test('403 status in response, when no token', async () => {
    const res = await request(app)
      .delete(route);
    
      expect(res.statusCode).toBe(403);
  });

  test('Call userService.delete 1 time', async () => {
    await request(app)
      .delete(route)
      .set('my-hidden-access-token', token);
    
    expect(serviceRemove.mock.calls.length).toBe(1);
  });

  test('Call userService.delete with passed userId in params', async () => {
    await request(app)
      .delete(route)
      .set('my-hidden-access-token', token);
    
    expect(serviceRemove.mock.calls[0][0]).toEqual(userId);
  });

  test("200 status in response when no errors", async () => {
    const res = await request(app)
      .delete(route)
      .set('my-hidden-access-token', token);
    
      expect(res.statusCode).toBe(200);
  });

  test('Send error with 500 code on service error', async () => {
    serviceRemove.mockRejectedValueOnce(new Error('Some happens'));

    const res = await request(app)
      .delete(route)
      .set('my-hidden-access-token', token);
    
    expect(res.statusCode).toBe(500);
  });
});


describe(`Test GET ${EndpointRoutes.user}/get-suggestions`, () => {
  beforeEach(() => {
    serviceGetAutoSuggestUsers.mockClear();
  });

  const route = `${EndpointRoutes.user}/get-suggestions`;
  const query = { loginSubstring: 'name', limit: 10 };

  test('403 status in response, when no token', async () => {
    const res = await request(app)
      .get(route);
    
      expect(res.statusCode).toBe(403);
  });

  test("500 status in response, when invalid query was send", async () => {
    const res = await request(app)
      .get(route)
      .set('my-hidden-access-token', token);

    expect(res.statusCode).toBe(500);
  });

  test("UserService.getAutoSuggestUsers wasn't called, when invalid query was send", async () => {
    await request(app)
      .get(route)
      .set('my-hidden-access-token', token)
      .query({ invalid: 'query' });
    
    expect(serviceGetAutoSuggestUsers.mock.calls.length).toBe(0);
  });

  test('Call userService.getAutoSuggestUsers one time', async () => {
    await request(app)
      .get(route)
      .set('my-hidden-access-token', token)
      .query(query);
    
    expect(serviceGetAutoSuggestUsers.mock.calls.length).toBe(1);
  });

  test('Call userService.getAutoSuggestUsers with passed params in query', async () => {
    await request(app)
      .get(route)
      .set('my-hidden-access-token', token)
      .query(query);
    
    expect(serviceGetAutoSuggestUsers.mock.calls[0][0]).toBe(query.loginSubstring);
    expect(serviceGetAutoSuggestUsers.mock.calls[0][1]).toEqual(query.limit);
  });

  test('Data from userService.getAutoSuggestUsers is in response', async () => {
    const res = await request(app)
      .get(route)
      .set('my-hidden-access-token', token)
      .query(query);
    
    expect(res.body).toEqual(expect.arrayContaining([mockUserDataInResponce]));
  });

  test('Send error with 500 code on service error', async () => {
    serviceGetAutoSuggestUsers.mockRejectedValueOnce(new Error('Some happens'));

    const res = await request(app)
      .get(route)
      .set('my-hidden-access-token', token)
      .query(query);
    
    expect(res.statusCode).toBe(500);
  });
});