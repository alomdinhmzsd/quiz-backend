// scripts/migrate-schema.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

async function migrateQuestions() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const questionsCollection = db.collection('questions'); // Assuming collection name is 'questions'

    // First count the documents to migrate
    const count = await questionsCollection.countDocuments();
    console.log(`Found ${count} questions to update`);

    // Update all questions (max 85 in your case)
    const result = await questionsCollection.updateMany(
      {}, // Empty filter matches all documents
      {
        $set: {
          image: null,
          reference: null,
          domain: null,
        },
      }
    );

    console.log(`Successfully updated ${result.modifiedCount} questions`);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await client.close();
    console.log('Migration completed - connection closed');
  }
}

// Execute
migrateQuestions();
