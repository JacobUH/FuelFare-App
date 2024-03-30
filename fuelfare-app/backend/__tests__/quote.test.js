const { getQuotesByUserId } = require("../controllers/quoteController");
const NewQuote = require("../models/newQuote");

// Mocking the NewQuote model methods
jest.mock("../models/newQuote");

describe("getQuotesByUserId", () => {
  test("should return quotes for a valid user ID", async () => {
    const req = { user: { _id: "validUserID" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    NewQuote.find.mockResolvedValueOnce(["quote1", "quote2"]);

    await getQuotesByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(["quote1", "quote2"]);
  });

  test("should handle error when fetching quotes", async () => {
    const req = { user: { _id: "validUserID" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    NewQuote.findOne.mockRejectedValue(new Error("Database error"));

    await getQuotesByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
