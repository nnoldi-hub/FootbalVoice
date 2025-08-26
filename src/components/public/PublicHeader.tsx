import React, { useState } from 'react';
import { Search, Menu, X, Volume2, Mic } from 'lucide-react';

interface PublicHeaderProps {
  onSearch: (term: string) => void;
  activeSection?: string;
  onSectionChange: (section: string) => void;
}

const PublicHeader: React.FC<PublicHeaderProps> = ({ 
  onSearch, 
  activeSection = 'home',
  onSectionChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    if (activeSection !== 'home') {
      onSectionChange('home');
    }
  };

  const handleNavClick = (section: string) => {
    onSectionChange(section);
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { id: 'home', label: 'Acasă' },
    { id: 'articles', label: 'Articole' },
    { id: 'about', label: 'Despre' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative">
              <Volume2 className="w-8 h-8 text-blue-600" />
              <Mic className="w-4 h-4 text-green-500 absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Football<span className="text-green-500">Voice</span>
              </h1>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Caută articole..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Caută articole..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left py-2 font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-600 bg-blue-50 px-3 rounded'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;