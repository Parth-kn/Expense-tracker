const { getDb } = require('../Shared/db');
const { randomUUID } = require('crypto');

module.exports = async function (context, req) {
  try {
    const body = req.body || {};
    const { amount, category, date, note } = body;
    if (!(amount && category && date)) {
      context.res = { status: 400, body: 'Missing required fields: amount, category, date' }; return;
    }

    const userId = req.headers['x-ms-client-principal-id'] || req.query.userId || 'demo';

    const db = await getDb();
    const col = db.collection('expenses');
    const doc = {
      _id: randomUUID(), userId,
      amount: Number(amount), category, date,
      note: note || '',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    };
    await col.insertOne(doc);
    context.res = { status: 201, body: doc };
  } catch (err) {
    context.log.error(err);
    context.res = { status: 500, body: 'Server error' };
  }
}
