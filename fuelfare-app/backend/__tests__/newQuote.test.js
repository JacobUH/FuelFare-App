const { newQuote, getQuotePrice } = require('../controllers/newQuoteController'); 
const NewQuote = require('../models/newQuote');
const Setup = require('../models/Setup');

jest.mock('../models/NewQuote');
jest.mock('../models/Setup');

describe('newQuote', () => {
  it('should create a new quote', async () => {
    const req = { body: { 
      user: "userId123",
      numGallons: 100,
      fuelType: "regular",
      address: "123 Main St",
      deliveryDate: "2024-04-01"
    } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockNewQuote = { _id: 'quoteId' };
    NewQuote.mockReturnValueOnce({ save: jest.fn().mockResolvedValueOnce(mockNewQuote) });

    await newQuote(req, res);

    expect(NewQuote).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User created a new quote successfully', _id: 'quoteId' });
  });

  it('should return error for internal server error', async () => {
    const req = { body: { 
      user: "userId123",
      numGallons: 100,
      fuelType: "regular",
      address: "123 Main St",
      deliveryDate: "2024-04-01"
    } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockError = new Error('Test error');
    NewQuote.mockReturnValueOnce({ save: jest.fn().mockRejectedValueOnce(mockError) });

    await newQuote(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    expect(console.error).toHaveBeenCalledWith('Error creating new quote:', mockError);
  });
});

describe('getQuotePrice', () => {
  it('should return quote information for the user', async () => {
    const req = { user: { _id: 'userId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockUserSetup = { state: 'TX' };
    const mockCountQuote = 5;

    Setup.findOne.mockResolvedValueOnce(mockUserSetup);
    NewQuote.countDocuments.mockResolvedValueOnce(mockCountQuote);

    await getQuotePrice(req, res);

    expect(Setup.findOne).toHaveBeenCalledWith({ credentials: req.user._id });
    expect(NewQuote.countDocuments).toHaveBeenCalledWith({ user: req.user._id });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Quote information fetched successfully', userState: 'TX', countQuote: 5 });
  });

  it('should return error for user setup information not found', async () => {
    const req = { user: { _id: 'userId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Setup.findOne.mockResolvedValueOnce(null);

    await getQuotePrice(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User setup information not found' });
  });

  it('should return error for internal server error', async () => {
    const req = { user: { _id: 'userId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockError = new Error('Test error');
    Setup.findOne.mockRejectedValueOnce(mockError);

    await getQuotePrice(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while fetching user data' });
    expect(console.error).toHaveBeenCalledWith('Error fetching user data:', mockError);
  });
});
