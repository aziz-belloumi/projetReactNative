const CareLink = require('../models/CareLink');
const { ApiError } = require('../errors');
const { patientIdSchema } = require('../validation');

const accessiblePatientIds = async (req) => {
  if (req.user.role === 'patient') {
    if (req.query.patientId && req.query.patientId !== String(req.user.id)) {
      throw new ApiError(403, 'You can only view your own care records.');
    }
    return [req.user._id];
  }

  const links = await CareLink.find({ companion: req.user._id }).select('patient').lean();
  const linkedIds = links.map((link) => String(link.patient));

  if (!req.query.patientId) {
    return links.map((link) => link.patient);
  }

  const parsed = patientIdSchema.safeParse(req.query.patientId);
  if (!parsed.success) throw new ApiError(400, 'The patient id is invalid.');
  if (!linkedIds.includes(parsed.data)) throw new ApiError(403, 'This patient has not shared their care with you.');
  return [parsed.data];
};

module.exports = { accessiblePatientIds };
