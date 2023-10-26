const assert = require('assert');
const request = require('supertest'); // You'll need to install this library

const app = require('./server'); // Import the Express app from server.js

describe('Gym Management System', () => {
  // Dummy data for testing
  const testMember = { name: 'John Doe', age: 30, membership: 'Gold' };
  const testClass = { name: 'Yoga', instructor: 'Alice', schedule: 'Mon, Wed, Fri 9:00 AM' };

  it('should add a new gym member', async () => {
    const response = await request(app)
      .post('/members')
      .send(testMember);
    assert.equal(response.status, 201);
    assert.deepEqual(response.body, testMember);
  });

  it('should get a list of gym members', async () => {
    const response = await request(app)
      .get('/members');
    assert.equal(response.status, 200);
    assert(Array.isArray(response.body));
  });

  it('should add a new fitness class', async () => {
    const response = await request(app)
      .post('/classes')
      .send(testClass);
    assert.equal(response.status, 201);
    assert.deepEqual(response.body, testClass);
  });

  it('should get a list of fitness classes', async () => {
    const response = await request(app)
      .get('/classes');
    assert.equal(response.status, 200);
    assert(Array.isArray(response.body));
  });
});

