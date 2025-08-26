import { Article, User, Subscriber } from '../types';

const STORAGE_KEYS = {
  ARTICLES: 'footballvoice-articles',
  USER: 'footballvoice-user',
  SUBSCRIBERS: 'footballvoice-subscribers',
};

// Articles
export const loadArticles = (): Article[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (!stored) return generateSampleArticles();
    
    const articles = JSON.parse(stored);
    return Array.isArray(articles) ? articles : generateSampleArticles();
  } catch (error) {
    console.error('Error loading articles from localStorage:', error);
    return generateSampleArticles();
  }
};

export const saveArticles = (articles: Article[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  } catch (error) {
    console.error('Error saving articles to localStorage:', error);
  }
};

// User
export const loadUser = (): User | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
    return null;
  }
};

export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

// Subscribers
export const loadSubscribers = (): Subscriber[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
    if (!stored) return generateSampleSubscribers();
    
    const subscribers = JSON.parse(stored);
    return Array.isArray(subscribers) ? subscribers : generateSampleSubscribers();
  } catch (error) {
    console.error('Error loading subscribers from localStorage:', error);
    return generateSampleSubscribers();
  }
};

export const saveSubscribers = (subscribers: Subscriber[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subscribers));
  } catch (error) {
    console.error('Error saving subscribers to localStorage:', error);
  }
};

// Generate sample data
const generateSampleArticles = (): Article[] => {
  const now = new Date().toISOString();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

  return [
    {
      id: '1',
      title: 'Analiza tactică: Cum a câștigat Barcelona meciul cu Real Madrid',
      content: 'În El Clasico de aseară, Barcelona a demonstrat o superioritate tactică remarcabilă față de Real Madrid. Echipa antrenată de Xavi a implementat o strategie de pressing înalt care a pus în dificultate construcția adversarilor.\n\nÎn prima repriză, catalanii au dominat posesia mingii cu 68%, reușind să creeze numeroase ocazii prin combinațiile rapide din zona centrală. Pedri și Gavi au fost excepționali în rolul de distribuitori, iar Lewandowski a profitat de spațiile create pentru a marca golul decisiv.\n\nReal Madrid a încercat să răspundă prin contraatacuri rapide, dar apărarea Barcelonei, organizată exemplar de Araujo și Christensen, a neutralizat majoritatea încercărilor madrilene.',
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
      views: 1247
    },
    {
      id: '2',
      title: 'Erling Haaland: Fenomenul care redefinește atacul modern',
      content: 'Erling Haaland continuă să uimească lumea fotbalului cu performanțele sale extraordinare la Manchester City. Norvegianul a reușit să marcheze 25 de goluri în primele 20 de meciuri din acest sezon, o statistică care îl plasează printre cei mai prolifici atacanți din istoria Premier League.\n\nCe îl face pe Haaland atât de special? În primul rând, combinația unică între forța fizică și viteza de execuție. La 1.94m înălțime și cu o viteză impresionantă, norvegianul este un coșmar pentru orice apărare.\n\nTehnica sa de finalizare este de asemenea remarcabilă. Haaland reușește să marcheze din orice poziție, fie că vorbim de șuturi din afara careului, lovituri de cap sau finalizări din interiorul careului.',
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
      views: 892
    },
    {
      id: '3',
      title: 'Transferul verii: Unde va ajunge Kylian Mbappé?',
      content: 'Viitorul lui Kylian Mbappé rămâne una dintre cele mai discutate teme din fotbalul european. Contractul francezului cu PSG expiră la sfârșitul sezonului, iar speculațiile privind următoarea sa destinație se intensifică.\n\nReal Madrid pare să fie favorita în cursa pentru semnătura starului francez. Florentino Pérez a făcut din transferul lui Mbappé o prioritate absolută, iar jucătorul însuși a declarat în repetate rânduri că visează să joace pe Santiago Bernabéu.\n\nTotuși, PSG nu renunță și pregătește o ofertă de prelungire fără precedent, care l-ar face pe Mbappé cel mai bine plătit jucător din lume.',
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
      views: 2156
    }
  ];
};

const generateSampleSubscribers = (): Subscriber[] => {
  return [
    {
      id: '1',
      email: 'ion.popescu@email.com',
      name: 'Ion Popescu',
      subscribedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      active: true,
      preferences: {
        categories: ['match-analysis', 'predictions'],
        frequency: 'weekly'
      }
    },
    {
      id: '2',
      email: 'maria.ionescu@email.com',
      name: 'Maria Ionescu',
      subscribedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      active: true,
      preferences: {
        categories: ['player-portraits', 'news-transfers'],
        frequency: 'daily'
      }
    }
  ];
};

export const clearAllData = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing data from localStorage:', error);
  }
};