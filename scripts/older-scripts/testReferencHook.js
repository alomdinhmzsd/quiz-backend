const mongoose = require('mongoose');
const Question = require('../models/Question');
require('dotenv').config();

async function testHook() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Test with array input
  const q1 = new Question({
    questionId: 'SAA-Q999',
    question: 'Test question',
    answers: [{ text: 'A', isCorrect: true, explanation: 'test' }],
    domain: 'Storage',
    reference: ['https://test1.com', 'https://test2.com'],
  });
  await q1.save();
  console.log('Array test:', q1.reference);

  // Test with string input
  const q2 = new Question({
    questionId: 'SAA-Q998',
    question: 'Test question 2',
    answers: [{ text: 'A', isCorrect: true, explanation: 'test' }],
    domain: 'Storage',
    reference: 'https://test3.com  \n\n  https://test4.com  ',
  });
  await q2.save();
  console.log('String test:', q2.reference);

  process.exit(0);
}

testHook().catch(console.error);
