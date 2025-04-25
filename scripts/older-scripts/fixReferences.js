const mongoose = require('mongoose');
const Question = require('../models/Question');
require('dotenv').config();

async function fixReferences() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Find all questions with array references
  const questions = await Question.find({
    $where: 'Array.isArray(this.reference)',
  });

  console.log(`Found ${questions.length} questions to update`);

  for (const q of questions) {
    q.reference = q.reference.join('\n\n');
    await q.save();
    console.log(`Updated ${q.questionId}`);
  }

  console.log('✅ All references fixed!');
  process.exit();
}

fixReferences().catch(console.error);
