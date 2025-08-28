export default function handler(req, res) {
  if (req.method === 'POST') {
    // Exemplu: returnează succes pentru orice login
    res.status(200).json({ success: true, token: 'dummy-token' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
