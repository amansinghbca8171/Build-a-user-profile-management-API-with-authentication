const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./utils/errorHandler');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

app.use('/api/auth', authRoutes);

app.use(errorHandler);

module.exports = app;