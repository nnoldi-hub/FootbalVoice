import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X, Eye, Mic, Square } from 'lucide-react';
import { Article, Category } from '../../types';
import { articlesApi } from '../../utils/api';

interface ArticleEditorProps {
  articles: Article[];
  onUpdateArticles: () => void; // Schimbat pentru a declanșa reîncărcarea
}

const categoryLabels = {
  'match-analysis': 'Analize Meciuri',
  'player-portraits': 'Portrete Jucători',
  'news-transfers': 'Știri & Transferuri',
  'predictions': 'Predicții',
  'imaginary-interviews': 'Interviuri Imaginare',
};

const ArticleEditor: React.FC<ArticleEditorProps> = ({ articles, onUpdateArticles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [article, setArticle] = useState<Partial<Article>>({
    title: '',
    content: '',
    excerpt: '',
    category: 'match-analysis',
    tags: [],
    published: false,
    featured: false,
    imageUrl: '',
  });

  const [newTag, setNewTag] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      const existingArticle = articles.find(a => a.id === id);
      if (existingArticle) {
        setArticle(existingArticle);
      } else {
        navigate('/admin/articles');
      }
    }
  }, [id, isEditing, articles, navigate]);

  useEffect(() => {
  let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSave = async () => {
    if (!article.title || !article.content) {
      setError('Titlul și conținutul sunt obligatorii!');
      setSuccess(null);
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const now = new Date().toISOString();
      const readTime = Math.max(1, Math.ceil(article.content.split(' ').length / 200));
      const articleData = {
        title: article.title,
        content: article.content,
        excerpt: article.excerpt || article.content.substring(0, 150) + '...',
        category: article.category || 'match-analysis' as Category,
        tags: article.tags || [],
        published: article.published || false,
        featured: article.featured || false,
        imageUrl: article.imageUrl || '',
        publishedAt: article.published ? (article.publishedAt || now) : now,
        readTime,
      };
      if (isEditing) {
        await articlesApi.updateArticle(article.id!, {
          ...articleData,
          updatedAt: now
        });
        setSuccess('Articolul a fost actualizat cu succes!');
      } else {
        await articlesApi.createArticle({
          ...articleData,
          createdAt: now,
          updatedAt: now,
          views: 0
        });
        setSuccess('Articolul a fost creat cu succes!');
      }
      onUpdateArticles();
      setTimeout(() => {
        navigate('/admin/articles');
      }, 1200);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Eroare la salvarea articolului');
      }
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !article.tags?.includes(newTag.trim())) {
      setArticle(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordingTime(0);
      // Simulate voice-to-text conversion
      const simulatedText = "Acesta este un text generat din înregistrarea vocală. În aplicația reală, aici ar fi textul convertit din audio.";
      setArticle(prev => ({
        ...prev,
        content: (prev.content || '') + (prev.content ? '\n\n' : '') + simulatedText
      }));
    } else {
      setIsRecording(true);
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (previewMode) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Previzualizare Articol</h1>
            <button
              onClick={() => setPreviewMode(false)}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
              <span>Închide Previzualizarea</span>
            </button>
          </div>
          
          <article className="prose max-w-none">
            {article.imageUrl && (
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <h1>{article.title}</h1>
            <div className="text-gray-600 mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {categoryLabels[article.category as keyof typeof categoryLabels]}
              </span>
            </div>
            <div className="whitespace-pre-wrap">{article.content}</div>
            {article.tags && article.tags.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <span className="text-blue-600 font-semibold">Se salvează articolul...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          <strong>Eroare:</strong> {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
          <strong>Succes:</strong> {success}
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Editează Articolul' : 'Articol Nou'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing ? 'Modifică articolul existent' : 'Creează un articol nou pentru FootballVoice'}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setPreviewMode(true)}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <Eye className="w-5 h-5" />
            <span>Previzualizare</span>
          </button>
          
          <button
            onClick={() => navigate('/admin/articles')}
            className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            <X className="w-5 h-5" />
            <span>Anulează</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titlul Articolului *
            </label>
            <input
              type="text"
              value={article.title || ''}
              onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Introdu un titlu captivant..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Voice Recording */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Înregistrare Vocală</h3>
              <div className="text-sm text-gray-600">
                {isRecording ? (
                  <span className="text-red-600 font-medium">
                    🔴 Înregistrare activă: {formatTime(recordingTime)}
                  </span>
                ) : (
                  'Pregătit pentru înregistrare'
                )}
              </div>
            </div>
            
            <button
              onClick={handleVoiceRecording}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="w-5 h-5" />
                  <span>Oprește Înregistrarea</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  <span>Începe Înregistrarea</span>
                </>
              )}
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conținutul Articolului *
            </label>
            <textarea
              value={article.content || ''}
              onChange={(e) => setArticle(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Scrie conținutul articolului aici..."
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            />
            <div className="mt-2 text-sm text-gray-500">
              {article.content?.length || 0} caractere
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rezumat (opțional)
            </label>
            <textarea
              value={article.excerpt || ''}
              onChange={(e) => setArticle(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Un scurt rezumat al articolului..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Setări Publicare</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={article.published || false}
                  onChange={(e) => setArticle(prev => ({ ...prev, published: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                  Publică articolul
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={article.featured || false}
                  onChange={(e) => setArticle(prev => ({ ...prev, featured: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  Articol recomandat
                </label>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  setArticle(prev => ({ ...prev, published: false }));
                  handleSave();
                }}
                className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                <Save className="w-5 h-5" />
                <span>Salvează ca Ciornă</span>
              </button>
              
              <button
                onClick={() => {
                  setArticle(prev => ({ ...prev, published: true }));
                  handleSave();
                }}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Save className="w-5 h-5" />
                <span>Salvează și Publică</span>
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria *
            </label>
            <select
              value={article.category || 'match-analysis'}
              onChange={(e) => setArticle(prev => ({ ...prev, category: e.target.value as Category }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.entries(categoryLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagine Articol
            </label>
            <input
              type="url"
              value={article.imageUrl || ''}
              onChange={(e) => setArticle(prev => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {article.imageUrl && (
              <img 
                src={article.imageUrl} 
                alt="Preview" 
                className="mt-3 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tag-uri
            </label>
            
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Adaugă tag..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
              >
                Adaugă
              </button>
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;