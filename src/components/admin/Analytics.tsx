import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Eye, Calendar, Award } from 'lucide-react';
import { Article } from '../../types';

interface AnalyticsProps {
  articles: Article[];
}

const Analytics: React.FC<AnalyticsProps> = ({ articles }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [analyticsData, setAnalyticsData] = useState({
    totalViews: 0,
    totalArticles: 0,
    publishedArticles: 0,
    averageReadTime: 0
  });

  useEffect(() => {
    // Calculate analytics data
    const published = articles.filter(a => a.published);
    const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
    const averageReadTime = articles.length > 0 
      ? articles.reduce((sum, a) => sum + a.readTime, 0) / articles.length 
      : 0;

    setAnalyticsData({
      totalViews,
      totalArticles: articles.length,
      publishedArticles: published.length,
      averageReadTime: Math.round(averageReadTime)
    });
  }, [articles]);

  const getCategoryStats = () => {
    const stats = articles.reduce((acc, article) => {
      acc[article.category] = (acc[article.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(stats).map(([category, count]) => ({
      category: getCategoryLabel(category),
      count,
      percentage: Math.round((count / articles.length) * 100)
    }));
  };

  const getTopArticles = () => {
    return articles
      .filter(a => a.published)
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  };

  const getRecentActivity = () => {
    const now = new Date();
    const timeLimit = new Date();
    
    switch (timeRange) {
      case 'week':
        timeLimit.setDate(now.getDate() - 7);
        break;
      case 'month':
        timeLimit.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        timeLimit.setFullYear(now.getFullYear() - 1);
        break;
    }

    return articles.filter(a => new Date(a.createdAt) >= timeLimit);
  };

  const categoryStats = getCategoryStats();
  const topArticles = getTopArticles();
  const recentActivity = getRecentActivity();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Vizualizare statistici și performanță articole
          </p>
        </div>
        
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="week">Ultima săptămână</option>
          <option value="month">Ultima lună</option>
          <option value="year">Ultimul an</option>
        </select>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Vizualizări</p>
              <p className="text-2xl font-bold text-gray-800">
                {analyticsData.totalViews.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Articole Publicate</p>
              <p className="text-2xl font-bold text-gray-800">
                {analyticsData.publishedArticles}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Articole</p>
              <p className="text-2xl font-bold text-gray-800">
                {analyticsData.totalArticles}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Timp de Citire Mediu</p>
              <p className="text-2xl font-bold text-gray-800">
                {analyticsData.averageReadTime} min
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Distribuție pe Categorii
          </h3>
          
          {categoryStats.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-gray-500 mt-2">Nu există date disponibile</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categoryStats.map(stat => (
                <div key={stat.category} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {stat.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {stat.count} ({stat.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Articles */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Articole cu Cele Mai Multe Vizualizări
          </h3>
          
          {topArticles.length === 0 ? (
            <div className="text-center py-8">
              <Award className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-gray-500 mt-2">Nu există articole publicate</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div key={article.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getCategoryLabel(article.category)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Activitate Recentă ({timeRange === 'week' ? 'Ultima săptămână' : 
                              timeRange === 'month' ? 'Ultima lună' : 'Ultimul an'})
        </h3>
        
        {recentActivity.length === 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <p className="text-gray-500 mt-2">Nu există activitate recentă</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivity.slice(0, 10).map(article => (
              <div key={article.id} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString('ro-RO')} - {getCategoryLabel(article.category)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    article.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.published ? 'Publicat' : 'Draft'}
                  </span>
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {article.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    'all': 'Toate',
    'match-analysis': 'Analize Meciuri',
    'player-portraits': 'Portrete Jucători',
    'news-transfers': 'Știri & Transferuri',
    'predictions': 'Predicții',
    'imaginary-interviews': 'Interviuri Imaginare',
  };
  return labels[category] || category;
};

export default Analytics;
