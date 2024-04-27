const { login } = require('../controllers/loginController'); 
const UserCredentials = require('../models/UserCredentials');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../models/UserCredentials');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('login', () => {
  test('should log in the user and return a JWT token', async () => {
    const req = {
      body: { email: 'test@example.com', password: 'password' }
    };
    const res = {
      json: jest.fn()
    };

    const mockUser = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' };
    const mockToken = 'mockToken';
    
    UserCredentials.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(true);
    jwt.sign.mockReturnValueOnce(mockToken);

    await login(req, res);

    expect(UserCredentials.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: mockUser._id, email: mockUser.email },
      process.env.SECRET_KEY,
      { expiresIn: '365d' }
    );
    expect(res.json).toHaveBeenCalledWith({ userId: mockUser._id, token: mockToken });
  });

  test('should return error for invalid email or password', async () => {
    const req = {
      body: { email: 'test@example.com', password: 'password' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    UserCredentials.findOne.mockResolvedValueOnce(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
  });

  test('should return error for incorrect password', async () => {
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockUser = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' };

    UserCredentials.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
  });

  test('should log in the user for correct password', async () => {
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = {
      json: jest.fn()
    };

    const mockUser = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' };

    UserCredentials.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(true); // Mock bcrypt.compare to return true

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({ userId: mockUser._id, token: expect.any(String) });
  });

  test('should return error for internal server error', async () => {
    const req = {
      body: { email: 'test@example.com', password: 'password' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockError = new Error('Test error');
    UserCredentials.findOne.mockRejectedValueOnce(mockError);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    expect(console.error).toHaveBeenCalledWith('Error logging in:', mockError);
  });
});
