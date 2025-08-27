import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
});

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { email, name, password } = req.body;
    if (!email) return res.status(400).json({ error: 'Email lipsă' });
    try {
      await pool.query(
        'UPDATE admins SET name = $1, password = $2 WHERE email = $3',
        [name, password, email]
      );
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('PG ERROR (PUT /api/admin/profile):', err);
      res.status(500).json({ error: 'Eroare la actualizarea profilului', details: err.message });
    }
  } else if (req.method === 'GET') {
    const email = req.query.email;
    try {
      let rows;
      if (email) {
        ({ rows } = await pool.query('SELECT name, email FROM admins WHERE email = $1', [email]));
      } else {
        ({ rows } = await pool.query('SELECT name, email FROM admins LIMIT 1'));
      }
      if (rows.length === 0) return res.status(404).json({ error: 'Adminul nu a fost găsit' });
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error('PG ERROR (GET /api/admin/profile):', err);
      res.status(500).json({ error: 'Eroare la preluarea profilului', details: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
