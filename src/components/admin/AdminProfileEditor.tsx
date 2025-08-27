import { useState, useEffect } from 'react';

interface AdminProfile {
  name: string;
  email: string;
}

const fetchProfile = async (): Promise<AdminProfile | null> => {
  try {
    const res = await fetch('https://footbal-voice.vercel.app/api/admin/profile');
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const updateProfile = async (profile: AdminProfile): Promise<boolean> => {
  try {
    const res = await fetch('https://footbal-voice.vercel.app/api/admin/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    const data = await res.json();
    return data.success;
  } catch {
    return false;
  }
};

const AdminProfileEditor: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile>({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile().then(data => {
      if (data) setProfile(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const ok = await updateProfile(profile);
    if (ok) setSuccess('Profil actualizat!');
    else setError('Eroare la actualizare');
    setLoading(false);
  };

  if (loading) return <div>Se încarcă...</div>;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Profil administrator</h2>
      <label className="block mb-2 font-semibold">Nume</label>
      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />
      <label className="block mb-2 font-semibold">Email</label>
      <input
        type="email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
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

export default AdminProfileEditor;
