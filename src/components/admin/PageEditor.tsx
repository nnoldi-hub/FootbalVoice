import { useState, useEffect } from 'react';

interface PageEditorProps {
  slug: string;
  initialContent?: string;
  onSave?: (content: string) => void;
}

const PageEditor: React.FC<PageEditorProps> = ({ slug, initialContent = '', onSave }) => {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`https://footbal-voice.vercel.app/api/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Pagina a fost salvată!');
        if (onSave) onSave(content);
      } else {
        setError(data.error || 'Eroare la salvare');
      }
    } catch {
      setError('Eroare la salvare');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Editează pagina: {slug === 'about' ? 'Despre noi' : 'Contact'}</h2>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={12}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical mb-4"
        placeholder="Conținut pagină..."
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        Salvează
      </button>
      {success && <div className="text-green-600 mt-4">{success}</div>}
      {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
  );
};

export default PageEditor;
