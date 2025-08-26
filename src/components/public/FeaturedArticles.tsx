import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Eye, Calendar, ArrowRight } from 'lucide-react';
import { Article } from '../../types';

interface FeaturedArticlesProps {
  articles: Article[];
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ articles }) => {
  const navigate = useNavigate();

  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      'match-analysis': 'Analize Meciuri',
      'player-portraits': 'Portrete Jucători',
      'news-transfers': 'Știri & Transferuri',
      'predictions': 'Predicții',
      'imaginary-interviews': 'Interviuri Imaginare',
    };
    return labels[category] || category;
  };

  if (articles.length === 0) {
    return null;
  }

  const [mainArticle, ...secondaryArticles] = articles;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Main Featured Article */}
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow"
        onClick={() => navigate(`/article/${mainArticle.id}`)}
      >
        {mainArticle.imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={mainArticle.imageUrl}
              alt={mainArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              Recomandat
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {getCategoryLabel(mainArticle.category)}
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {mainArticle.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {mainArticle.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(mainArticle.publishedAt).toLocaleDateString('ro-RO')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {mainArticle.readTime} min
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {mainArticle.views.toLocaleString()}
              </span>
            </div>
            
            <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Secondary Featured Articles */}
      <div className="space-y-6">
        {secondaryArticles.map(article => (
          <div
            key={article.id}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer group hover:shadow-xl transition-shadow"
            onClick={() => navigate(`/article/${article.id}`)}
          >
            <div className="flex gap-4">
              {article.imageUrl && (
                <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Recomandat
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    {getCategoryLabel(article.category)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.publishedAt).toLocaleDateString('ro-RO')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {article.views.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="flex-shrink-0 flex items-center">
                <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticles;
