import { useState, useEffect } from 'react';

interface ContactEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
}

const ContactEditor: React.FC<ContactEditorProps> = ({ initialContent = '', onSave }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialContent) {
      try {
        const parsed = JSON.parse(initialContent);
        setEmail(parsed.email || '');
        setPhone(parsed.phone || '');
        setAddress(parsed.address || '');
        setMessage(parsed.message || '');
      } catch {
        setMessage(initialContent);
      }
    }
  }, [initialContent]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = { content: JSON.stringify({ email, phone, address, message }) };
      const res = await fetch('https://footbal-voice.vercel.app/api/pages/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Pagina Contact a fost salvată!');
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

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Editează pagina: Contact</h2>
      <label className="block font-semibold mb-2">Email de contact</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        placeholder="Email..."
      />
      <label className="block font-semibold mb-2">Telefon</label>
      <input
        type="text"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        placeholder="Telefon..."
      />
      <label className="block font-semibold mb-2">Adresă</label>
      <input
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        placeholder="Adresă..."
      />
      <label className="block font-semibold mb-2">Mesaj de întâmpinare</label>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        placeholder="Mesaj..."
      />
      <div className="bg-gray-50 rounded p-4 mb-4">
        <h3 className="font-bold mb-2">Preview public</h3>
        <div className="mb-2"><strong>Email:</strong> {email}</div>
        <div className="mb-2"><strong>Telefon:</strong> {phone}</div>
        <div className="mb-2"><strong>Adresă:</strong> {address}</div>
        <div><strong>Mesaj:</strong> {message}</div>
      </div>
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

export default ContactEditor;
