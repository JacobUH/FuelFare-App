const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log("Initial Token from Request:", token);

    if (!token) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ error: "Invalid token" });
      }

      if (!decoded || !decoded.userId) {
        // Check for userId property
        console.error("Invalid token payload:", decoded);
        return res.status(401).json({ error: "Invalid token payload" });
      }

      console.log("Decoded user ID:", decoded.userId);
      req.user = { _id: decoded.userId }; // Set user information on req.user
      next();
    });
  } catch (error) {
    console.error("Error handling token:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authenticateToken;
