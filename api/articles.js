import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
});

export default async function handler(req, res) {
  // Extrage id-ul articolului din URL dacă există
  const idMatch = req.url.match(/\/api\/admin\/articles\/(.+)/);
  const articleId = idMatch ? idMatch[1] : null;

  // === LISTARE ARTICOLE (pentru site-ul public) ===
  if (req.method === 'GET' && !articleId) {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM articles 
         WHERE published = true 
         ORDER BY published_at DESC NULLS LAST`
      );
      res.status(200).json(rows);
    } catch (error) {
      console.error('PG ERROR:', error);
      res.status(500).json({ error: error.message });
    }
    return;
  }

  // === ACTUALIZARE ARTICOL ===
  if (req.method === 'PUT' && articleId) {
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
        [articleId, title, content, excerpt, category, tags, published, featured, imageUrl, publishedAt, readTime, author]
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

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
