import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Funcții helper pentru citire/scriere fișiere
const readJsonFile = async (filename) => {
  try {
    const filePath = path.join(process.cwd(), 'data', filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

const writeJsonFile = async (filename, data) => {
  try {
    const filePath = path.join(process.cwd(), 'data', filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

// Funcție pentru inițializarea cu date demo
const initializeDemoData = async () => {
  const articles = await readJsonFile('articles.json');
  if (articles.length === 0) {
    const now = new Date().toISOString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    const aWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const demoArticles = [
      {
        id: uuidv4(),
        title: 'Analiza tactică: Cum a câștigat Barcelona meciul cu Real Madrid',
        content: 'În El Clasico de aseară, Barcelona a demonstrat o superioritate tactică remarcabilă față de Real Madrid. Echipa antrenată de Xavi a implementat o strategie de pressing înalt care a pus în dificultate construcția adversarilor.\\n\\nÎn prima repriză, catalanii au dominat posesia mingii cu 68%, reușind să creeze numeroase ocazii prin combinațiile rapide din zona centrală. Pedri și Gavi au fost excepționali în rolul de distribuitori, iar Lewandowski a profitat de spațiile create pentru a marca golul decisiv.\\n\\nReal Madrid a încercat să răspundă prin contraatacuri rapide, dar apărarea Barcelonei, organizată exemplar de Araujo și Christensen, a neutralizat majoritatea încercărilor madrilene.\\n\\nÎn repriza secundă, Xavi a făcut câteva schimbări tactice care au consolidat avantajul echipei sale. Introducerea lui Ferran Torres a adus mai multă viteză pe fazele ofensive, în timp ce soliditatea defensivă a fost menținută prin disciplina tactică excepțională.',
        excerpt: 'Analiza detaliată a victoriei Barcelonei în El Clasico, cu focus pe aspectele tactice care au făcut diferența.',
        category: 'match-analysis',
        tags: ['barcelona', 'real-madrid', 'el-clasico', 'tactici', 'analiza'],
        published: true,
        featured: true,
        imageUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
        readTime: 4,
        views: 1247,
        author: 'David Admin'
      },
      {
        id: uuidv4(),
        title: 'Erling Haaland: Fenomenul care redefinește atacul modern',
        content: 'Erling Haaland continuă să uimească lumea fotbalului cu performanțele sale extraordinare la Manchester City. Norvegianul a reușit să marcheze 25 de goluri în primele 20 de meciuri din acest sezon, o statistică care îl plasează printre cei mai prolifici atacanți din istoria Premier League.\\n\\nCe îl face pe Haaland atât de special? În primul rând, combinația unică între forța fizică și viteza de execuție. La 1.94m înălțime și cu o viteză impresionantă, norvegianul este un coșmar pentru orice apărare.\\n\\nTehnica sa de finalizare este de asemenea remarcabilă. Haaland reușește să marcheze din orice poziție, fie că vorbim de șuturi din afara careului, lovituri de cap sau finalizări din interiorul careului.\\n\\nÎn plus, mentalitatea sa de câștigător și dorința constantă de a marca goluri îl transform într-un adevărat lider pe teren. Colegii săi de la Manchester City vorbesc despre dedicarea sa excepțională și despre cum prezența sa motivează întreaga echipă.',
        excerpt: 'Portretul celui mai prolific atacant al momentului și analiza calităților care îl fac unic.',
        category: 'player-portraits',
        tags: ['haaland', 'manchester-city', 'atacant', 'premier-league'],
        published: true,
        featured: false,
        imageUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800',
        publishedAt: yesterday,
        createdAt: yesterday,
        updatedAt: yesterday,
        readTime: 3,
        views: 892,
        author: 'David Admin'
      },
      {
        id: uuidv4(),
        title: 'Transferul verii: Unde va ajunge Kylian Mbappé?',
        content: 'Viitorul lui Kylian Mbappé rămâne una dintre cele mai discutate teme din fotbalul european. Contractul francezului cu PSG expiră la sfârșitul sezonului, iar speculațiile privind următoarea sa destinație se intensifică.\\n\\nReal Madrid pare să fie favorita în cursa pentru semnătura starului francez. Florentino Pérez a făcut din transferul lui Mbappé o prioritate absolută, iar jucătorul însuși a declarat în repetate rânduri că visează să joace pe Santiago Bernabéu.\\n\\nTotuși, PSG nu renunță și pregătește o ofertă de prelungire fără precedent, care l-ar face pe Mbappé cel mai bine plătit jucător din lume. Cifra vehiculată este de aproape 300 de milioane de euro pentru trei ani.\\n\\nAlte cluburi, precum Manchester City și Liverpool, monitorizează situația, deși șansele lor par reduse în acest moment.',
        excerpt: 'Analiza situației contractuale a lui Mbappé și posibilele destinații pentru starul francez.',
        category: 'news-transfers',
        tags: ['mbappe', 'psg', 'real-madrid', 'transfer', 'contract'],
        published: true,
        featured: true,
        imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800',
        publishedAt: twoDaysAgo,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo,
        readTime: 5,
        views: 2156,
        author: 'David Admin'
      },
      {
        id: uuidv4(),
        title: 'Predicție: Cine va câștiga Champions League 2025?',
        content: 'Cu apropierea fazei decisive a Champions League, este timpul să analizăm care sunt favoritele la câștigarea trofeului suprem european.\\n\\nManchester City rămâne principala favorită, având o echipă completă și un antrenor care știe să câștige competiții importante. Cu Haaland în formă maximă și un mediuteren solid, "cetățenii" au toate șansele să repete succesul.\\n\\nBarcelona, după renașteraa din ultimii ani, pare din nou o forță de temut. Combinația dintre experiența lui Lewandowski și talentul tinerilor ca Pedri și Gavi ar putea să facă diferența.\\n\\nReal Madrid, cu istoria sa în Champions League, nu poate fi niciodată eliminată din calculele pentru trofeu. Experiența în momentele decisive ar putea compensa eventualele deficiențe tactice.\\n\\nPSG și Bayern München completează lista favoritelor, ambele echipe având potențialul de a surprinde.',
        excerpt: 'Analiza favoritelor pentru câștigarea Champions League și predicțiile pentru faza finală.',
        category: 'predictions',
        tags: ['champions-league', 'predictii', 'manchester-city', 'barcelona'],
        published: true,
        featured: false,
        imageUrl: 'https://images.pexels.com/photos/270154/pexels-photo-270154.jpeg?auto=compress&cs=tinysrgb&w=800',
        publishedAt: threeDaysAgo,
        createdAt: threeDaysAgo,
        updatedAt: threeDaysAgo,
        readTime: 4,
        views: 1543,
        author: 'David Admin'
      },
      {
        id: uuidv4(),
        title: 'Interviu imaginar cu Lionel Messi: "Visez să câștig încă o dată Champions League"',
        content: 'FootballVoice: Leo, cum te simți la Inter Miami și ce planuri ai pentru viitor?\\n\\nMessi: Mă simt foarte bine aici. Inter Miami mi-a oferit o nouă perspectivă asupra fotbalului. Deși MLS nu are nivelul Europei, pasiunea fanilor și atmosfera sunt incredibile.\\n\\nFV: Te gândești la o întoarcere în Europa?\\n\\nMessi: Niciodată să nu spui niciodată în fotbal. Am mai multe lucruri de realizat, iar dacă se va ivi oportunitatea potrivită, nu o voi rata. Visez să câștig încă o dată Champions League.\\n\\nFV: Cum privești evoluția fotbalului actual?\\n\\nMessi: Fotbalul s-a schimbat mult. E mai intens, mai rapid. Tinerii jucători sunt impresionanți - Haaland, Mbappé, Pedri. Viitorul sportului este în mâini bune.\\n\\nFV: Un mesaj pentru tinerii fotbaliști?\\n\\nMessi: Să nu renunțe niciodată la vise. Eu am început să joc fotbal pe străzile din Rosario și am ajuns să câștig Balonul de Aur. Totul este posibil cu muncă și pasiune.',
        excerpt: 'Interviu exclusiv imaginar cu Lionel Messi despre planurile de viitor și perspectiva asupra fotbalului modern.',
        category: 'imaginary-interviews',
        tags: ['messi', 'inter-miami', 'champions-league', 'interviu'],
        published: true,
        featured: true,
        imageUrl: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=800',
        publishedAt: aWeekAgo,
        createdAt: aWeekAgo,
        updatedAt: aWeekAgo,
        readTime: 6,
        views: 3247,
        author: 'David Admin'
      }
    ];

    await writeJsonFile('articles.json', demoArticles);
    console.log('✅ Demo articles initialized');
  }
};

// Routes pentru articole

// GET /api/articles - Obține toate articolele publicate
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await readJsonFile('articles.json');
    const publishedArticles = articles.filter(article => article.published);
    res.json(publishedArticles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// GET /api/admin/articles - Obține toate articolele (pentru admin)
app.get('/api/admin/articles', async (req, res) => {
  try {
    const articles = await readJsonFile('articles.json');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// GET /api/articles/:id - Obține un articol specific
app.get('/api/articles/:id', async (req, res) => {
  try {
    const articles = await readJsonFile('articles.json');
    const article = articles.find(a => a.id === req.params.id && a.published);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Incrementează view count
    article.views = (article.views || 0) + 1;
    await writeJsonFile('articles.json', articles);

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// POST /api/admin/articles - Creează un articol nou
app.post('/api/admin/articles', async (req, res) => {
  try {
    const articles = await readJsonFile('articles.json');
    const now = new Date().toISOString();
    
    const newArticle = {
      id: uuidv4(),
      ...req.body,
      createdAt: now,
      updatedAt: now,
      views: 0,
      author: req.body.author || 'Admin'
    };

    articles.push(newArticle);
    await writeJsonFile('articles.json', articles);

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// PUT /api/admin/articles/:id - Actualizează un articol
app.put('/api/admin/articles/:id', async (req, res) => {
  try {
    const articles = await readJsonFile('articles.json');
    const articleIndex = articles.findIndex(a => a.id === req.params.id);
    
    if (articleIndex === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const updatedArticle = {
      ...articles[articleIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    articles[articleIndex] = updatedArticle;
    await writeJsonFile('articles.json', articles);

    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// DELETE /api/admin/articles/:id - Șterge un articol
app.delete('/api/admin/articles/:id', async (req, res) => {
  try {
    const articles = await readJsonFile('articles.json');
    const filteredArticles = articles.filter(a => a.id !== req.params.id);
    
    if (filteredArticles.length === articles.length) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await writeJsonFile('articles.json', filteredArticles);
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

// Inițializare și pornire server
const startServer = async () => {
  await initializeDemoData();
  
  app.listen(PORT, () => {
    console.log(`🚀 FootballVoice Backend Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available:`);
    console.log(`   GET /api/articles - Public articles`);
    console.log(`   GET /api/admin/articles - All articles (admin)`);
    console.log(`   POST /api/admin/articles - Create article`);
    console.log(`   PUT /api/admin/articles/:id - Update article`);
    console.log(`   DELETE /api/admin/articles/:id - Delete article`);
    console.log(`   POST /api/auth/login - Login`);
    console.log(`   GET /api/admin/stats - Statistics`);
  });
};

startServer();
