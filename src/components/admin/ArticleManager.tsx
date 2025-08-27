import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff,
  Star,
  Clock,
  MoreVertical,
  FileText
} from 'lucide-react';
import { Article, Category } from '../../types';
import { articlesApi } from '../../utils/api';

interface ArticleManagerProps {
  articles: Article[];
  onUpdateArticles: () => void; // Schimbat pentru a declanșa reîncărcarea
}

const categoryLabels = {
  'all': 'Toate',
  'match-analysis': 'Analize Meciuri',
  'player-portraits': 'Portrete Jucători',
  'news-transfers': 'Știri & Transferuri',
  'predictions': 'Predicții',
  'imaginary-interviews': 'Interviuri Imaginare',
};


const ArticleManager: React.FC<ArticleManagerProps> = ({ articles, onUpdateArticles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'published' && article.published) ||
      (statusFilter === 'draft' && !article.published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleApiAction = async (action: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    try {
      await action();
      onUpdateArticles();
    } catch (err: any) {
      setError(err?.message || 'Eroare la comunicarea cu serverul');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublished = (articleId: string) => {
    handleApiAction(async () => {
      const article = articles.find(a => a.id === articleId);
      if (article) {
        await articlesApi.updateArticle(articleId, { 
          published: !article.published,
          updatedAt: new Date().toISOString()
        });
      }
    });
  };

  const handleToggleFeatured = (articleId: string) => {
    handleApiAction(async () => {
      const article = articles.find(a => a.id === articleId);
      if (article) {
        await articlesApi.updateArticle(articleId, { 
          featured: !article.featured,
          updatedAt: new Date().toISOString()
        });
      }
    });
  };

  const handleDeleteArticle = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (article && window.confirm(`Ești sigur că vrei să ștergi articolul "${article.title}"?`)) {
      handleApiAction(async () => {
        await articlesApi.deleteArticle(articleId);
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <span className="text-blue-600 font-semibold">Se procesează...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          <strong>Eroare:</strong> {error}
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestionare Articole</h1>
          <p className="text-gray-600 mt-1">
            {articles.length} articol{articles.length !== 1 ? 'e' : ''} în total
          </p>
        </div>
        <Link
          to="/admin/articles/new"
          className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Articol Nou</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Caută articole..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Toate statusurile</option>
            <option value="published">Publicate</option>
            <option value="draft">Ciorne</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="mx-auto h-16 w-16" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Nu s-au găsit articole
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== 'all' || statusFilter !== 'all'
                ? 'Încearcă să modifici filtrele de căutare.'
                : 'Creează primul tău articol pentru a începe.'}
            </p>
            <Link
              to="/admin/articles/new"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Creează Articol</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Articol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acțiuni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {article.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {article.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {article.excerpt || article.content.substring(0, 100) + '...'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {categoryLabels[article.category]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          article.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {article.published ? 'Publicat' : 'Ciornă'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(article.updatedAt)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/admin/articles/edit/${article.id}`}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Editează"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        
                        <button
                          onClick={() => handleTogglePublished(article.id)}
                          className={`p-1 rounded ${
                            article.published 
                              ? 'text-gray-600 hover:text-gray-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                          title={article.published ? 'Ascunde' : 'Publică'}
                        >
                          {article.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        
                        <button
                          onClick={() => handleToggleFeatured(article.id)}
                          className={`p-1 rounded ${
                            article.featured 
                              ? 'text-yellow-600 hover:text-yellow-900' 
                              : 'text-gray-400 hover:text-yellow-600'
                          }`}
                          title={article.featured ? 'Elimină din recomandate' : 'Marchează ca recomandat'}
                        >
                          <Star className={`w-4 h-4 ${article.featured ? 'fill-current' : ''}`} />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Șterge"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleManager;