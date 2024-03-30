// Import necessary modules
const { setup } = require("../controllers/setupController");
const Setup = require("../models/Setup");
const bcrypt = require("bcrypt");

// Mock Setup model functions
jest.mock("../models/Setup", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

// Mock bcrypt hash function
jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

describe("setupController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should create new user when email does not exist", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
        fullName: "Test User",
        companyName: "Test Company",
        companyAddress1: "123 Test St",
        city: "Test City",
        state: "TS",
        country: "Test Country",
        zipCode: "12345",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock Setup.findOne to return null (email doesn't exist)
    Setup.findOne.mockResolvedValue(null);

    // Mock bcrypt.hash to return hashed password
    bcrypt.hash.mockResolvedValue("hashedPassword123");

    // Mock Setup.create to resolve
    Setup.create.mockResolvedValue({
      _id: "userId123",
      email: req.body.email,
      password: "hashedPassword123",
      ...req.body,
    });

    await setup(req, res);

    // Assertions
    expect(Setup.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
    expect(Setup.create).toHaveBeenCalledWith({
      email: req.body.email,
      password: "hashedPassword123",
      ...req.body,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User signed up successfully",
    });
  });

  test("Should return error when email already exists", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
        fullName: "Test User",
        companyName: "Test Company",
        companyAddress1: "123 Test St",
        city: "Test City",
        state: "TS",
        country: "Test Country",
        zipCode: "12345",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock Setup.findOne to return existing user
    Setup.findOne.mockResolvedValue({
      email: req.body.email,
      password: "hashedPassword123",
      ...req.body,
    });

    await setup(req, res);

    // Assertions
    expect(Setup.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email already exists" });
  });

  test("Should return error when database operation fails", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
        fullName: "Test User",
        companyName: "Test Company",
        companyAddress1: "123 Test St",
        city: "Test City",
        state: "TS",
        country: "Test Country",
        zipCode: "12345",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock Setup.findOne to throw error
    Setup.findOne.mockRejectedValue(new Error("Database error"));

    await setup(req, res);

    // Assertions
    expect(Setup.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
