import React from 'react';
import { Category } from '../../types';

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  articleCounts: Record<Category, number>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  articleCounts
}) => {
  const categories = [
    { id: 'all' as Category, label: 'Toate', icon: '📰' },
    { id: 'match-analysis' as Category, label: 'Analize Meciuri', icon: '⚽' },
    { id: 'player-portraits' as Category, label: 'Portrete Jucători', icon: '👤' },
    { id: 'news-transfers' as Category, label: 'Știri & Transferuri', icon: '📈' },
    { id: 'predictions' as Category, label: 'Predicții', icon: '🔮' },
    { id: 'imaginary-interviews' as Category, label: 'Interviuri Imaginare', icon: '🎙️' },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorii</h3>
      <div className="space-y-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{category.icon}</span>
              <span className="font-medium">{category.label}</span>
            </div>
            <span className={`text-sm px-2 py-1 rounded-full ${
              selectedCategory === category.id
                ? 'bg-blue-200 text-blue-800'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {category.id === 'all' 
                ? Object.values(articleCounts).reduce((a, b) => a + b, 0)
                : articleCounts[category.id] || 0
              }
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
