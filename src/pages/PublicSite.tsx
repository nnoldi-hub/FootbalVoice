import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PublicHeader from '../components/public/PublicHeader';
import PublicFooter from '../components/public/PublicFooter';
import ArticleCard from '../components/public/ArticleCard';
import ArticleView from '../components/public/ArticleView';
import CategoryFilter from '../components/public/CategoryFilter';
import Newsletter from '../components/public/Newsletter';
import FeaturedArticles from '../components/public/FeaturedArticles';
import AboutSection from '../components/public/AboutSection';
import ContactSection from '../components/public/ContactSection';
import { Article, Category } from '../types';
import { loadPublicArticles } from '../utils/api';

const PublicSite: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const publicArticles = await loadPublicArticles();
        setArticles(publicArticles);
      } catch (error) {
        console.error('Error loading public articles:', error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSearchTerm(''); // Clear search when changing sections
  };

  // If viewing a specific article
  if (id) {
    const article = articles.find(a => a.id === id);
    if (!article) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Articol negăsit</h1>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Înapoi la pagina principală
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <PublicHeader 
          onSearch={setSearchTerm}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        <ArticleView article={article} relatedArticles={articles.slice(0, 3)} />
        <PublicFooter />
      </div>
    );
  }

  // Render different sections based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <AboutSection />;
      
      case 'contact':
        return <ContactSection />;
      
      case 'articles':
      case 'home':
      default:
        return renderHomeContent();
    }
  };

  const renderHomeContent = () => {
    // Filter articles
    const filteredArticles = articles.filter(article => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });

    const featuredArticles = articles.filter(article => article.featured).slice(0, 3);

    return (
      <>
        {/* Hero Section - only show on home, not when searching */}
        {activeSection === 'home' && searchTerm === '' && (
          <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl font-bold mb-4">
                Football<span className="text-green-300">Voice</span>
              </h1>
              <p className="text-xl text-blue-200 mb-8">
                Unde pasiunea pentru fotbal devine cuvânt
              </p>
              <div className="max-w-md mx-auto">
                <Newsletter />
              </div>
            </div>
          </section>
        )}

        {/* Featured Articles - only on home page without search */}
        {activeSection === 'home' && searchTerm === '' && featuredArticles.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Articole Recomandate
              </h2>
              <FeaturedArticles articles={featuredArticles} />
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <aside className="lg:w-1/4">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    articleCounts={articles.reduce((acc, article) => {
                      acc[article.category] = (acc[article.category] || 0) + 1;
                      return acc;
                    }, {} as Record<Category, number>)}
                  />
                </div>
              </aside>

              {/* Articles Grid */}
              <main className="lg:w-3/4">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {searchTerm ? `Rezultate pentru: "${searchTerm}"` :
                     activeSection === 'articles' ? 'Toate Articolele' :
                     selectedCategory === 'all' ? 'Articole Recente' : getCategoryLabel(selectedCategory)}
                  </h2>
                  <p className="text-gray-600">
                    {filteredArticles.length} articol{filteredArticles.length !== 1 ? 'e' : ''} găsit{filteredArticles.length !== 1 ? 'e' : ''}
                  </p>
                </div>

                {filteredArticles.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-600 mb-2">
                      Nu s-au găsit articole
                    </h3>
                    <p className="text-gray-500">
                      {searchTerm ? 'Încearcă să modifici termenul de căutare.' : 'Nu există articole în această categorie.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredArticles.map(article => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                )}
              </main>
            </div>
          </div>
        </section>
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Se încarcă articolele...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader 
        onSearch={setSearchTerm}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      {renderContent()}

      <PublicFooter />
    </div>
  );
};

const getCategoryLabel = (category: Category): string => {
  const labels = {
    'all': 'Toate',
    'match-analysis': 'Analize Meciuri',
    'player-portraits': 'Portrete Jucători',
    'news-transfers': 'Știri & Transferuri',
    'predictions': 'Predicții',
    'imaginary-interviews': 'Interviuri Imaginare',
  };
  return labels[category];
};

export default PublicSite;