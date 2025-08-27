import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
});

export default async function handler(req, res) {
  // Permitem și POST ca alias pentru PUT (publicare)
  if (req.method === 'POST') {
    req.method = 'PUT';
  }

  // Setăm headerele CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Missing article id' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
      if (rows.length === 0) {
        res.status(404).json({ error: 'Article not found' });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      console.error('PG ERROR:', error);
      res.status(500).json({ error: error.message });
    }
    return;
  }

  if (req.method === 'PUT') {
    const {
      title, content, excerpt, category, tags, published, featured,
      imageUrl, publishedAt, readTime, author
    } = req.body;

    try {
      const { rows } = await pool.query(
        `UPDATE articles SET
          title = COALESCE($2, title),
          content = COALESCE($3, content),
          excerpt = COALESCE($4, excerpt),
          category = COALESCE($5, category),
          tags = COALESCE($6, tags),
          published = COALESCE($7, published),
          featured = COALESCE($8, featured),
          image_url = COALESCE($9, image_url),
          published_at = COALESCE($10, published_at),
          read_time = COALESCE($11, read_time),
          author = COALESCE($12, author)
        WHERE id = $1
        RETURNING *`,
        [id, title, content, excerpt, category, tags, published, featured, imageUrl, publishedAt, readTime, author]
      );

      if (rows.length === 0) {
        res.status(404).json({ error: 'Article not found' });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      console.error('PG ERROR:', error);
      res.status(500).json({ error: error.message });
    }
    return;
  }

  if (req.method === 'DELETE') {
    try {
      const { rowCount } = await pool.query('DELETE FROM articles WHERE id = $1', [id]);
      if (rowCount === 0) {
        res.status(404).json({ error: 'Article not found' });
      } else {
        res.status(200).json({ message: 'Article deleted' });
      }
    } catch (error) {
      console.error('PG ERROR:', error);
      res.status(500).json({ error: error.message });
    }
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']);
  res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
