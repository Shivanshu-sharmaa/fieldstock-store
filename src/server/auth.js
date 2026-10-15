import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  const missingConfig = ['DB_HOST', 'DB_USER', 'DB_NAME'].filter(
    (key) => !process.env[key]
  );

  if (missingConfig.length > 0) {
    const error = new Error('Database configuration is missing.');
    error.code = 'DB_CONFIG_MISSING';
    throw error;
  }

  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 3,
    });
  }

  return pool;
}

function sendError(error, res) {
  if (error.code === 'DB_CONFIG_MISSING') {
    return res.status(503).json({
      message: 'Account service is not configured yet.',
    });
  }

  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ message: 'Email is already registered.' });
  }

  console.error(error);
  return res.status(500).json({ message: 'Server error.' });
}

export async function handleSignup(req, res) {
  const body = req.body ?? {};
  const { name, email, password } = body;

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string'
  ) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters.',
    });
  }

  try {
    const db = getPool();
    const normalizedEmail = email.trim();
    const [existing] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [normalizedEmail]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name.trim(), normalizedEmail, hashedPassword]
    );

    return res.status(201).json({ message: 'Account created successfully!' });
  } catch (error) {
    return sendError(error, res);
  }
}

export async function handleLogin(req, res) {
  const body = req.body ?? {};
  const { email, password } = body;

  if (
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string' ||
    !password
  ) {
    return res.status(400).json({
      message: 'Email and password are required.',
    });
  }

  try {
    const [users] = await getPool().execute(
      'SELECT id, name, email, password FROM users WHERE email = ?',
      [email.trim()]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = users[0];
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.json({
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return sendError(error, res);
  }
}
