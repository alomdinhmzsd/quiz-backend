const express = require('express');
const {
  validateAnswers,
  submitAnswers,
} = require('../controllers/answerController');

const router = express.Router();
router.post('/submit', validateAnswers, submitAnswers); // Updated route

module.exports = router;
