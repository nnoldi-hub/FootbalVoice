import React from 'react';
import { BarChart3, User, Newspaper, Italic as Crystal, MessageCircle, Grid } from 'lucide-react';
import { Category } from '../types';

interface CategoryMenuProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categoryConfig = {
  all: { icon: Grid, label: 'Toate Articolele', color: 'gray' },
  'match-analysis': { icon: BarChart3, label: 'Analize Meciuri', color: 'blue' },
  'player-portraits': { icon: User, label: 'Portrete Jucători', color: 'green' },
  'news-transfers': { icon: Newspaper, label: 'Știri & Transferuri', color: 'purple' },
  'predictions': { icon: Crystal, label: 'Predicții', color: 'orange' },
  'imaginary-interviews': { icon: MessageCircle, label: 'Interviuri Imaginare', color: 'red' },
};

const CategoryMenu: React.FC<CategoryMenuProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Categorii</h3>
      <div className="space-y-3">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const IconComponent = config.icon;
          const isSelected = selectedCategory === key;
          
          return (
            <button
              key={key}
              onClick={() => onCategoryChange(key as Category)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                isSelected
                  ? `bg-${config.color}-500 text-white shadow-lg transform scale-105`
                  : `hover:bg-${config.color}-50 text-gray-700 hover:text-${config.color}-600`
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm font-medium">{config.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMenu;