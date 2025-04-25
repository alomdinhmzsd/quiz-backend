// scripts/convertReferences.js
require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

async function convertReferences() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const collection = mongoose.connection.db.collection('questions');

    // 1. Find all questions with array references
    const questions = await collection
      .find({
        reference: { $type: 'array' },
      })
      .toArray();

    // 2. Prepare bulk operations
    const bulkOps = questions.map((q) => ({
      updateOne: {
        filter: { _id: q._id },
        update: {
          $set: {
            reference: q.reference.join('\n\n'), // Convert array to newline-separated string
          },
          $unset: { references: '' }, // Remove old array field if exists
        },
      },
    }));

    // 3. Execute updates
    if (bulkOps.length > 0) {
      const result = await collection.bulkWrite(bulkOps);
      console.log(`✅ Updated ${result.modifiedCount} questions`);
      console.log(
        `Example converted reference:\n"${questions[0].reference.join('\n\n')}"`
      );
    } else {
      console.log('No array references found to convert');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

convertReferences();
