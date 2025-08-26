import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Eye, Calendar } from 'lucide-react';
import { Article } from '../../types';

interface ArticleViewProps {
  article: Article;
  relatedArticles: Article[];
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, relatedArticles }) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Înapoi la articole
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Article Header */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {getCategoryLabel(article.category)}
                  </span>
                  {article.featured && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Recomandat
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {article.title}
                </h1>

                <p className="text-lg text-gray-600 mb-6">
                  {article.excerpt}
                </p>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(article.publishedAt).toLocaleDateString('ro-RO')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime} min citire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{article.views.toLocaleString()} vizualizări</span>
                  </div>
                </div>

                {/* Featured Image */}
                {article.imageUrl && (
                  <div className="mb-8">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-64 md:h-96 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Audio Player */}
                {article.audioUrl && (
                  <div className="mb-8 p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3">Ascultă articolul</h3>
                    <audio controls className="w-full">
                      <source src={article.audioUrl} type="audio/mpeg" />
                      Browser-ul tău nu suportă elementul audio.
                    </audio>
                  </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-600 mb-3">Etichete</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-6">
              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Articole Similare
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map(relatedArticle => (
                      <div
                        key={relatedArticle.id}
                        className="cursor-pointer group"
                        onClick={() => navigate(`/article/${relatedArticle.id}`)}
                      >
                        <div className="flex gap-3">
                          {relatedArticle.imageUrl && (
                            <img
                              src={relatedArticle.imageUrl}
                              alt={relatedArticle.title}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2 mb-1">
                              {relatedArticle.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{getCategoryLabel(relatedArticle.category)}</span>
                              <span>•</span>
                              <span>{relatedArticle.readTime} min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Distribuie articolul
                </h3>
                <div className="flex flex-col gap-2">
                  <button className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Facebook
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                    Twitter
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
