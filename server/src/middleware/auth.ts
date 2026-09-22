import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';
import { MgUser, MemoryStore } from '../models/store';
import { isMemoryMode } from '../config/db';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized to access this route. Token missing.' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    let user: any;

    if (isMemoryMode()) {
      user = MemoryStore.users.find((u) => u.id === decoded.id || u._id === decoded.id);
    } else {
      user = await MgUser.findById(decoded.id).select('-password');
    }

    if (!user) {
      res.status(401).json({ success: false, message: 'User belonging to this token no longer exists.' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized. Invalid or expired token.' });
    return;
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `User role '${req.user?.role || 'Guest'}' is not authorized to access this route.`
      });
      return;
    }
    next();
  };
};

export const requirePremium = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const isPremium =
    req.user?.role === 'ADMIN' ||
    req.user?.role === 'PREMIUM_USER' ||
    req.user?.plan === 'PREMIUM_MONTHLY' ||
    req.user?.plan === 'PREMIUM_YEARLY';

  if (!isPremium) {
    res.status(403).json({
      success: false,
      message: 'SoundWave Premium membership is required to access this feature.',
      requireUpgrade: true
    });
    return;
  }
  next();
};
