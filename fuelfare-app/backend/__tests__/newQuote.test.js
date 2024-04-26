const { newQuote } = require("../controllers/newQuoteController");
const NewQuote = require("../models/newQuote");

jest.mock("../models/newQuote");

describe("newQuoteController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new quote successfully", async () => {
    const req = {
      body: {
        user: "userId123",
        numGallons: 100,
        fuelType: "regular",
        address: "123 Main St",
        deliveryDate: "2024-04-01",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const savedQuote = {
      _id: "quoteId123",
      user: "userId123",
      numGallons: 100,
      fuelType: "regular",
      address: "123 Main St",
      deliveryDate: "2024-04-01",
    };

    NewQuote.mockReturnValueOnce({
      save: jest.fn().mockResolvedValueOnce(savedQuote),
    });

    await newQuote(req, res);

    expect(NewQuote).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created a new quote successfully",
    });
  });

  test("should handle error when creating a new quote", async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMessage = "Database error";
    NewQuote.mockReturnValueOnce({
      save: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
    });

    await newQuote(req, res);

    expect(NewQuote).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
