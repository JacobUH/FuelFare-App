const express = require('express');

const app = express();
app.use(express.json());
const port = process.env.PORT || 5001;

let cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({"message": `Server is running on port ${port}`});
});

// Implement Routes Here (uncomment when implemented) //

// const accountRouter = require('./routes/accountRoutes');
// app.use('', accountRouter);

// const authorizationRouter = require('./routes/authRoutes');
// app.use('', authorizationRouter);

// const quoteRouter = require('./routes/quoteRoutes');
// app.use('', quoteRouter);

// const signInRouter = require('./routes/signInRoutes');
// app.use('', signInRouter);

// const signUpRouter = require('./routes/signUpRoutes');
// app.use('', signUpRouter);

// Start Server
app.listen(port, () => {
    console.log(`Connected to server on port ${port}.`);
});