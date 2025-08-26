import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }, 1000);
  };

  if (subscribed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-green-700">
          <Check className="w-5 h-5" />
          <span className="font-medium">Te-ai abonat cu succes!</span>
        </div>
        <p className="text-green-600 text-sm mt-1">
          Vei primi cele mai noi articole direct în inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <div className="text-center mb-4">
        <Mail className="w-8 h-8 text-white mx-auto mb-2" />
        <h3 className="text-lg font-bold text-white mb-1">
          Abonează-te la Newsletter
        </h3>
        <p className="text-blue-200 text-sm">
          Primește cele mai noi articole direct în inbox
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Adresa ta de email"
          required
          className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
        />
        
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Se procesează...</span>
            </div>
          ) : (
            'Abonează-te Gratuit'
          )}
        </button>
      </form>

      <p className="text-blue-200 text-xs text-center mt-3">
        Nu spam, doar conținut de calitate despre fotbal.
      </p>
    </div>
  );
};

export default Newsletter;