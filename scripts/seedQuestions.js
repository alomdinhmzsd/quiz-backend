require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Question = require('../models/Question');

const filePath = path.join(__dirname, '../../questions.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const questions = JSON.parse(rawData);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Atlas connected');

    await Question.deleteMany({});
    console.log('🧹 Cleared existing questions');

    const result = await Question.insertMany(questions);
    console.log(`✅ Inserted ${result.length} new questions`);

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
    mongoose.disconnect();
  });
