const {
  getQuotesByUserId,
  viewQuoteFromID,
} = require("../controllers/quoteController");
const NewQuote = require("../models/newQuote");

jest.mock("../models/newQuote");

describe("quoteController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should get quotes by user ID", async () => {
    const req = {
      user: { _id: "userId" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const quotes = [{}, {}]; 
    NewQuote.find.mockResolvedValueOnce(quotes);

    await getQuotesByUserId(req, res);

    expect(NewQuote.find).toHaveBeenCalledWith({ user: req.user._id });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(quotes);
  });

  test("should view quote by quote ID", async () => {
    const req = {
      user: { _id: "userId" },
      params: { quoteId: "quoteId" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const quote = {}; 
    NewQuote.findOne.mockResolvedValueOnce(quote);

    await viewQuoteFromID(req, res);

    expect(NewQuote.findOne).toHaveBeenCalledWith({
      user: req.user._id,
      _id: req.params.quoteId,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(quote);
  });

  test("should handle quote not found", async () => {
    const req = {
      user: { _id: "userId" },
      params: { quoteId: "quoteId" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    NewQuote.findOne.mockResolvedValueOnce(null);

    await viewQuoteFromID(req, res);

    expect(NewQuote.findOne).toHaveBeenCalledWith({
      user: req.user._id,
      _id: req.params.quoteId,
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Quote not found" });
  });

  test("should handle internal server error", async () => {
    const req = {
      user: { _id: "userId" },
      params: { quoteId: "quoteId" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMessage = "Database error";
    NewQuote.findOne.mockRejectedValueOnce(new Error(errorMessage));

    await viewQuoteFromID(req, res);

    expect(NewQuote.findOne).toHaveBeenCalledWith({
      user: req.user._id,
      _id: req.params.quoteId,
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
