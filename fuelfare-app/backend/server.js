const express = require("express");
const connectToDB = require("./database");
const dotenv = require("dotenv").config();
PORT = 8080;
const authenticateToken = require("./middleware/authMiddleware");
connectToDB(process.env.MONGO_URL);

// initialize express app
const app = express();
app.use(express.json());

let cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: `Server is running on port ${PORT}` });
});

// Implement Routes Here

// Setup
const setupRouter = require("./routes/setupRoutes");
app.use("/setup", setupRouter);

// Login
const loginRouter = require("./routes/loginRoutes");
app.use("/login", loginRouter);

// New Quote
const newQuoteRouter = require("./routes/newQuoteRoutes");
app.use("/new", newQuoteRouter);

// View Quote
const quotesRoute = require("./routes/quoteRoutes");
app.use("/quotes", authenticateToken, quotesRoute);

// Update Account

// Start Server
app.listen(PORT, () => {
  console.log(`Connected to server on port ${PORT}.`);
});

module.exports = app;
process.env;
