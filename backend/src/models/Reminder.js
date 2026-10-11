const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    dueAt: { type: Date, required: true },
    note: { type: String, trim: true, maxlength: 500, default: '' },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

reminderSchema.set('toJSON', {
  virtuals: true,
  transform(_document, result) {
    delete result._id;
    delete result.__v;
    return result;
  },
});

module.exports = mongoose.model('Reminder', reminderSchema);
