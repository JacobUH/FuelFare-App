const { updateAccount, updatePassword } = require("../controllers/accountController");
const Setup = require("../models/Setup");
const bcrypt = require("bcrypt");

jest.mock("../models/Setup");
jest.mock("bcrypt");

describe("accountController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("updateAccount", () => {
    test("should update account information", async () => {
      const req = {
        user: { _id: "userId123" },
        body: {
          fullName: "New Full Name",
          companyName: "New Company Name",
          address1: "New Address 1",
          address2: "New Address 2",
          city: "New City",
          state: "NS",
          country: "New Country",
          zip: "12345",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const user = {
        _id: "userId123",
        save: jest.fn(),
      };

      Setup.findById.mockResolvedValueOnce(user);

      await updateAccount(req, res);

      expect(Setup.findById).toHaveBeenCalledWith(req.user._id);
      expect(user.fullName).toBe(req.body.fullName);
      expect(user.companyName).toBe(req.body.companyName);
      expect(user.address1).toBe(req.body.address1);
      expect(user.address2).toBe(req.body.address2);
      expect(user.city).toBe(req.body.city);
      expect(user.state).toBe(req.body.state);
      expect(user.country).toBe(req.body.country);
      expect(user.zip).toBe(req.body.zip);
      expect(user.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Account information updated successfully",
        user,
      });
    });

    test("should handle error when updating account information", async () => {
      const req = { user: { _id: "userId123" }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Setup.findById.mockRejectedValueOnce(new Error("Database error"));

      await updateAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "An error occurred while updating account information",
      });
    });
  });

  describe("updatePassword", () => {
    test("should update password", async () => {
      const req = {
        user: { _id: "userId123" },
        body: {
          currentPassword: "oldPassword123",
          newPassword: "newPassword123",
          confNewPassword: "newPassword123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const user = {
        _id: "userId123",
        password: "hashedOldPassword123",
        save: jest.fn(),
      };

      Setup.findById.mockResolvedValueOnce(user);
      bcrypt.compare.mockResolvedValueOnce(true);
      bcrypt.hash.mockResolvedValueOnce("hashedNewPassword123");

      await updatePassword(req, res);

      expect(Setup.findById).toHaveBeenCalledWith(req.user._id);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        req.body.currentPassword,
        user.password
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(req.body.newPassword, 10);
      expect(user.password).toBe("hashedNewPassword123");
      expect(user.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Password updated successfully",
      });
    });

    test("should handle error when updating password", async () => {
      const req = {
        user: { _id: "userId123" },
        body: {
          currentPassword: "oldPassword123",
          newPassword: "newPassword123",
          confNewPassword: "newPassword123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Setup.findById.mockRejectedValueOnce(new Error("Database error"));

      await updatePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "An error occurred while updating password",
      });
    });

    test("should handle incorrect current password", async () => {
      const req = {
        user: { _id: "userId123" },
        body: {
          currentPassword: "oldPassword123",
          newPassword: "newPassword123",
          confNewPassword: "newPassword123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const user = {
        _id: "userId123",
        password: "hashedOldPassword123",
      };

      Setup.findById.mockResolvedValueOnce(user);
      bcrypt.compare.mockResolvedValueOnce(false);

      await updatePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Current password is incorrect",
      });
    });
  });
});