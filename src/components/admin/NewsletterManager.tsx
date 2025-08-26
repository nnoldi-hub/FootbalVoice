import React, { useState, useEffect } from 'react';
import { Send, Plus, Edit2, Trash2, Users, Calendar, Mail } from 'lucide-react';
import { Article, NewsletterTemplate, Subscriber } from '../../types';

interface NewsletterManagerProps {
  articles: Article[];
}

const NewsletterManager: React.FC<NewsletterManagerProps> = ({ articles }) => {
  const [templates, setTemplates] = useState<NewsletterTemplate[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<NewsletterTemplate | null>(null);

  useEffect(() => {
    // Load templates and subscribers
    const savedTemplates = localStorage.getItem('footballvoice-newsletter-templates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }

    const savedSubscribers = localStorage.getItem('footballvoice-subscribers');
    if (savedSubscribers) {
      setSubscribers(JSON.parse(savedSubscribers));
    }
  }, []);

  const saveTemplates = (newTemplates: NewsletterTemplate[]) => {
    setTemplates(newTemplates);
    localStorage.setItem('footballvoice-newsletter-templates', JSON.stringify(newTemplates));
  };

  const createTemplate = () => {
    const newTemplate: NewsletterTemplate = {
      id: Date.now().toString(),
      name: 'Șablon Nou',
      subject: 'FootballVoice Newsletter',
      content: `
        <h2>Bună ziua, {{name}}!</h2>
        <p>Iată cele mai noi articole de pe FootballVoice:</p>
        {{articles}}
        <p>Cu respect,<br>Echipa FootballVoice</p>
      `,
      createdAt: new Date().toISOString()
    };

    const updatedTemplates = [newTemplate, ...templates];
    saveTemplates(updatedTemplates);
    setEditingTemplate(newTemplate);
    setIsCreating(true);
  };

  const updateTemplate = (template: NewsletterTemplate) => {
    const updatedTemplates = templates.map(t => 
      t.id === template.id ? template : t
    );
    saveTemplates(updatedTemplates);
    setEditingTemplate(null);
    setIsCreating(false);
  };

  const deleteTemplate = (id: string) => {
    if (confirm('Sigur doriți să ștergeți acest șablon?')) {
      const updatedTemplates = templates.filter(t => t.id !== id);
      saveTemplates(updatedTemplates);
    }
  };

  const sendNewsletter = (template: NewsletterTemplate) => {
    const activeSubscribers = subscribers.filter(s => s.active);
    
    if (activeSubscribers.length === 0) {
      alert('Nu există abonați activi pentru a trimite newsletter-ul.');
      return;
    }

    // Simulate sending newsletter using the template
    console.log('Sending newsletter:', template.name, 'to', activeSubscribers.length, 'subscribers');
    alert(`Newsletter "${template.name}" trimis către ${activeSubscribers.length} abonați!`);
  };

  const activeSubscribers = subscribers.filter(s => s.active);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestionare Newsletter</h1>
          <p className="text-gray-600 mt-1">
            Creați și trimiteți newsletter-uri către {activeSubscribers.length} abonați activi
          </p>
        </div>
        <button
          onClick={createTemplate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Șablon Nou
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Șabloane</p>
              <p className="text-2xl font-bold text-gray-800">{templates.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Abonați Activi</p>
              <p className="text-2xl font-bold text-gray-800">{activeSubscribers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Articole Publicate</p>
              <p className="text-2xl font-bold text-gray-800">
                {articles.filter(a => a.published).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Template Editor */}
      {(isCreating || editingTemplate) && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {isCreating ? 'Creează Șablon Nou' : 'Editează Șablon'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nume Șablon
              </label>
              <input
                type="text"
                value={editingTemplate?.name || ''}
                onChange={(e) => setEditingTemplate(prev => 
                  prev ? { ...prev, name: e.target.value } : null
                )}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Numele șablonului"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subiect Email
              </label>
              <input
                type="text"
                value={editingTemplate?.subject || ''}
                onChange={(e) => setEditingTemplate(prev => 
                  prev ? { ...prev, subject: e.target.value } : null
                )}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Subiectul email-ului"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conținut Șablon
              </label>
              <textarea
                value={editingTemplate?.content || ''}
                onChange={(e) => setEditingTemplate(prev => 
                  prev ? { ...prev, content: e.target.value } : null
                )}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Conținutul șablonului (HTML)"
              />
              <p className="text-sm text-gray-500 mt-2">
                Folosiți {'{{name}}'} pentru numele abonatului și {'{{articles}}'} pentru lista de articole.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => editingTemplate && updateTemplate(editingTemplate)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Salvează
              </button>
              <button
                onClick={() => {
                  setEditingTemplate(null);
                  setIsCreating(false);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Șabloane Newsletter</h3>
        </div>

        {templates.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nu există șabloane</h3>
            <p className="mt-1 text-sm text-gray-500">
              Creați primul șablon de newsletter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {templates.map(template => (
              <div key={template.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-800">
                      {template.name}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Subiect: {template.subject}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      Creat pe {new Date(template.createdAt).toLocaleDateString('ro-RO')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingTemplate(template)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteTemplate(template.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => sendNewsletter(template)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Trimite
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterManager;
