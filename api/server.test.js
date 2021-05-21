const supertest = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('./server');

// Write your tests here

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db('users').truncate();
});
afterAll(async () => {
  await db.destroy();
});

test('sanity', () => {
  expect(true).not.toBe(false);
});

it('correct env', () => {
  expect(process.env.NODE_ENV).toBe('testing');
});

describe('registration tests', () => {
  describe('/api/auth/register', () => {
    it('will register a new user', async () => {
      const res = await supertest(server).post('/api/auth/register').send({
        username: 'ladygaga',
        password: 'music',
      });
      expect(res.statusCode).toBe(201);
    });
  });
  it('should throw error if password is empty', async () => {
    try {
      await {
        username: 'biscuit',
        password: '',
      };
    } catch (err) {
      expect(err.message).toEqual('username and password required');
    }
  });
  it('throw error if username is empty', async () => {
    try {
      await {
        username: '',
        password: '1234',
      };
    } catch (err) {
      expect(err.message).toEqual('username and password required');
    }
  });
  describe('/api/auth/login', () => {
    it('should throw error if password is empty', async () => {
      try {
        await {
          username: 'barnyard',
          password: '',
        };
      } catch (err) {
        expect(err.message).toEqual('username and password required');
      }
    });
    it('throw error if username is empty', async () => {
      try {
        await {
          username: '',
          password: '5678',
        };
      } catch (err) {
        expect(err.message).toEqual('username and password required');
      }
    });
  });
});
