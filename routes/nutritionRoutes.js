const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');

// POST /api/nutrition/track — Save user nutrition entry
router.post('/track', async (req, res) => {
  try {
    const { email, age, weight, height, gender, goal, dietType, bmi, calories } = req.body;

    const prompt = `Create a ${dietType} meal plan for a ${age}-year-old ${gender} who weighs ${weight}kg and is ${height}cm tall with a goal to ${goal}. BMI: ${bmi}, Calories: ${calories}`;

    const entry = new UserProgress({
      email,
      age,
      weight,
      height,
      gender,
      goal,
      dietType,
      bmi,
      calories,
      mealPlan: prompt // Replace this with AI-generated output if needed
    });

    await entry.save();
    res.status(201).json({ message: 'Progress saved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error while saving progress' });
  }
});

// GET /api/nutrition/history/:email — Get user history
router.get('/history/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const history = await UserProgress.find({ email }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

module.exports = router;
