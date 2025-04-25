// copy-database.js
const { MongoClient } = require('mongodb');

async function copyDatabase() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();

  const source = client.db('saa-exam-bank');
  const target = client.db('exam-saa3-2nd-bank');

  const collections = await source.listCollections().toArray();

  for (const { name } of collections) {
    if (!name.startsWith('system.')) {
      const docs = await source.collection(name).find().toArray();
      if (docs.length > 0) {
        await target.collection(name).insertMany(docs);
      }
    }
  }

  console.log(`Copied ${collections.length} collections`);
  await client.close();
}

copyDatabase();
