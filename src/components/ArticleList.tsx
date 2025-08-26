import React from 'react';
import { Edit2, Trash2, Clock, Tag } from 'lucide-react';
import { Article, Category } from '../types';

interface ArticleListProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
  selectedCategory: Category;
}

const categoryLabels = {
  'all': 'Toate',
  'match-analysis': 'Analize Meciuri',
  'player-portraits': 'Portrete Jucători',
  'news-transfers': 'Știri & Transferuri',
  'predictions': 'Predicții',
  'imaginary-interviews': 'Interviuri Imaginare',
};

const categoryColors = {
  'match-analysis': 'bg-blue-100 text-blue-800',
  'player-portraits': 'bg-green-100 text-green-800',
  'news-transfers': 'bg-purple-100 text-purple-800',
  'predictions': 'bg-orange-100 text-orange-800',
  'imaginary-interviews': 'bg-red-100 text-red-800',
};

const ArticleList: React.FC<ArticleListProps> = ({ articles, onEdit, onDelete, selectedCategory }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Ești sigur că vrei să ștergi articolul "${title}"?`)) {
      onDelete(id);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Articole</h3>
        <div className="text-sm text-gray-600">
          {selectedCategory === 'all' ? (
            <span>{articles.length} articole în total</span>
          ) : (
            <span>{articles.length} în {categoryLabels[selectedCategory]}</span>
          )}
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-lg font-medium">Nu există articole</p>
          <p className="text-sm">
            {selectedCategory === 'all' 
              ? 'Creează primul tău articol!' 
              : `Nu există articole în categoria "${categoryLabels[selectedCategory]}".`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {articles.map((article) => (
            <div
              key={article.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 leading-tight">
                    {truncateText(article.title, 60)}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      categoryColors[article.category] || 'bg-gray-100 text-gray-800'
                    }`}>
                      {categoryLabels[article.category]}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-2">
                  <button
                    onClick={() => onEdit(article)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Editează articolul"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id, article.title)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Șterge articolul"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content Preview */}
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {truncateText(article.content, 120)}
              </p>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center space-x-1 mb-3">
                  <Tag className="w-3 h-3 text-gray-400" />
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{article.tags.length - 3} mai mult{article.tags.length > 4 ? 'e' : ''}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {article.content.length} caractere
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleList;