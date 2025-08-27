import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import PublicSite from './pages/PublicSite';
import LoginPage from './pages/LoginPage';
import { Article, User } from './types';
import { loadArticles, saveUser, loadUser } from './utils/api';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    const initializeData = async () => {
      try {
        const loadedArticles = await loadArticles();
        setArticles(loadedArticles);
        setUser(loadUser());
      } catch (error) {
        console.error('Error loading initial data:', error);
        setArticles([]);
        setUser(loadUser());
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    saveUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('footballvoice-user');
  };

  const updateArticles = async () => {
    try {
      const loadedArticles = await loadArticles();
      setArticles(loadedArticles);
    } catch (error) {
      console.error('Error reloading articles:', error);
    }
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