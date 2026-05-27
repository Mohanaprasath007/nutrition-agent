// app.js

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database Connection
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/auth');
const aiRoute = require('./routes/aiRoute');
const mealPlanRoute = require('./routes/mealPlanRoute');
const nutritionRoutes = require('./routes/nutritionRoutes');

// Initialize Express App
const app = express();

// Check required environment variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('❌ MONGO_URI or JWT_SECRET is missing in .env file');
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', aiRoute);
app.use('/api/plan', mealPlanRoute);
app.use('/api/nutrition', nutritionRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('🍽️ Nutrition Assistant API is running...');
});

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});