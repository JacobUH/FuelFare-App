const express = require("express");
const connectToDB = require("./database");
const dotenv = require("dotenv").config();
PORT = 8080;

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

// Sign Up
const signUpRouter = require("./routes/signUpRoutes");
app.use("/signup", signUpRouter);

// New Quote
const newQuoteRouter = require("./routes/newQuoteRoutes");
app.use("/new", newQuoteRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Connected to server on port ${PORT}.`);
});

module.exports = app;
process.env;
