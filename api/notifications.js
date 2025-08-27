import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM notifications ORDER BY sent_at DESC');
      res.status(200).json(rows);
    } catch (error) {
      console.error('PG ERROR:', error);
      res.status(500).json({ error: error.message, details: error });
    }
    return;
  }

  if (req.method === 'POST') {
    const { user_email, message } = req.body;
    if (!user_email || !message) {
      res.status(400).json({ error: 'Missing user_email or message' });
      return;
    }
    try {
      const { rows } = await pool.query(
        'INSERT INTO notifications (user_email, message) VALUES ($1, $2) RETURNING *',
        [user_email, message]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error('PG ERROR:', error);
      res.status(500).json({ error: error.message, details: error });
    }
    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}
