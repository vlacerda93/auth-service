const request = require('supertest');
const app = require('./app');

describe('Auth Service', () => {
  it('should authenticate valid user', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'password123' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    expect(res.body.user).toHaveProperty('username', 'admin');
  });

  it('should reject invalid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrongpassword' });
    
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
  });
  
  it('should require username and password', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin' });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
