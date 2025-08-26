import React from 'react';
import { Mic, Volume2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Volume2 className="w-8 h-8 text-white" />
              <Mic className="w-4 h-4 text-green-300 absolute -bottom-1 -right-1" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-wide">
                Football<span className="text-green-300">Voice</span>
              </h1>
              <p className="text-blue-200 text-lg font-light">
                Unde pasiunea pentru fotbal devine cuvânt
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-green-400 via-blue-400 to-green-400"></div>
    </header>
  );
};

export default Header;