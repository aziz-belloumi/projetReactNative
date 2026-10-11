class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

const notFound = (req, res, next) =>
  next(new ApiError(404, `No route for ${req.method} ${req.path}.`));

const errorHandler = (error, _req, res, _next) => {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ error: 'The submitted data is invalid.' });
  }

  if (error.code === 11000) {
    return res.status(409).json({ error: 'That account or relationship already exists.' });
  }

  if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Your session is invalid or expired. Please sign in again.' });
  }

  const status = Number.isInteger(error.status) ? error.status : 500;
  if (status >= 500) {
    console.error(error);
  }

  return res.status(status).json({
    error: status >= 500 ? 'Something went wrong. Please try again.' : error.message,
  });
};

module.exports = { ApiError, asyncHandler, errorHandler, notFound };
