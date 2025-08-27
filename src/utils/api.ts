import { Article, User, Subscriber } from '../types';

const API_BASE_URL = 'https://footbal-voice.vercel.app/api';

// Funcții helper pentru API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

// Articles API
export const articlesApi = {
  // Obține toate articolele publicate (pentru site-ul public)
  getPublishedArticles: (): Promise<Article[]> => {
    return apiCall('/articles');
  },

  // Obține toate articolele (pentru admin)
  getAllArticles: (): Promise<Article[]> => {
    return apiCall('/admin/articles');
  },

  // Obține un articol specific
  getArticle: (id: string): Promise<Article> => {
    return apiCall(`/articles/${id}`);
  },

  // Creează un articol nou
  createArticle: (article: Omit<Article, 'id'>): Promise<Article> => {
    return apiCall('/admin/articles', {
      method: 'POST',
      body: JSON.stringify(article),
    });
  },

  // Actualizează un articol
  updateArticle: (id: string, article: Partial<Article>): Promise<Article> => {
    return apiCall(`/admin/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(article),
    });
  },

  // Șterge un articol
  deleteArticle: (id: string): Promise<{ message: string }> => {
    return apiCall(`/admin/articles/${id}`, {
      method: 'DELETE',
    });
  },
};

// Auth API
export const authApi = {
  // Login
  login: (email: string, password: string): Promise<User> => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
};

// Stats API
export const statsApi = {
  // Obține statisticile pentru dashboard
  getStats: (): Promise<{
    totalArticles: number;
    publishedArticles: number;
    draftArticles: number;
    totalViews: number;
    totalSubscribers: number;
    featuredArticles: number;
  }> => {
    return apiCall('/admin/stats');
  },
};

// Funcții pentru compatibilitate cu sistemul actual (localStorage)
// Acestea vor încerca să folosească API-ul, dar vor avea fallback la localStorage

export const loadArticles = async (): Promise<Article[]> => {
  try {
    return await articlesApi.getAllArticles();
  } catch (error) {
    console.error('Failed to load articles from API, falling back to localStorage:', error);
    // Fallback la localStorage
    try {
      const stored = localStorage.getItem('footballvoice-articles');
      if (!stored) return generateSampleArticles();
      
      const articles = JSON.parse(stored);
      return Array.isArray(articles) ? articles : generateSampleArticles();
    } catch (localError) {
      console.error('Error loading articles from localStorage:', localError);
      return generateSampleArticles();
    }
  }
};

export const saveArticles = async (articles: Article[]): Promise<void> => {
  // Nu mai salvăm în localStorage, doar păstrăm pentru compatibilitate
  try {
    localStorage.setItem('footballvoice-articles', JSON.stringify(articles));
  } catch (error) {
    console.error('Error saving articles to localStorage:', error);
  }
};

export const loadPublicArticles = async (): Promise<Article[]> => {
  try {
    return await articlesApi.getPublishedArticles();
  } catch (error) {
    console.error('Failed to load public articles from API:', error);
    // Fallback la localStorage
    const allArticles = await loadArticles();
    return allArticles.filter(article => article.published);
  }
};

// User functions (păstrate pentru compatibilitate)
export const loadUser = (): User | null => {
  try {
    const stored = localStorage.getItem('footballvoice-user');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
    return null;
  }
};

export const saveUser = (user: User): void => {
  try {
    localStorage.setItem('footballvoice-user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

// Subscribers functions (păstrate pentru compatibilitate)
export const loadSubscribers = (): Subscriber[] => {
  try {
    const stored = localStorage.getItem('footballvoice-subscribers');
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
    localStorage.setItem('footballvoice-subscribers', JSON.stringify(subscribers));
  } catch (error) {
    console.error('Error saving subscribers to localStorage:', error);
  }
};

// Generate sample data functions (păstrate pentru fallback)
const generateSampleArticles = (): Article[] => {
  const now = new Date().toISOString();

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
    }
  ];
};

export const clearAllData = (): void => {
  try {
    const keys = ['footballvoice-articles', 'footballvoice-user', 'footballvoice-subscribers'];
    keys.forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing data from localStorage:', error);
  }
};
