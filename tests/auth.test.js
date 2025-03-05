const request = require('supertest');
const app = require('../server');

test('POST /api/auth/login - should login a user', async () => {
  await request(app).post('/api/auth/login').send({ email: 'test@example.com', password: 'password' }).expect(200);
});

test('POST /api/auth/register - should register a user', async () => {
  await request(app).post('/api/auth/register').send({ email: 'new@example.com', password: 'password' }).expect(200);
});