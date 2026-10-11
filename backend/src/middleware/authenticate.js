const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ApiError, asyncHandler } = require('../errors');

const authenticate = asyncHandler(async (req, _res, next) => {
  const authorization = req.get('authorization');
  const match = authorization && authorization.match(/^Bearer (.+)$/i);
  if (!match) throw new ApiError(401, 'Sign in to continue.');

  const payload = jwt.verify(match[1], process.env.JWT_SECRET);
  const user = await User.findById(payload.sub);
  if (!user) throw new ApiError(401, 'Your account is no longer available.');

  req.user = user;
  next();
});

const requireRole = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action.'));
  }
  return next();
};

module.exports = { authenticate, requireRole };
