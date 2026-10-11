require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const required = ['MONGODB_URI', 'JWT_SECRET'];
for (const key of required) {
  if (!process.env[key]) throw new Error(`${key} must be set in backend/.env.`);
}
if (process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must contain at least 32 characters.');
}

const port = Number(process.env.PORT || 4000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be a valid TCP port.');
}

const start = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Wellnest API listening on port ${port}.`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received; closing the API.`);
    server.close(async (error) => {
      await mongoose.disconnect();
      if (error) {
        console.error(error);
        process.exitCode = 1;
      }
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

start().catch((error) => {
  console.error('Unable to start the Wellnest API:', error.message);
  process.exitCode = 1;
});
