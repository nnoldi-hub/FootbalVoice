import { useState } from 'react';

interface AdminProfileProps {
  email: string;
  onUpdateProfile: (data: { name?: string; password?: string }) => void;
}

const AdminProfile: React.FC<AdminProfileProps> = ({ email, onUpdateProfile }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name && !password) {
      setError('Completează cel puțin un câmp!');
      setSuccess(null);
      return;
    }
    onUpdateProfile({ name, password });
    setSuccess('Profil actualizat!');
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Profil Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" value={email} disabled className="w-full px-3 py-2 border rounded bg-gray-100" />
        </div>
        <div>
          <label className="block text-gray-700">Nume</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Parolă nouă</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Actualizează</button>
        {success && <div className="text-green-600">{success}</div>}
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
};

export default AdminProfile;
