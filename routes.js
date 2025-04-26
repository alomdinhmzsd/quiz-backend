/**
 * routes.js - API Route Definitions
 *
 * Contains all question-related API routes:
 * - GET all questions
 * - GET single question by ID or questionId
 *
 * Features:
 * - Flexible question lookup (by MongoDB _id or questionId)
 * - Reference fallback logic
 * - Comprehensive error handling
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('./models/Question');

/**
 * GET /api/questions
 * Returns all questions sorted by questionId
 */
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

/**
 * GET /api/questions/:id
 * Returns a single question by:
 * - MongoDB _id
 * - questionId (case-insensitive)
 *
 * Also attempts to find reference from other versions if missing
 */
router.get('/:id', async (req, res) => {
  try {
    let question;

    // First try to find by MongoDB ID
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      question = await Question.findById(req.params.id)
        .select('+reference') // Explicitly include reference
        .lean(); // Return plain JS object
    }

    // If not found by ID, try by questionId (case-insensitive)
    if (!question) {
      question = await Question.findOne({
        questionId: { $regex: new RegExp(`^${req.params.id}$`, 'i') },
      })
        .select('+reference')
        .lean();
    }

    // Return 404 if question not found
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    // If reference is missing, try to find it from another version
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

module.exports = router;
