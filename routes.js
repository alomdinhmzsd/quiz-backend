const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('./models/Question');

// GET all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ questionId: 1 });
    res.json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching questions',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// GET single question
router.get('/:id', async (req, res) => {
  try {
    let question;

    // Try by MongoDB ID first
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      question = await Question.findById(req.params.id)
        .select('+reference')
        .lean();
    }

    // If not found by ID, try by questionId
    if (!question) {
      question = await Question.findOne({
        questionId: { $regex: new RegExp(`^${req.params.id}$`, 'i') },
      })
        .select('+reference')
        .lean();
    }

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    // If reference is empty, try to find it from another version
    if (!question.reference) {
      const referenceQuestion = await Question.findOne({
        questionId: question.questionId,
        reference: { $exists: true, $ne: '' },
      }).select('reference');

      if (referenceQuestion) {
        question.reference = referenceQuestion.reference;
      }
    }

    res.json({
      success: true,
      data: question,
    });
  } catch (err) {
    console.error('Error fetching question:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// Export the router directly
module.exports = router;
