const { setup } = require("../controllers/setupController");
const Setup = require("../models/Setup");
const UserCredentials = require("../models/UserCredentials");

jest.mock("../models/UserCredentials");
jest.mock("../models/Setup");

describe("setupController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create user information successfully", async () => {
    const req = {
      body: {
        email: "test@example.com",
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

    const userCredentials = { _id: "userCredentialsId" };
    UserCredentials.findOne.mockResolvedValueOnce(userCredentials);

    const newUserSetup = { save: jest.fn().mockResolvedValueOnce() };
    Setup.mockReturnValueOnce(newUserSetup);

    await setup(req, res);

    expect(UserCredentials.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(Setup).toHaveBeenCalledWith({
      credentials: userCredentials._id,
      fullName: req.body.fullName,
      companyName: req.body.companyName,
      companyAddress1: req.body.companyAddress1,
      companyAddress2: req.body.companyAddress2,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode,
    });
    expect(newUserSetup.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "User information saved successfully" });
  });

  test("should handle user credentials not found", async () => {
    const req = {
      body: {
        email: "test@example.com",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    UserCredentials.findOne.mockResolvedValueOnce(null);

    await setup(req, res);

    expect(UserCredentials.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "User credentials not found" });
  });

  test("should handle internal server error", async () => {
    const req = {
      body: {
        email: "test@example.com",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMessage = "Database error";
    UserCredentials.findOne.mockRejectedValueOnce(new Error(errorMessage));

    await setup(req, res);

    expect(UserCredentials.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
