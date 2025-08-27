import { useState, useEffect } from 'react';
import ContactEditor from './ContactEditor';

interface PageEditorProps {
  slug: string;
  initialContent?: string;
  onSave?: (content: string) => void;
}

const PageEditor: React.FC<PageEditorProps> = ({ slug, initialContent = '', onSave }) => {
  // Structură pentru pagina Despre
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const [newValue, setNewValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialContent) {
      try {
        const parsed = JSON.parse(initialContent);
        setMission(parsed.mission || '');
        setVision(parsed.vision || '');
        setValues(parsed.values || []);
      } catch {
        setMission(initialContent);
        setVision('');
        setValues([]);
      }
    }
  }, [initialContent]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = slug === 'about'
        ? { content: JSON.stringify({ mission, vision, values }) }
        : { content: mission };
      const res = await fetch(`https://footbal-voice.vercel.app/api/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Pagina a fost salvată!');
        if (onSave) onSave(payload.content);
      } else {
        setError(data.error || 'Eroare la salvare');
      }
    } catch {
      setError('Eroare la salvare');
    } finally {
      setLoading(false);
    }
  };

  const handleAddValue = () => {
    if (newValue.trim()) {
      setValues([...values, newValue.trim()]);
      setNewValue('');
    }
  };

  const handleRemoveValue = (idx: number) => {
    setValues(values.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Editează pagina: {slug === 'about' ? 'Despre noi' : 'Contact'}</h2>
      {slug === 'about' ? (
        <>
          <label className="block font-semibold mb-2">Misiunea Noastră</label>
          <textarea
            value={mission}
            onChange={e => setMission(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
            placeholder="Scrie misiunea..."
          />
          <label className="block font-semibold mb-2">Viziunea Noastră</label>
          <textarea
            value={vision}
            onChange={e => setVision(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
            placeholder="Scrie viziunea..."
          />
          <label className="block font-semibold mb-2">Valorile Noastre</label>
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newValue}
                onChange={e => setNewValue(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded"
                placeholder="Adaugă o valoare..."
              />
              <button
                type="button"
                onClick={handleAddValue}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >Adaugă</button>
            </div>
            <ul className="list-disc pl-6">
              {values.map((val, idx) => (
                <li key={idx} className="flex items-center justify-between mb-1">
                  <span>{val}</span>
                  <button type="button" onClick={() => handleRemoveValue(idx)} className="text-red-500 ml-2">Șterge</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 rounded p-4 mb-4">
            <h3 className="font-bold mb-2">Preview public</h3>
            <div className="mb-2"><strong>Misiune:</strong> {mission}</div>
            <div className="mb-2"><strong>Viziune:</strong> {vision}</div>
            <div><strong>Valori:</strong> {values.join(', ')}</div>
          </div>
        </>
      ) : (
        <ContactEditor initialContent={initialContent} onSave={onSave} />
      )}
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
