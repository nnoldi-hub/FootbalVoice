import React, { useState, useEffect } from 'react';
import { RefreshCw, Lightbulb } from 'lucide-react';
import { Category } from '../types';

interface SuggestionPanelProps {
  category: Category;
  onUseSuggestion: (title: string) => void;
}

const suggestionData = {
  'match-analysis': [
    'Analiza tactică: Cum a câștigat Barcelona meciul cu Real Madrid',
    'Momentele decisive din Manchester City vs Liverpool',
    'De ce a eșuat atacul lui PSG în meciul cu Bayern',
    'Analiza defensivă: Secretele succesului lui Inter',
    'Cum a schimbat VAR-ul rezultatul meciului',
  ],
  'player-portraits': [
    'Erling Haaland: Fenomenul care redefinește atacul modern',
    'Kylian Mbappé: Viteza care schimbă fotbalul',
    'Vinícius Jr: Artistul de pe flancul stâng',
    'Pedri: Viitorul mijlocului Barcelonei',
    'Jude Bellingham: Liderul de doar 20 de ani',
  ],
  'news-transfers': [
    'Transferul verii: Unde va ajunge Mbappé?',
    'Planurile de mercato ale lui Manchester United',
    'De ce a plecat Messi de la Barcelona: Analiza completă',
    'Transferurile surpriză care au schimbat sezonul',
    'Cum influențează Fair Play Financiar transferurile',
  ],
  'predictions': [
    'Predicția pentru finala Champions League',
    'Cine va câștiga Premier League sezonul acesta?',
    'Surprizele din optimile Champions League',
    'Predicții pentru Campionatul European',
    'Care echipe vor retrograda în acest sezon?',
  ],
  'imaginary-interviews': [
    'Interviu exclusiv cu Lionel Messi despre viitorul său',
    'Cristiano Ronaldo dezvăluie secretele longevității',
    'Pep Guardiola explică filosofia sa tactică',
    'Kylian Mbappé despre presiunea de a fi cel mai bun',
    'Interviu cu Jürgen Klopp despre mentalitatea câștigătoare',
  ],
  'all': [
    'Fotbalul modern: Evoluția tacticilor în ultimii 10 ani',
    'Impactul tehnologiei asupra fotbalului contemporan',
    'Cum a schimbat pandemia fotbalul mondial',
  ]
};

const SuggestionPanel: React.FC<SuggestionPanelProps> = ({ category, onUseSuggestion }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const refreshSuggestions = () => {
    const categoryData = suggestionData[category] || suggestionData['all'];
    const shuffled = [...categoryData].sort(() => Math.random() - 0.5);
    setSuggestions(shuffled.slice(0, 3));
  };

  useEffect(() => {
    refreshSuggestions();
  }, [category]);

  if (category === 'all') return null;

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-bold text-gray-800">Sugestii</h3>
        </div>
        <button
          onClick={refreshSuggestions}
          className="p-2 text-orange-500 hover:bg-orange-100 rounded-lg transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onUseSuggestion(suggestion)}
            className="w-full text-left p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-orange-50 transition-all duration-200 text-sm text-gray-700 leading-relaxed"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionPanel;