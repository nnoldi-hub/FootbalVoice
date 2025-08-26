import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Eye, Tag, Star } from 'lucide-react';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
}

const categoryLabels = {
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

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <article 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Image */}
      {article.imageUrl ? (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.featured && (
            <div className="absolute top-3 left-3">
              <div className="bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-medium">
                <Star className="w-3 h-3 fill-current" />
                <span>Recomandat</span>
              </div>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              categoryColors[article.category] || 'bg-gray-100 text-gray-800'
            }`}>
              {categoryLabels[article.category]}
            </span>
          </div>
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 mx-auto">
              <Volume2 className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-600 font-medium">FootballVoice</p>
          </div>
          {article.featured && (
            <div className="absolute top-3 left-3">
              <div className="bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-medium">
                <Star className="w-3 h-3 fill-current" />
                <span>Recomandat</span>
              </div>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              categoryColors[article.category] || 'bg-gray-100 text-gray-800'
            }`}>
              {categoryLabels[article.category]}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.excerpt || article.content.substring(0, 150) + '...'}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex items-center space-x-1 mb-4">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{article.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{article.views}</span>
            </div>
          </div>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;