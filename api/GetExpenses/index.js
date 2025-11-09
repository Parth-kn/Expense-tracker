const { getDb } = require('../Shared/db');

module.exports = async function (context, req) {
  try {
    try {
  context.log('Connecting to DB...');
  const db = await getDb();
  context.log('Got DB...');
  const col = db.collection('expenses');

  const month = req.query.month;
  let filter = {};
  context.log('Month param:', month);

  if (month) {
    filter.date = { $regex: `^${month}` };
    context.log('Filter prepared:', filter);
  }

  const userId = req.headers['x-ms-client-principal-id'] || req.query.userId || 'demo';
  filter.userId = userId;
  context.log('User ID:', userId);

  context.log('Running DB query:', filter);

  const items = await col.find(filter).sort({ date: -1 }).toArray();
  context.log('DB query done. Items found:', items.length);

  context.res = { status: 200, body: items };
}

  } catch (err) {
  context.log.error('Function error:', err);
  context.res = {
    status: 500,
    body: `Function error: ${err.message}\n${err.stack}`
  };
}
