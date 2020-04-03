import { app, server } from '../../index';
import { EndpointRoutes } from '../../constants';

import { GroupService } from './service';
import { GroupCreateProps, GroupUpdateProps, Permission, GroupServiceInterface } from './interfaces';

import { getToken } from '../../utils';
import { SECRET } from '../../../config/secret';

const request = require("supertest");

const mockGroup: GroupCreateProps = {
  name: 'test',
  permissions: [Permission.READ, Permission.WRITE, Permission.SHARE, Permission.DELETE, Permission.UPLOAD_FILES],
}

const serviceGetAll = jest.fn().mockResolvedValue([mockGroup]);
const serviceGet = jest.fn().mockResolvedValue(mockGroup);
const serviceCreate = jest.fn().mockResolvedValue(undefined);
const serviceUpdate = jest.fn().mockResolvedValue(undefined);
const serviceRemove = jest.fn().mockResolvedValue(undefined);

jest.mock('./service', () => ({
  GroupService: class implements GroupServiceInterface  {
    constructor() {}

    getAll() { 
      return serviceGetAll();
    }

    get(groupId: string) {
      return serviceGet(groupId);
    };

    create(groupDTO: GroupCreateProps) {
      return serviceCreate(groupDTO);
    };

    update(groupId: string, updateData: GroupUpdateProps) {
      return serviceUpdate(groupId, updateData);
    };

    remove(groupId: string) {
      return serviceRemove(groupId);
    };
  }
}));

const token = getToken({ userId: '3' }, SECRET);

afterAll((done) => { server.close(done); });

describe(`Test GET ${EndpointRoutes.group}`, () => {
  beforeEach(() => {
    serviceGetAll.mockClear();
  });

  const route = EndpointRoutes.group;

  test('403 status in response, when no token', async () => {
    const res = await request(app)
      .get(route);
    
      expect(res.statusCode).toBe(403);
  });

  test('Call groupService.getAll one time', async () => {
    await request(app)
      .get(route)
      .set('my-hidden-access-token', token);
    
    expect(serviceGetAll.mock.calls.length).toBe(1);
  });

  test('Data from groupService.getAll is in response', async () => {
    serviceGetAll.mockResolvedValueOnce([mockGroup]);

    const res = await request(app)
      .get(route)
      .set('my-hidden-access-token', token);
    
    expect(res.body).toEqual(expect.arrayContaining([mockGroup]));
  });

  test('Send error with 500 code on service error', async () => {
    serviceGetAll.mockRejectedValueOnce(new Error('Some happens'));

    const res = await request(app)
      .get(route)
      .set('my-hidden-access-token', token);
    
    expect(res.statusCode).toBe(500);
  });
});

