// Endpoint pentru verificarea codului de login
app.post('/api/verify-login-code', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'Email sau cod lipsă' });
  global.loginCodes = global.loginCodes || {};
  if (global.loginCodes[email] === code) {
    // Cod corect, autentificare reușită
    delete global.loginCodes[email]; // opțional, șterge codul după folosire
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Cod invalid' });
  }
});
const { sendLoginCode } = require('./mailer');
const crypto = require('crypto');
// Endpoint pentru trimitere cod de login pe email
app.post('/api/send-login-code', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email lipsă' });
  // Generează cod unic
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  // (opțional) Salvează codul temporar în memorie sau DB pentru validare ulterioară
  // Exemplu simplu: global.codes = { [email]: code }
  global.loginCodes = global.loginCodes || {};
  global.loginCodes[email] = code;
  try {
    await sendLoginCode(email, code);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Eroare la trimiterea emailului' });
  }
});

import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
  app.use(cors({ origin: '*' }));
const PORT = process.env.PORT || 3001;
const pool = new Pool();

app.use(cors());
app.use(express.json());

// GET /api/articles - toate articolele publicate
app.get('/api/articles', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM articles WHERE published = true ORDER BY published_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// GET /api/admin/articles - toate articolele (admin)
app.get('/api/admin/articles', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// GET /api/articles/:id - articol public
app.get('/api/articles/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM articles WHERE id = $1 AND published = true', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Article not found' });
    // Incrementează view count
    await pool.query('UPDATE articles SET views = views + 1 WHERE id = $1', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// POST /api/admin/articles - creează articol nou
app.post('/api/admin/articles', async (req, res) => {
  try {
    const {
      title, content, excerpt, category, tags, published, featured,
      imageUrl, publishedAt, readTime, author
    } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO articles (title, content, excerpt, category, tags, published, featured, image_url, published_at, read_time, author)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [title, content, excerpt, category, tags, published, featured, imageUrl, publishedAt, readTime, author]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// PUT /api/admin/articles/:id - actualizează articol
app.put('/api/admin/articles/:id', async (req, res) => {
  try {
    const fields = [];
    const values = [];
    let idx = 1;
    for (const key in req.body) {
      fields.push(`${key} = $${idx}`);
      values.push(req.body[key]);
      idx++;
    }
    values.push(req.params.id);
    const query = `UPDATE articles SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${idx} RETURNING *`;
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) return res.status(404).json({ error: 'Article not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// DELETE /api/admin/articles/:id - șterge articol
app.delete('/api/admin/articles/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM articles WHERE id = $1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Article not found' });
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// Routes pentru autentificare

// POST /api/auth/login - Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readJsonFile('users.json');
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Nu trimitem parola înapoi
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Route pentru statistici
app.get('/api/admin/stats', async (req, res) => {
  try {
    const articles = await readJsonFile('articles.json');
    const subscribers = await readJsonFile('subscribers.json');
    
    const stats = {
      totalArticles: articles.length,
      publishedArticles: articles.filter(a => a.published).length,
      draftArticles: articles.filter(a => !a.published).length,
      totalViews: articles.reduce((sum, a) => sum + (a.views || 0), 0),
      totalSubscribers: subscribers.length,
      featuredArticles: articles.filter(a => a.featured && a.published).length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 FootballVoice Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available:`);
  console.log(`   GET /api/articles - Public articles`);
  console.log(`   GET /api/admin/articles - All articles (admin)`);
  console.log(`   POST /api/admin/articles - Create article`);
  console.log(`   PUT /api/admin/articles/:id - Update article`);
  console.log(`   DELETE /api/admin/articles/:id - Delete article`);
});
