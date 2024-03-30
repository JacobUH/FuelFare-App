const { login } = require("../controllers/loginController");
const Setup = require("../models/Setup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/Setup");

describe("loginController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should login user with valid credentials", async () => {
    const req = {
      body: { email: "test@example.com", password: "password123" },
    };
    const res = {
      json: jest.fn(),
    };

    const user = {
      _id: "userId123",
      email: "test@example.com",
      password: "hashedPassword123",
    };

    Setup.findOne.mockResolvedValueOnce(user);
    bcrypt.compare.mockResolvedValueOnce(true);
    jwt.sign.mockReturnValueOnce("mockToken");

    await login(req, res);

    expect(Setup.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      req.body.password,
      user.password
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "365d",
      }
    );
    expect(res.json).toHaveBeenCalledWith({
      userId: user._id,
      token: "mockToken",
    });
  });

  test("should return error for invalid email or password", async () => {
    const req = {
      body: { email: "test@example.com", password: "password123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Setup.findOne.mockResolvedValueOnce(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid email or password",
    });
  });

  test("should handle internal server error", async () => {
    const req = {
      body: { email: "test@example.com", password: "password123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Setup.findOne.mockResolvedValueOnce({ email: req.body.email });

    const errorMessage = "bcrypt error";
    bcrypt.compare.mockRejectedValueOnce(new Error(errorMessage));

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

