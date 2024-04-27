const {
  fetchUserData,
  updateAccount,
  updatePassword,
} = require('../controllers/accountController'); 
const Setup = require('../models/Setup');
const UserCredentials = require('../models/UserCredentials');
const bcrypt = require('bcrypt');

jest.mock('../models/Setup');
jest.mock('../models/UserCredentials');
jest.mock('bcrypt');

describe('fetchUserData', () => {
  test('should return user setup information when it exists', async () => {
    const req = { user: { _id: 'userId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockUserSetup = { _id: 'userId', someData: 'example' };
    Setup.findOne.mockResolvedValueOnce(mockUserSetup);

    await fetchUserData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Account information fetched successfully',
      userSetup: mockUserSetup
    });
  });

  test('should return error when user setup information does not exist', async () => {
    const req = { user: { _id: 'userId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Setup.findOne.mockResolvedValueOnce(null);

    await fetchUserData(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User setup information not found' });
  });

  test('should return error when an exception occurs', async () => {
    const req = { user: { _id: 'userId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockError = new Error('Test error');
    Setup.findOne.mockRejectedValueOnce(mockError);

    await fetchUserData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while fetching user data' });
    expect(console.error).toHaveBeenCalledWith('Error fetching user data:', mockError);
  });
});

describe('updateAccount', () => {
  test('should return error when user credentials not found', async () => {
    const req = { user: { _id: 'userId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    UserCredentials.findById.mockResolvedValueOnce(null);

    await updateAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User credentials not found' });
  });

  test('should update account information successfully', async () => {
    const req = {
      user: { _id: 'userId' },
      body: {
        fullName: 'John Doe',
        companyName: 'ABC Inc.',
        companyAddress1: '123 Main Street',
        companyAddress2: ' ',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        zipCode: '10001'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockUserSetup = {
      fullName: 'John Doe',
        companyName: 'ABC Inc.',
        companyAddress1: '123 Main Street',
        companyAddress2: ' ',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        zipCode: '10001'
    };
    UserCredentials.findById.mockResolvedValueOnce({ _id: 'userId' });
    Setup.findOne.mockResolvedValueOnce(mockUserSetup);
    Setup.prototype.save.mockResolvedValueOnce(mockUserSetup);

    await updateAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Account information updated successfully',
      userSetup: mockUserSetup
    });
  });

  test('should update account information successfully', async () => {
    const req = {
      user: { _id: 'userId' },
      body: {
        fullName: 'John Doe',
        companyName: 'ABC Inc.',
        companyAddress1: '123 Main Street',
        companyAddress2: 'Apt 101',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipCode: '10001',
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockUserCredentials = { _id: 'userId' };
    const mockUserSetup = { 
      _id: 'setupId',
      fullName: 'Old Name',
      companyName: 'Old Company',
      companyAddress1: 'Old Address 1',
      companyAddress2: 'Old Address 2',
      city: 'Old City',
      state: 'Old State',
      country: 'Old Country',
      zipCode: 'Old ZipCode',
      save: jest.fn().mockResolvedValueOnce(), 
    };
    
    UserCredentials.findById.mockResolvedValueOnce(mockUserCredentials);
    Setup.findOne.mockResolvedValueOnce(mockUserSetup);

    await updateAccount(req, res);

    // Ensure the user setup information is updated with the provided data
    expect(mockUserSetup.fullName).toBe(req.body.fullName);
    expect(mockUserSetup.companyName).toBe(req.body.companyName);
    expect(mockUserSetup.companyAddress1).toBe(req.body.companyAddress1);
    expect(mockUserSetup.companyAddress2).toBe(req.body.companyAddress2);
    expect(mockUserSetup.city).toBe(req.body.city);
    expect(mockUserSetup.state).toBe(req.body.state);
    expect(mockUserSetup.country).toBe(req.body.country);
    expect(mockUserSetup.zipCode).toBe(req.body.zipCode);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Account information updated successfully',
      userSetup: mockUserSetup
    });
  });

  test("should handle error when finding user", async () => {
    const req = {
      body: { email: "test@example.com", password: "password123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMessage = "Database error";
    Setup.findOne.mockRejectedValueOnce(new Error(errorMessage));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });

  test("should handle error when finding user", async () => {
    const req = {
      body: { email: "test@example.com", password: "password123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMessage = "Database error";
    Setup.findOne.mockRejectedValueOnce(new Error(errorMessage));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

describe('updatePassword', () => {
  test('should return error when user credentials not found', async () => {
    const req = { user: { _id: 'userId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    UserCredentials.findById.mockResolvedValueOnce(null); 

    await updateAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User credentials not found' });
  });

  test('should update password successfully', async () => {
    const req = {
      user: { _id: 'userId' },
      body: {
        currentPassword: 'oldPassword',
        newPassword: 'newPassword',
        confNewPassword: 'newPassword',
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockUserCredentials = { _id: 'userId', password: 'hashedPassword' };
    UserCredentials.findById.mockResolvedValueOnce(mockUserCredentials);
    bcrypt.compare.mockResolvedValueOnce(true);
    bcrypt.hash.mockResolvedValueOnce('newHashedPassword');
    UserCredentials.prototype.save.mockResolvedValueOnce(mockUserCredentials);

    await updatePassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Password updated successfully' });
  });

  test('should return error when current password is incorrect', async () => {
    const req = {
      user: { _id: 'userId' },
      body: {
        currentPassword: 'wrongPassword', 
        newPassword: 'newPassword',
        confNewPassword: 'newPassword',
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockUserCredentials = { _id: 'userId', password: 'hashedPassword' };
    UserCredentials.findById.mockResolvedValueOnce(mockUserCredentials);
    bcrypt.compare.mockResolvedValueOnce(false); 

    await updatePassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Current password is incorrect' });
  });

  test("should handle error when finding user", async () => {
    const req = {
      body: { email: "test@example.com", password: "password123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMessage = "Database error";
    Setup.findOne.mockRejectedValueOnce(new Error(errorMessage));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });

});
