import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { rows } = await pool.query(
      'SELECT id, title, excerpt, category, tags, image_url, published_at, read_time, author FROM articles WHERE published = true ORDER BY published_at DESC'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('PG ERROR (GET /api/articles):', error);
    res.status(500).json({ error: error.message, details: error });
  }
}
