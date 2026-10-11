const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    startsAt: { type: Date, required: true },
    location: { type: String, trim: true, maxlength: 160, default: '' },
    notes: { type: String, trim: true, maxlength: 500, default: '' },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

appointmentSchema.set('toJSON', {
  virtuals: true,
  transform(_document, result) {
    delete result._id;
    delete result.__v;
    return result;
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
