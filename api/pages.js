import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const { slug } = req.query;

  if (req.method === 'GET') {
    if (!slug) {
      res.status(400).json({ error: 'Missing page slug' });
      return;
    }
    try {
      const { rows } = await pool.query('SELECT * FROM pages WHERE slug = $1', [slug]);
      if (rows.length === 0) {
        res.status(404).json({ error: 'Page not found' });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      console.error('PG ERROR:', error);
      res.status(500).json({ error: error.message, details: error });
    }
    return;
  }

  if (req.method === 'PUT') {
    if (!slug) {
      res.status(400).json({ error: 'Missing page slug' });
      return;
    }
    const { title, content } = req.body;
    try {
      const { rows } = await pool.query(
        `UPDATE pages SET
          title = COALESCE($2, title),
          content = COALESCE($3, content),
          updated_at = NOW()
        WHERE slug = $1 RETURNING *`,
        [slug, title, content]
      );
      if (rows.length === 0) {
        res.status(404).json({ error: 'Page not found' });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      console.error('PG ERROR:', error);
      res.status(500).json({ error: error.message, details: error });
    }
    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}
