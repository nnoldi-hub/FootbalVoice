import React, { useState, useEffect } from 'react';
import { Save, X, Tag } from 'lucide-react';
import { Article, Category } from '../types';

interface ArticleEditorProps {
  article: Partial<Article>;
  category: Category;
  isEditing: boolean;
  onSave: (article: Article) => void;
  onCancel: () => void;
  onChange: (article: Partial<Article>) => void;
}

const categoryLabels = {
  'all': 'Toate',
  'match-analysis': 'Analize Meciuri',
  'player-portraits': 'Portrete Jucători',
  'news-transfers': 'Știri & Transferuri',
  'predictions': 'Predicții',
  'imaginary-interviews': 'Interviuri Imaginare',
};

const predefinedTags = {
  'match-analysis': ['tactici', 'analiză', 'performanță', 'gol', 'apărare', 'atac'],
  'player-portraits': ['talent', 'carieră', 'statistici', 'personalitate', 'tehnica'],
  'news-transfers': ['transfer', 'contract', 'negociere', 'sumă', 'club'],
  'predictions': ['pronostic', 'cote', 'rezultat', 'campionat', 'finale'],
  'imaginary-interviews': ['exclusiv', 'declarații', 'viitor', 'planuri', 'sentimente'],
  'all': ['fotbal', 'sport', 'echipă', 'jucător', 'antrenor']
};

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  article,
  category,
  isEditing,
  onSave,
  onCancel,
  onChange
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    setTitle(article.title || '');
    setContent(article.content || '');
    setTags(article.tags || []);
  }, [article]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('Te rog completează titlul și conținutul articolului.');
      return;
    }

    if (category === 'all') {
      alert('Te rog selectează o categorie specifică pentru articol.');
      return;
    }

    const articleToSave: Article = {
      id: article.id || '',
      title: title.trim(),
      content: content.trim(),
      category: category,
      tags,
      publishedAt: article.publishedAt || new Date().toISOString(),
    };

    onSave(articleToSave);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTags([]);
    setNewTag('');
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      onChange({ ...article, tags: newTags });
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    onChange({ ...article, tags: newTags });
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    onChange({ ...article, title: newTitle });
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onChange({ ...article, content: newContent });
  };

  const availableTags = predefinedTags[category] || predefinedTags['all'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          {isEditing ? 'Editează Articolul' : 'Creează Articol Nou'}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Categoria:</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {categoryLabels[category]}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Titlul Articolului *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Introdu titlul articolului..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Conținutul Articolului *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Scrie conținutul articolului aici..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical"
          />
        </div>

        {/* Tags Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Tag className="w-4 h-4 inline mr-1" />
            Tag-uri
          </label>
          
          {/* Current Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Add New Tag */}
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Adaugă un tag nou..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag(newTag);
                }
              }}
            />
            <button
              onClick={() => addTag(newTag)}
              disabled={!newTag.trim()}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Adaugă
            </button>
          </div>

          {/* Predefined Tags */}
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                disabled={tags.includes(tag)}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${
                  tags.includes(tag)
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || category === 'all'}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <Save className="w-5 h-5" />
            <span>{isEditing ? 'Actualizează' : 'Salvează'}</span>
          </button>
          
          <button
            onClick={handleCancel}
            className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <X className="w-5 h-5" />
            <span>Anulează</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;