describe(`Test GET ${EndpointRoutes.group}/:groupId`, () => {
  beforeEach(() => {
    serviceGet.mockClear();
  });

  const groupId = '3';
  const route = `${EndpointRoutes.group}/${groupId}`;

  test('403 status in response, when no token', async () => {
    const res = await request(app)
      .get(route);
    
      expect(res.statusCode).toBe(403);
  });

  test('Call groupService.get one time', async () => {
    await request(app)
      .get(route)
      .set('my-hidden-access-token', token);
    
    expect(serviceGet.mock.calls.length).toBe(1);
  });

  test('Call groupService.get with passed groupId', async () => {
    await request(app)
      .get(route)
      .set('my-hidden-access-token', token);
    
    expect(serviceGet.mock.calls[0][0]).toBe(groupId);
  });

  test('Data from groupService.get is in response', async () => {
    serviceGet.mockResolvedValueOnce(mockGroup);

    const res = await request(app)
      .get(route)
      .set('my-hidden-access-token', token);
    
    expect(res.body).toEqual(mockGroup);
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


describe(`Test POST ${EndpointRoutes.group}`, () => {
  beforeEach(() => {
    serviceCreate.mockClear();
  });

  const route = EndpointRoutes.group;

  test('403 status in response, when no token', async () => {
    const res = await request(app)
      .get(route);
    
      expect(res.statusCode).toBe(403);
  });

  test("500 status in response, when invalid data was send", async () => {
    const res = await request(app)
      .post(route)
      .set('my-hidden-access-token', token)
      .send({ invalidData: 'test' });

    expect(res.statusCode).toBe(500);
  });

  test("GroupService.create wasn't called, when invalid data was send", async () => {
    await request(app)
      .post(route)
      .set('my-hidden-access-token', token)
      .send({ invalidData: 'test' });
    
    expect(serviceCreate.mock.calls.length).toBe(0);
  });

  test('Call groupService.create one time', async () => {
    await request(app)
      .post(route)
      .set('my-hidden-access-token', token)
      .send(mockGroup);
    
    expect(serviceCreate.mock.calls.length).toBe(1);
  });

  test('Call groupService.create with passed groupDTO in body', async () => {
    await request(app)
      .post(route)
      .set('my-hidden-access-token', token)
      .send(mockGroup);
    
    expect(serviceCreate.mock.calls[0][0]).toEqual(mockGroup);
  });

  test("200 status in response, when valid data was send", async () => {
    const res = await request(app)
      .post(route)
      .set('my-hidden-access-token', token)
      .send(mockGroup);
    
      expect(res.statusCode).toBe(200);
  });

  test('Send error with 500 code on service error', async () => {
    serviceCreate.mockRejectedValueOnce(new Error('Some happens'));

    const res = await request(app)
      .post(route)
      .set('my-hidden-access-token', token)
      .send(mockGroup);
    
    expect(res.statusCode).toBe(500);
  });
});


describe(`Test PUT ${EndpointRoutes.group}`, () => {
  beforeEach(() => {
    serviceUpdate.mockClear();
  });

  const groupId = '3';
  const route = `${EndpointRoutes.group}/${groupId}`;

  test('403 status in response, when no token', async () => {
    const res = await request(app)
      .get(route);
    
      expect(res.statusCode).toBe(403);
  });

  test("500 status in response, when invalid data was send", async () => {
    const res = await request(app)
      .put(route)
      .set('my-hidden-access-token', token)
      .send({ invalidData: 'test' });

    expect(res.statusCode).toBe(500);
  });

  test("GroupService.update wasn't called, when invalid data was send", async () => {
    await request(app)
      .put(route)
      .set('my-hidden-access-token', token)
      .send({ invalidData: 'test' });
    
    expect(serviceUpdate.mock.calls.length).toBe(0);
  });

  test('Call groupService.update 1 time, when valid data was send', async () => {
    await request(app)
      .put(route)
      .set('my-hidden-access-token', token)
      .send(mockGroup);
    
    expect(serviceUpdate.mock.calls.length).toBe(1);
  });

  test('Call groupService.update with passed groupId in params and groupDTO in body', async () => {
    await request(app)
      .put(route)
      .set('my-hidden-access-token', token)
      .send(mockGroup);
    
    expect(serviceUpdate.mock.calls[0][0]).toEqual(groupId);
    expect(serviceUpdate.mock.calls[0][1]).toEqual(mockGroup);
  });

  test("200 status in response, when valid data was send", async () => {
    const res = await request(app)
      .put(route)
      .set('my-hidden-access-token', token)
      .send(mockGroup);
    
      expect(res.statusCode).toBe(200);
  });

  test('Send error with 500 code on service error', async () => {
    serviceUpdate.mockRejectedValueOnce(new Error('Some happens'));

    const res = await request(app)
      .put(route)
      .set('my-hidden-access-token', token)
      .send(mockGroup);
    
    expect(res.statusCode).toBe(500);
  });
});


describe(`Test DELETE ${EndpointRoutes.group}`, () => {
  beforeEach(() => {
    serviceRemove.mockClear();
  });

  const groupId = '3';
  const route = `${EndpointRoutes.group}/${groupId}`;

  test('403 status in response, when no token', async () => {
    const res = await request(app)
      .get(route);
    
      expect(res.statusCode).toBe(403);
  });

  test('Call groupService.delete 1 time', async () => {
    await request(app)
      .delete(route)
      .set('my-hidden-access-token', token);
    
    expect(serviceRemove.mock.calls.length).toBe(1);
  });

  test('Call groupService.delete with passed groupId in params', async () => {
    await request(app)
      .delete(route)
      .set('my-hidden-access-token', token);
    
    expect(serviceRemove.mock.calls[0][0]).toEqual(groupId);
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
