const mongoose = require('mongoose');

const careLinkSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companion: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

careLinkSchema.index({ patient: 1, companion: 1 }, { unique: true });

module.exports = mongoose.model('CareLink', careLinkSchema);
