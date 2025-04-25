const { v4: uuidv4 } = require('uuid');

// Add this validation middleware
exports.validateAnswers = (req, res, next) => {
  const { answers } = req.body;

  // Check for duplicate content
  const contents = answers.map((a) => a.content);
  if (new Set(contents).size !== contents.length) {
    return res.status(400).json({
      error: 'Duplicate answer content detected',
      duplicates: contents.filter(
        (item, index) => contents.indexOf(item) !== index
      ),
    });
  }

  // Add unique IDs if missing
  req.body.answers = answers.map((a) => ({
    ...a,
    uniqueId: a.uniqueId || uuidv4(),
  }));

  next();
};

// Update your answer submission handler
exports.submitAnswers = async (req, res) => {
  try {
    const { questionId, answers } = req.body;

    // Ensure full text comparison
    const question = await Question.findById(questionId);
    const correctAnswers = question.answers.filter((a) => a.isCorrect);

    const isCorrect = correctAnswers.every((correctAns) =>
      answers.some(
        (submittedAns) =>
          submittedAns.content.trim().toLowerCase() ===
          correctAns.text.trim().toLowerCase()
      )
    );

    res.json({
      isCorrect,
      explanation: question.explanation,
    });
  } catch (error) {
    res.status(500).json({ error: 'Validation failed' });
  }
};
