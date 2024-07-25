const express = require('express');

const dotenv = require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const cors = require('cors');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('common'));

app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});

module.exports = app;
