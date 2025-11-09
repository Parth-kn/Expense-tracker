const { getDb } = require('../Shared/db');

module.exports = async function (context, req) {
  try {
    const db = await getDb();
    const col = db.collection('expenses');

    const month = req.query.month; // YYYY-MM
    let filter = {};
    if (month) {
      // date stored as YYYY-MM-DD strings, filter by prefix
      filter.date = { $regex: `^${month}` };
    }
    // Mini project: multi-user auth optional; keep a demo user if provided
    const userId = req.headers['x-ms-client-principal-id'] || req.query.userId || 'demo';
    filter.userId = userId;

    const items = await col.find(filter).sort({ date: -1 }).toArray();
    context.res = { status: 200, body: items };
  } catch (err) {
    context.log.error(err);
    context.res = { status: 500, body: 'Server error' };
  }
}
