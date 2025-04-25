require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionRouter = require('./routes'); // Changed from questionRoutes to questionRouter

const app = express();

const allowedOrigins = [
  'https://quiz.padmin-awslabs.link',
  'http://localhost:5173', // Vite dev
  'http://localhost:4005', // CRA fallback
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ CORS rejected: ${origin}`);
        callback(new Error(`CORS not allowed from origin: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Enhanced MongoDB connection
mongoose.set('strictQuery', true);

const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => console.log('✅ MongoDB connection established'))
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      console.log('⏳ Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Connection events
mongoose.connection.on('connected', () => {
  console.log('📊 MongoDB models:', mongoose.modelNames());
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes - Now using questionRouter directly
app.use('/api/questions', questionRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    dbState: mongoose.connection.readyState,
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

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 MongoDB URI: ${process.env.MONGODB_URI}`);
  console.log(
    `🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:4005'}`
  );
});
