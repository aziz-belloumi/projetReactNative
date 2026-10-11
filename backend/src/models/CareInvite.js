const mongoose = require('mongoose');

const careInviteSchema = new mongoose.Schema(
  {
    codeHash: { type: String, required: true, unique: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true },
);

module.exports = mongoose.model('CareInvite', careInviteSchema);
