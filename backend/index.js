require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherRouter = require('./routes/weatherRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: true,
        message: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: true,
        message: 'Resource not found',
        path: req.originalUrl
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});