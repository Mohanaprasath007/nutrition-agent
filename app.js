// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');


// Load .env variables
dotenv.config();

// Check environment variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('❌ MONGO_URI or JWT_SECRET is missing in .env file');
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Import Routes
const authRoutes = require('./routes/auth');                  // 🔐 Auth: login/signup/logout
const aiRoute = require('./routes/aiRoute');                 // 🤖 Watson Assistant
const mealPlanRoute = require('./routes/mealPlanRoute');     // 🍱 AI meal plan (Granite)
const nutritionRoutes = require('./routes/nutritionRoutes'); // 📊 User nutrition tracking

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', aiRoute);
app.use('/api/plan', mealPlanRoute);
app.use('/api/nutrition', nutritionRoutes); // ✅ Added nutrition route

// Test Base Route
app.get('/', (req, res) => {
  res.send('🍽️ Nutrition Assistant API is running...');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(5000, () => console.log('🚀 Server running at http://localhost:5000'));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});
