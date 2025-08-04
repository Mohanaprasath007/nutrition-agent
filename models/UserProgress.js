const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  email: { type: String, required: true }, // 👈 Using email as ID
  date: { type: Date, default: Date.now },
  age: Number,
  weight: Number,
  height: Number,
  gender: String,
  goal: String,
  dietType: String,
  bmi: Number,
  calories: Number,
  mealPlan: String
});

module.exports = mongoose.model('UserProgress', userProgressSchema);
