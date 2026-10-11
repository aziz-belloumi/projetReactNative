const express = require('express');
const Appointment = require('../models/Appointment');
const { ApiError, asyncHandler } = require('../errors');
const { authenticate, requireRole } = require('../middleware/authenticate');
const { accessiblePatientIds } = require('../middleware/records');
const { appointmentSchema, patientIdSchema } = require('../validation');

const router = express.Router();
router.use(authenticate);

router.get('/', asyncHandler(async (req, res) => {
  const patientIds = await accessiblePatientIds(req);
  const appointments = await Appointment.find({ patient: { $in: patientIds } })
    .sort({ startsAt: 1 })
    .limit(200);
  res.json({ appointments });
}));

router.post('/', requireRole('patient'), asyncHandler(async (req, res) => {
  const parsed = appointmentSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, parsed.error.issues[0].message);
  const appointment = await Appointment.create({ ...parsed.data, patient: req.user._id });
  res.status(201).json({ appointment });
}));

router.patch('/:id', requireRole('patient'), asyncHandler(async (req, res) => {
  const parsed = appointmentSchema.partial().safeParse(req.body);
  if (!parsed.success || Object.keys(req.body).length === 0) {
    throw new ApiError(400, 'Provide valid appointment fields to update.');
  }
  const appointment = await Appointment.findOneAndUpdate(
    { _id: req.params.id, patient: req.user._id },
    { $set: parsed.data },
    { new: true, runValidators: true },
  );
  if (!appointment) throw new ApiError(404, 'Appointment not found.');
  res.json({ appointment });
}));

router.delete('/:id', requireRole('patient'), asyncHandler(async (req, res) => {
  const parsedId = patientIdSchema.safeParse(req.params.id);
  if (!parsedId.success) throw new ApiError(400, 'Appointment id is invalid.');
  const result = await Appointment.deleteOne({ _id: parsedId.data, patient: req.user._id });
  if (!result.deletedCount) throw new ApiError(404, 'Appointment not found.');
  res.status(204).end();
}));

module.exports = router;
