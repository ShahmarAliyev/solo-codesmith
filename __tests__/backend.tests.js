const request = require('supertest');
const app = require('../server/server');
const mongoose = require('mongoose');
const User = require('../server/models/model');

describe('Backend Routes and Controllers', () => {
  beforeAll(async () => {
    // Connect to the database
    await mongoose.connect(
      'mongodb+srv://shahmar:shahmar@solo.qknsilk.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  });

  beforeEach(async () => {
    // Clear the database before each test
    await User.deleteMany({});
  });

  afterAll(async () => {
    // Disconnect from the database after all tests
    await mongoose.disconnect();
  });

  describe('Auth Routers', () => {
    describe('Signup API', () => {
      it('should create a new user on successful signup', async () => {
        const response = await request(app).post('/api/signup').send({
          email: 'test@example.com',
          password: 'password123',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email', 'test@example.com');
        expect(response.body).toHaveProperty('password');
      });
    });

    describe('Signin API', () => {
      it('should return the user on successful signin', async () => {
        const createdUser = await request(app).post('/api/signup').send({
          email: 'test@example.com',
          password: 'password123',
        });
        const response = await request(app).post('/api/signin').send({
          email: 'test@example.com',
          password: 'password123',
        });

        console.log('response', response.body);
        expect(response.status).toBe(200);
        expect(response.body.email).toEqual('test@example.com');
        expect(response.body.password).toEqual('password123');
      });
    });
  });

  describe('Api Router', () => {
    describe('GET /api', () => {
      it('should return a list of restaurants', async () => {
        const response = await request(app).get('/api');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(-1);
      });
    });

    describe('POST /api/details', () => {
      it('should return details of a restaurant', async () => {
        const restaurantId = 'rjUOwXNxsg0tstFssAjfsQ';
        const response = await request(app)
          .post('/api/details')
          .send({ restId: restaurantId });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('id');
      });
    });
  });

  describe('Fav Router', () => {
    describe('GET /api/favourites', () => {
      it('should return a list of favourite restaurants', async () => {
        const user = await request(app).post('/api/signup').send({
          email: 'test@example.com',
          password: 'password123',
        });
        const userId = user.body._id;
        console.log(user.body._id, 'user');
        const response = await request(app)
          .post('/api/favourites')
          .send({ userId });
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
      });
    });
  });
});
