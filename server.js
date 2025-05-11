/**
 * server.js - Backend Server Configuration
 *
 * This is the main entry point for the backend server. It handles:
 * - Express application setup
 * - MongoDB connection with retry logic
 * - CORS configuration
 * - Middleware setup
 * - Route mounting
 * - Error handling
 * - Server startup
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionRouter = require('./routes'); // Main question routes

// Initialize Express application
const app = express();

// Configure allowed origins for CORS
const allowedOrigins = [
  'https://quiz.padmin-awslabs.link', // Production
  'http://localhost:5173', // Vite dev server
  'http://localhost:4005', // Create React App fallback
  'http://localhost:4006', // ✅ <--- Add this line
  'https://dashing-kitten-457dd1.netlify.app', // Add this line
];

// CORS middleware configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ CORS rejected: ${origin}`);
        callback(new Error(`CORS not allowed from origin: ${origin}`));
      }
    },
    credentials: true, // Allow credentials/cookies
  })
);

// Body parsing middleware with increased limit for large requests
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection setup with retry logic
mongoose.set('strictQuery', true); // Prepare for Mongoose 7 change

/**
 * Establishes MongoDB connection with automatic retry on failure
 */
const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => console.log('✅ MongoDB connection established'))
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      console.log('⏳ Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

// Start initial connection attempt
connectWithRetry();

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('📊 MongoDB models:', mongoose.modelNames()); // Log registered models
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Mount question routes
app.use('/api/questions', questionRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    dbState: mongoose.connection.readyState, // 1 = connected
    dbName: mongoose.connection.name,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start the server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 MongoDB URI: ${process.env.MONGODB_URI}`);
  console.log(
    `🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:4006'}`
  );
});
