import { useState } from 'react';

interface LoginWithCodeProps {
  onSuccess: () => void;
}

const LoginWithCode: React.FC<LoginWithCodeProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://footbal-voice.vercel.app/api/send-login-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        setCodeSent(true);
      } else {
        setError(data.error || 'Eroare la trimiterea codului');
      }
    } catch {
      setError('Eroare la trimiterea codului');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://footbal-voice.vercel.app/api/verify-login-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await res.json();
      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || 'Cod invalid');
      }
    } catch {
      setError('Eroare la verificarea codului');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Autentificare Admin</h2>
      {!codeSent ? (
        <>
          <input
            type="email"
            placeholder="Email admin"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
          <button
            onClick={handleSendCode}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Trimite cod pe email
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Cod primit pe email"
            value={code}
            onChange={e => setCode(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
          <button
            onClick={handleVerifyCode}
            className="bg-green-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Verifică codul
          </button>
        </>
      )}
      {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
  );
};

export default LoginWithCode;
