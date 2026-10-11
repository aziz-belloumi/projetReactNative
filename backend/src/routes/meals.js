const express = require('express');
const MealLog = require('../models/MealLog');
const { ApiError, asyncHandler } = require('../errors');
const { authenticate, requireRole } = require('../middleware/authenticate');
const { accessiblePatientIds } = require('../middleware/records');
const { mealSchema } = require('../validation');

const router = express.Router();
router.use(authenticate);

router.get('/', asyncHandler(async (req, res) => {
  const patientIds = await accessiblePatientIds(req);
  const meals = await MealLog.find({ patient: { $in: patientIds } }).sort({ loggedAt: -1 }).limit(100);
  res.json({ meals });
}));

router.post('/', requireRole('patient'), asyncHandler(async (req, res) => {
  const parsed = mealSchema.safeParse(req.body);
  if (!parsed.success) throw new ApiError(400, parsed.error.issues[0].message);
  const meal = await MealLog.create({ ...parsed.data, patient: req.user._id });
  res.status(201).json({ meal });
}));

router.delete('/:id', requireRole('patient'), asyncHandler(async (req, res) => {
  const result = await MealLog.deleteOne({ _id: req.params.id, patient: req.user._id });
  if (!result.deletedCount) throw new ApiError(404, 'Meal log not found.');
  res.status(204).end();
}));

module.exports = router;
