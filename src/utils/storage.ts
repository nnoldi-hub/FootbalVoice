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
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const aWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  return [
    {
      id: '1',
      title: 'Analiza tactică: Cum a câștigat Barcelona meciul cu Real Madrid',
      content: 'În El Clasico de aseară, Barcelona a demonstrat o superioritate tactică remarcabilă față de Real Madrid. Echipa antrenată de Xavi a implementat o strategie de pressing înalt care a pus în dificultate construcția adversarilor.\n\nÎn prima repriză, catalanii au dominat posesia mingii cu 68%, reușind să creeze numeroase ocazii prin combinațiile rapide din zona centrală. Pedri și Gavi au fost excepționali în rolul de distribuitori, iar Lewandowski a profitat de spațiile create pentru a marca golul decisiv.\n\nReal Madrid a încercat să răspundă prin contraatacuri rapide, dar apărarea Barcelonei, organizată exemplar de Araujo și Christensen, a neutralizat majoritatea încercărilor madrilene.\n\nÎn repriza secundă, Xavi a făcut câteva schimbări tactice care au consolidat avantajul echipei sale. Introducerea lui Ferran Torres a adus mai multă viteză pe fazele ofensive, în timp ce soliditatea defensivă a fost menținută prin disciplina tactică excepțională.',
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
      content: 'Erling Haaland continuă să uimească lumea fotbalului cu performanțele sale extraordinare la Manchester City. Norvegianul a reușit să marcheze 25 de goluri în primele 20 de meciuri din acest sezon, o statistică care îl plasează printre cei mai prolifici atacanți din istoria Premier League.\n\nCe îl face pe Haaland atât de special? În primul rând, combinația unică între forța fizică și viteza de execuție. La 1.94m înălțime și cu o viteză impresionantă, norvegianul este un coșmar pentru orice apărare.\n\nTehnica sa de finalizare este de asemenea remarcabilă. Haaland reușește să marcheze din orice poziție, fie că vorbim de șuturi din afara careului, lovituri de cap sau finalizări din interiorul careului.\n\nÎn plus, mentalitatea sa de câștigător și dorința constantă de a marca goluri îl transform într-un adevărat lider pe teren. Colegii săi de la Manchester City vorbesc despre dedicarea sa excepțională și despre cum prezența sa motivează întreaga echipă.',
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
      content: 'Viitorul lui Kylian Mbappé rămâne una dintre cele mai discutate teme din fotbalul european. Contractul francezului cu PSG expiră la sfârșitul sezonului, iar speculațiile privind următoarea sa destinație se intensifică.\n\nReal Madrid pare să fie favorita în cursa pentru semnătura starului francez. Florentino Pérez a făcut din transferul lui Mbappé o prioritate absolută, iar jucătorul însuși a declarat în repetate rânduri că visează să joace pe Santiago Bernabéu.\n\nTotuși, PSG nu renunță și pregătește o ofertă de prelungire fără precedent, care l-ar face pe Mbappé cel mai bine plătit jucător din lume. Cifra vehiculată este de aproape 300 de milioane de euro pentru trei ani.\n\nAlte cluburi, precum Manchester City și Liverpool, monitorizează situația, deși șansele lor par reduse în acest moment.',
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
    },
    {
      id: '4',
      title: 'Predicție: Cine va câștiga Champions League 2025?',
      content: 'Cu apropierea fazei decisive a Champions League, este timpul să analizăm care sunt favoritele la câștigarea trofeului suprem european.\n\nManchester City rămâne principala favorită, având o echipă completă și un antrenor care știe să câștige competiții importante. Cu Haaland în formă maximă și un mediuteren solid, "cetățenii" au toate șansele să repete succesul.\n\nBarcelona, după renașteraa din ultimii ani, pare din nou o forță de temut. Combinația dintre experiența lui Lewandowski și talentul tinerilor ca Pedri și Gavi ar putea să facă diferența.\n\nReal Madrid, cu istoria sa în Champions League, nu poate fi niciodată eliminată din calculele pentru trofeu. Experiența în momentele decisive ar putea compensa eventualele deficiențe tactice.\n\nPSG și Bayern München completează lista favoritelor, ambele echipe având potențialul de a surprinde.',
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
      views: 1543
    },
    {
      id: '5',
      title: 'Interviu imaginar cu Lionel Messi: "Visez să câștig încă o dată Champions League"',
      content: 'FootballVoice: Leo, cum te simți la Inter Miami și ce planuri ai pentru viitor?\n\nMessi: Mă simt foarte bine aici. Inter Miami mi-a oferit o nouă perspectivă asupra fotbalului. Deși MLS nu are nivelul Europei, pasiunea fanilor și atmosfera sunt incredibile.\n\nFV: Te gândești la o întoarcere în Europa?\n\nMessi: Niciodată să nu spui niciodată în fotbal. Am mai multe lucruri de realizat, iar dacă se va ivi oportunitatea potrivită, nu o voi rata. Visez să câștig încă o dată Champions League.\n\nFV: Cum privești evoluția fotbalului actual?\n\nMessi: Fotbalul s-a schimbat mult. E mai intens, mai rapid. Tinerii jucători sunt impresionanți - Haaland, Mbappé, Pedri. Viitorul sportului este în mâini bune.\n\nFV: Un mesaj pentru tinerii fotbaliști?\n\nMessi: Să nu renunțe niciodată la vise. Eu am început să joc fotbal pe străzile din Rosario și am ajuns să câștig Balonul de Aur. Totul este posibil cu muncă și pasiune.',
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
      views: 3247
    },
    {
      id: '6',
      title: 'Analiza: De ce Napoli nu mai este la fel de puternică ca în sezonul trecut',
      content: 'Napoli trece printr-o perioadă dificilă după succesul extraordinar din sezonul trecut, când a câștigat primul titlu din ultimii 33 de ani. Echipa lui Luciano Spalletti pare să fi pierdut din intensitate și determinare.\n\nPlecarea unor jucători cheie precum Kim Min-jae și alte schimbări în lot au afectat echilibrul echipei. Noii veniți nu au reușit să se integreze la fel de bine ca predecesorii lor.\n\nTactic, Napoli pare să fi devenit mai predictibilă. Adversarii au studiat sistemul de joc și au găsit soluții pentru a neutraliza punctele forte ale echipei.\n\nTotuși, nu trebuie să uităm că echipa are încă jucători de mare valoare și experiența câștigării titlului. O revenire nu este exclusă.',
      excerpt: 'Analiza declinului Napoli după cucerirea titlului și cauzele care au dus la această situație.',
      category: 'match-analysis',
      tags: ['napoli', 'serie-a', 'analiza', 'declin'],
      published: false,
      featured: false,
      imageUrl: 'https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: '',
      createdAt: now,
      updatedAt: now,
      readTime: 4,
      views: 0
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