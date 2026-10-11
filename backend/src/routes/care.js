const crypto = require('node:crypto');
const express = require('express');
const CareInvite = require('../models/CareInvite');
const CareLink = require('../models/CareLink');
const User = require('../models/User');
const { ApiError, asyncHandler } = require('../errors');
const { authenticate, requireRole } = require('../middleware/authenticate');
const { inviteSchema } = require('../validation');

const router = express.Router();
const hashCode = (code) => crypto.createHash('sha256').update(code.toUpperCase()).digest('hex');

router.use(authenticate);

router.get('/links', asyncHandler(async (req, res) => {
  const field = req.user.role === 'patient' ? 'patient' : 'companion';
  const target = req.user.role === 'patient' ? 'companion' : 'patient';
  const links = await CareLink.find({ [field]: req.user._id })
    .populate(target, 'name email role')
    .sort({ createdAt: -1 });
  res.json({ links });
}));

router.post('/invitations', requireRole('patient'), asyncHandler(async (req, res) => {
  const code = crypto.randomBytes(6).toString('hex').toUpperCase();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await CareInvite.deleteMany({ patient: req.user._id });
  await CareInvite.create({ codeHash: hashCode(code), patient: req.user._id, expiresAt });
  res.status(201).json({ code, expiresAt });
}));

router.post('/accept', requireRole('companion'), asyncHandler(async (req, res) => {
  const parsed = inviteSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, 'Enter a valid invitation code.');

  const invitation = await CareInvite.findOneAndDelete({
    codeHash: hashCode(parsed.data.code),
    expiresAt: { $gt: new Date() },
  });
  if (!invitation) throw new ApiError(404, 'That invitation is invalid or has expired.');
  if (String(invitation.patient) === String(req.user._id)) {
    throw new ApiError(400, 'You cannot accept your own invitation.');
  }

  await CareLink.create({ patient: invitation.patient, companion: req.user._id });
  res.status(201).json({ message: 'Care connection created.' });
}));

router.delete('/links/:userId', asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const filter = req.user.role === 'patient'
    ? { patient: req.user._id, companion: userId }
    : { companion: req.user._id, patient: userId };
  const result = await CareLink.deleteOne(filter);
  if (!result.deletedCount) throw new ApiError(404, 'That care connection was not found.');
  res.status(204).end();
}));

router.get('/patients', requireRole('companion'), asyncHandler(async (req, res) => {
  const links = await CareLink.find({ companion: req.user._id }).select('patient').lean();
  const patients = await User.find({ _id: { $in: links.map((link) => link.patient) } }).select('name email');
  res.json({ patients });
}));

module.exports = router;
