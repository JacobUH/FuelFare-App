const { setup } = require("../controllers/setupController");
const Setup = require("../models/Setup");
const bcrypt = require("bcrypt");

jest.mock("bcrypt");
jest.mock("../models/Setup");

describe("setupController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new user successfully", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
        fullName: "John Doe",
        companyName: "ABC Inc.",
        companyAddress1: "123 Main St",
        companyAddress2: "",
        city: "New York",
        state: "NY",
        country: "USA",
        zipCode: "10001",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const hashedPassword = "hashedPassword123";
    bcrypt.hash.mockResolvedValueOnce(hashedPassword);

    const newUser = {
      save: jest.fn().mockResolvedValueOnce(),
    };
    Setup.mockReturnValueOnce(newUser);

    await setup(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
    expect(Setup).toHaveBeenCalledWith({
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
      companyName: req.body.companyName,
      companyAddress1: req.body.companyAddress1,
      companyAddress2: req.body.companyAddress2,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode,
    });
    expect(newUser.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User signed up successfully",
    });
  });

  test("should handle existing email", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
        fullName: "John Doe",
        companyName: "ABC Inc.",
        companyAddress1: "123 Main St",
        companyAddress2: "",
        city: "New York",
        state: "NY",
        country: "USA",
        zipCode: "10001",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Setup.findOne.mockResolvedValueOnce({ email: req.body.email });

    await setup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email already exists" });
  });

  test("should handle internal server error", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
        fullName: "John Doe",
        companyName: "ABC Inc.",
        companyAddress1: "123 Main St",
        companyAddress2: "",
        city: "New York",
        state: "NY",
        country: "USA",
        zipCode: "10001",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMessage = "Database error";
    Setup.findOne.mockRejectedValueOnce(new Error(errorMessage));

    await setup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
