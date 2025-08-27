import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      title, content, excerpt, category, tags, published, featured,
      imageUrl, publishedAt, readTime, author
    } = req.body;
    try {
      const { rows } = await pool.query(
        `INSERT INTO articles (title, content, excerpt, category, tags, published, featured, image_url, published_at, read_time, author)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
        [title, content, excerpt, category, tags, published, featured, imageUrl, publishedAt, readTime, author]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create article' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
