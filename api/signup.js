import { handleSignup } from '../src/server/auth.js';

export default function signup(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  return handleSignup(req, res);
}
