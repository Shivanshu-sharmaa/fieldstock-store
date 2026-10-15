import { handleLogin } from '../src/server/auth.js';

export default function login(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  return handleLogin(req, res);
}
