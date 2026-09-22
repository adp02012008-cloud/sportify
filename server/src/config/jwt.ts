import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'soundwave_super_secret_jwt_key_2026';

export const signToken = (payload: { id: string; role: string; email: string }): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
