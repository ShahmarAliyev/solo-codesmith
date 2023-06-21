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
        return request(app)
          .post('/api/signup')
          .send({
            email: 'test@example.com',
            password: 'password123',
          })
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('email', 'test@example.com');
            expect(response.body).toHaveProperty('password');
          });
      });
    });

    describe('Signin API', () => {
      it('should return the user on successful signin', async () => {
        return request(app)
          .post('/api/signup')
          .send({
            email: 'test@example.com',
            password: 'password123',
          })
          .then(() => {
            return request(app)
              .post('/api/signin')
              .send({
                email: 'test@example.com',
                password: 'password123',
              })
              .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body.email).toEqual('test@example.com');
                expect(response.body.password).toEqual('password123');
              });
          });
      });
    });
  });

  describe('Api Router', () => {
    describe('GET /api', () => {
      it('should return a list of restaurants', async () => {
        return request(app)
          .get('/api')
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(-1);
          });
      });
    });

    describe('POST /api/details', () => {
      it('should return details of a restaurant', async () => {
        const restaurantId = 'rjUOwXNxsg0tstFssAjfsQ';
        return request(app)
          .post('/api/details')
          .send({ restId: restaurantId })
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('id');
          });
      });
    });
  });

  describe('Fav Router', () => {
    describe('GET /api/favourites', () => {
      it('should return a list of favourite restaurants', async () => {
        return request(app)
          .post('/api/signup')
          .send({
            email: 'test@example.com',
            password: 'password123',
          })
          .then((user) => {
            const userId = user.body._id;
            return request(app)
              .post('/api/favourites')
              .send({ userId })
              .then((response) => {
                expect(response.status).toBe(200);
                expect(Array.isArray(response.body)).toBe(true);
              });
          });
      });
    });
  });
});
