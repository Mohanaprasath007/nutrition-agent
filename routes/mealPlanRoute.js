// routes/mealPlanRoute.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// POST /api/generate-plan
router.post('/generate-plan', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt required' });

  try {
    const response = await axios.post(
      'https://us-south.ml.cloud.ibm.com/ml/v1/text/generation',
      {
        model_id: process.env.MODEL_ID, // e.g., granite-3-3-8b-instruct
        input: prompt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    const aiResponse = response.data.generated_text || 'No response.';
    res.json({ output: aiResponse });

  } catch (error) {
    console.error('⚠️ Watson API error:', error.message);
    res.status(500).json({ output: 'Error generating response.' });
  }
});

module.exports = router;
