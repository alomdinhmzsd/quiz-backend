// scripts/backfillReferences.js
require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

async function backfillReferences() {
  try {
    console.log('Starting reference backfill...');
    await mongoose.connect(process.env.MONGODB_URI);

    // Get raw MongoDB collection to bypass Mongoose
    const collection = mongoose.connection.db.collection('questions');

    // Find all questions needing references
    const questionsNeedingRefs = await collection
      .find({
        $or: [
          { reference: { $exists: false } },
          { reference: null },
          { reference: '' },
          { $where: 'Array.isArray(this.reference)' },
        ],
      })
      .toArray();

    console.log(
      `Found ${questionsNeedingRefs.length} questions needing references`
    );

    // Find all questions that have valid references
    const referenceSources = await collection
      .aggregate([
        {
          $match: {
            $and: [
              { reference: { $exists: true } },
              { reference: { $ne: null } },
              { reference: { $ne: '' } },
              { $where: '!Array.isArray(this.reference)' },
            ],
          },
        },
        {
          $group: {
            _id: '$questionId',
            reference: { $first: '$reference' },
          },
        },
      ])
      .toArray();

    console.log(`Found ${referenceSources.length} reference sources`);

    // Create bulk operations
    const bulkOps = referenceSources.map(({ _id: questionId, reference }) => ({
      updateMany: {
        filter: {
          questionId: questionId,
          $or: [
            { reference: { $exists: false } },
            { reference: null },
            { reference: '' },
            { $where: 'Array.isArray(this.reference)' },
          ],
        },
        update: {
          $set: { reference: reference },
          $unset: { references: '' }, // Remove old array field if it exists
        },
      },
    }));

    if (bulkOps.length > 0) {
      const result = await collection.bulkWrite(bulkOps);
      console.log(`\n✅ Completed! Results:`);
      console.log(`- Updated ${result.modifiedCount} questions`);
      console.log(`- Matched ${result.matchedCount} questions`);
    } else {
      console.log('No references to backfill');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

backfillReferences();
