// File: routes/aiRoute.js
const express = require('express');
const router = express.Router();
const { IamAuthenticator } = require('ibm-watson/auth');
const AssistantV2 = require('ibm-watson/assistant/v2');
require('dotenv').config();

// Log for debugging
console.log('🔍 Environment Config:');
console.log('WATSON_URL:', process.env.WATSON_URL);
console.log('ASSISTANT_ID:', process.env.ASSISTANT_ID);
console.log('WATSON_API_KEY:', process.env.WATSON_API_KEY?.slice(0, 5) + '...');

// Validate .env config
if (!process.env.WATSON_URL || !process.env.ASSISTANT_ID || !process.env.WATSON_API_KEY) {
  throw new Error('❌ Missing required .env variables (WATSON_URL, ASSISTANT_ID, WATSON_API_KEY)');
}

// Setup Watson Assistant
const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_API_KEY,
  }),
  serviceUrl: process.env.WATSON_URL,
});

// Session handler
let sessionId = null;

const getSession = async () => {
  if (!sessionId) {
    try {
      const session = await assistant.createSession({
        assistantId: process.env.ASSISTANT_ID,
      });
      sessionId = session.result.session_id;
      console.log('✅ Watson Assistant session created:', sessionId);
    } catch (err) {
      console.error('❌ Failed to create Watson session:', err);
      throw err;
    }
  }
};

// POST: /api/nutrition-chat
router.post('/nutrition-chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ output: '❗ Please enter a message.' });
  }

  try {
    await getSession(); // Create/reuse session

    const response = await assistant.message({
      assistantId: process.env.ASSISTANT_ID,
      sessionId,
      input: {
        message_type: 'text',
        text: prompt,
      },
    });

    const output =
      response.result.output.generic?.map((m) => m.text).join('\n') ||
      '🤖 No response. Please try asking something else.';

    res.json({ output });

  } catch (err) {
    console.error('❌ Watson Assistant Error:', err);

    // Reset session if expired or unauthorized
    if (err.code === 404 || err.code === 401) sessionId = null;

    res.status(500).json({
      output: '⚠️ Error fetching AI response. Check server logs or Watson credentials.',
    });
  }
});

module.exports = router;
