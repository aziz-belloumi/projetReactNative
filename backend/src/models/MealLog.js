const mongoose = require('mongoose');

const mealLogSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    mealType: { type: String, required: true, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
    foods: {
      type: [
        {
          name: { type: String, required: true, trim: true, maxlength: 120 },
          sugarInfo: { type: String, required: true, trim: true, maxlength: 24 },
          _id: false,
        },
      ],
      validate: [(foods) => foods.length > 0 && foods.length <= 30, 'Choose between 1 and 30 foods.'],
      required: true,
    },
    loggedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

mealLogSchema.set('toJSON', {
  virtuals: true,
  transform(_document, result) {
    delete result._id;
    delete result.__v;
    return result;
  },
});

module.exports = mongoose.model('MealLog', mealLogSchema);
