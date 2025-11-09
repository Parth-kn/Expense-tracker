const { MongoClient } = require('mongodb');

let client;
async function getDb() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_CONN);
  }
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  return client.db('expense-db');
}

module.exports = { getDb };
