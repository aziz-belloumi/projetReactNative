const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./errors');
const authRoutes = require('./routes/auth');
const careRoutes = require('./routes/care');
const appointmentRoutes = require('./routes/appointments');
const mealRoutes = require('./routes/meals');
const reminderRoutes = require('./routes/reminders');

const app = express();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN === '*'
    ? '*'
    : (process.env.CORS_ORIGIN || '').split(',').filter(Boolean),
}));
app.use(express.json({ limit: '16kb' }));

app.get('/api/health', (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'degraded',
    database: connected ? 'connected' : 'disconnected',
  });
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/care', careRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
