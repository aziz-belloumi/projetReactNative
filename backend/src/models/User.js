const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, required: true, enum: ['patient', 'companion'] },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

userSchema.set('toJSON', {
  virtuals: true,
  transform(_document, result) {
    delete result._id;
    delete result.__v;
    delete result.passwordHash;
    return result;
  },
});

module.exports = mongoose.model('User', userSchema);
