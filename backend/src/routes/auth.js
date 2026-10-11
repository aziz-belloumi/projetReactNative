const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ApiError, asyncHandler } = require('../errors');
const { authenticate } = require('../middleware/authenticate');
const { loginSchema, registerSchema } = require('../validation');

const router = express.Router();

const issueSession = (user) => ({
  accessToken: jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' }),
  user,
});

router.post('/register', asyncHandler(async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, parsed.error.issues[0].message);

  const { name, email, password, role } = parsed.data;
  const normalizedEmail = email.toLowerCase();
  if (await User.exists({ email: normalizedEmail })) {
    throw new ApiError(409, 'An account with that email already exists.');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email: normalizedEmail, passwordHash, role });
  res.status(201).json(issueSession(user));
}));

router.post('/login', asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, 'Enter a valid email address and password.');

  const user = await User.findOne({ email: parsed.data.email.toLowerCase() }).select('+passwordHash');
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    throw new ApiError(401, 'Email or password is incorrect.');
  }

  res.json(issueSession(user));
}));

router.get('/me', authenticate, (req, res) => res.json({ user: req.user }));

module.exports = router;
