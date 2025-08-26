import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import PublicSite from './pages/PublicSite';
import LoginPage from './pages/LoginPage';
import { Article, User } from './types';
import { loadArticles, saveArticles, loadUser, saveUser } from './utils/storage';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    setArticles(loadArticles());
    setUser(loadUser());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Save articles whenever they change
    if (!isLoading) {
      saveArticles(articles);
    }
  }, [articles, isLoading]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    saveUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('footballvoice-user');
  };

  const updateArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă FootballVoice...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={<PublicSite articles={articles.filter(a => a.published)} />} 
        />
        <Route 
          path="/article/:id" 
          element={<PublicSite articles={articles.filter(a => a.published)} />} 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/login" 
          element={
            user ? <Navigate to="/admin" replace /> : <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            user ? (
              <AdminDashboard 
                articles={articles}
                onUpdateArticles={updateArticles}
                user={user}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;