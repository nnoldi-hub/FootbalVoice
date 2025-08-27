import React, { useState } from 'react';
import AdminProfileEditor from '../components/admin/AdminProfileEditor';
import StaticPagesManager from '../components/admin/StaticPagesManager';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import ArticleManager from '../components/admin/ArticleManager';
import ArticleEditor from '../components/admin/ArticleEditor';
import SubscriberManager from '../components/admin/SubscriberManager';
import NewsletterManager from '../components/admin/NewsletterManager';
import Analytics from '../components/admin/Analytics';
import { Article, User } from '../types';

interface AdminDashboardProps {
  articles: Article[];
  onUpdateArticles: () => void;
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  articles,
  onUpdateArticles,
  user,
  onLogout
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader 
        user={user} 
        onLogout={onLogout}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex">
        <AdminSidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 lg:ml-64 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/articles" replace />} />
            <Route 
              path="/articles" 
              element={
                <ArticleManager 
                  articles={articles}
                  onUpdateArticles={onUpdateArticles}
                />
              } 
            />
            <Route 
              path="/articles/new" 
              element={
                <ArticleEditor 
                  articles={articles}
                  onUpdateArticles={onUpdateArticles}
                />
              } 
            />
            <Route 
              path="/articles/edit/:id" 
              element={
                <ArticleEditor 
                  articles={articles}
                  onUpdateArticles={onUpdateArticles}
                />
              } 
            />
            <Route path="/subscribers" element={<SubscriberManager />} />
            <Route path="/newsletter" element={<NewsletterManager articles={articles} />} />
            <Route path="/analytics" element={<Analytics articles={articles} />} />
            <Route path="/profile" element={<AdminProfileEditor />} />
            <Route path="/static-pages" element={<StaticPagesManager />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;