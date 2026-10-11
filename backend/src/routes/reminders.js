const express = require('express');
const Reminder = require('../models/Reminder');
const { ApiError, asyncHandler } = require('../errors');
const { authenticate, requireRole } = require('../middleware/authenticate');
const { accessiblePatientIds } = require('../middleware/records');
const { patientIdSchema, reminderSchema } = require('../validation');

const router = express.Router();
router.use(authenticate);

router.get('/', asyncHandler(async (req, res) => {
  const patientIds = await accessiblePatientIds(req);
  const reminders = await Reminder.find({ patient: { $in: patientIds } }).sort({ dueAt: 1 }).limit(200);
  res.json({ reminders });
}));

router.post('/', requireRole('patient'), asyncHandler(async (req, res) => {
  const parsed = reminderSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, parsed.error.issues[0].message);
  const reminder = await Reminder.create({ ...parsed.data, patient: req.user._id });
  res.status(201).json({ reminder });
}));

router.patch('/:id', requireRole('patient'), asyncHandler(async (req, res) => {
  const parsed = reminderSchema.partial().safeParse(req.body);
  if (!parsed.success || Object.keys(req.body).length === 0) {
    throw new ApiError(400, 'Provide valid reminder fields to update.');
  }

  const reminder = await Reminder.findOneAndUpdate(
    { _id: req.params.id, patient: req.user._id },
    { $set: parsed.data },
    { new: true, runValidators: true },
  );
  if (!reminder) throw new ApiError(404, 'Reminder not found.');
  res.json({ reminder });
}));

router.delete('/:id', requireRole('patient'), asyncHandler(async (req, res) => {
  const parsedId = patientIdSchema.safeParse(req.params.id);
  if (!parsedId.success) throw new ApiError(400, 'Reminder id is invalid.');
  const result = await Reminder.deleteOne({ _id: parsedId.data, patient: req.user._id });
  if (!result.deletedCount) throw new ApiError(404, 'Reminder not found.');
  res.status(204).end();
}));

module.exports = router;
