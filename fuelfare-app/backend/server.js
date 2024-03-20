const express = require('express');

const app = express();
app.use(express.json());
const port = 5000;

let cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({"message": `Server is running on port ${port}`});
});