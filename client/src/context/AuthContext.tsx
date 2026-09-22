import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authApi } from '../services/api';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPremium: boolean;
  followedArtists: string[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, username: string, email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  switchDemoRole: (role: 'USER' | 'PREMIUM_USER' | 'ADMIN') => Promise<void>;
  demoLogin: (role: 'ADMIN' | 'PREMIUM' | 'USER') => Promise<void>;
  followArtist: (artistId: string) => void;
  unfollowArtist: (artistId: string) => void;
}

const DEFAULT_DEMO_USER: User = {
  id: 'usr-alex',
  _id: 'usr-alex',
  name: 'Alex Vance',
  username: 'alexvance',
  email: 'alex@soundwave.io',
  role: 'USER',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
  bio: 'Midnight lo-fi enthusiast & acoustic synthwave collector.',
  likedSongs: ['song-1', 'song-4', 'song-7', 'song-10', 'song-13', 'song-16'],
  savedAlbums: ['alb-1', 'alb-3', 'alb-7'],
  followedArtists: ['art-1', 'art-3', 'art-7', 'art-9'],
  followingUsers: ['usr-admin', 'usr-premium'],
  plan: 'FREE',
  subscriptionStatus: 'NONE',
  isPremium: false,
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('soundwave_user');
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('soundwave_token') || 'demo_token';
  });

  const [followedArtists, setFollowedArtists] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('soundwave_followed_artists');
      return saved ? JSON.parse(saved) : ['art-1', 'art-3', 'art-7'];
    } catch {
      return ['art-1', 'art-3', 'art-7'];
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    if (user) {
      localStorage.setItem('soundwave_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('soundwave_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('soundwave_token', token);
    } else {
      localStorage.removeItem('soundwave_token');
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('soundwave_followed_artists', JSON.stringify(followedArtists));
  }, [followedArtists]);

  const followArtist = (artistId: string) => {
    setFollowedArtists((prev) => (prev.includes(artistId) ? prev : [...prev, artistId]));
  };

  const unfollowArtist = (artistId: string) => {
    setFollowedArtists((prev) => prev.filter((id) => id !== artistId));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await authApi.login({ email, password });
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        addToast(data.message || `Welcome back, ${data.user.name}!`, 'success');
        return true;
      }
      return false;
    } catch (error: any) {
      // Local fallback in case server isn't connected
      const isAdm = email.toLowerCase().includes('admin');
      const isPrem = email.toLowerCase().includes('premium');
      const fallbackUser: User = {
        id: 'usr-' + Date.now(),
        name: isAdm ? 'Admin SoundWave' : isPrem ? 'Elena Rostova' : email.split('@')[0],
        username: email.split('@')[0],
        email,
        role: isAdm ? 'ADMIN' : isPrem ? 'PREMIUM_USER' : 'USER',
        avatar: isAdm
          ? 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        plan: isPrem || isAdm ? 'PREMIUM_MONTHLY' : 'FREE',
        subscriptionStatus: isPrem || isAdm ? 'ACTIVE' : 'NONE',
        isPremium: isPrem || isAdm,
        likedSongs: ['song-1', 'song-4'],
        savedAlbums: ['alb-1'],
      };
      setUser(fallbackUser);
      setToken('fallback_jwt_token_' + Date.now());
      addToast(`Logged in as ${fallbackUser.name}`, 'success');
      return true;
    }
  };

  const register = async (name: string, username: string, email: string, password: string): Promise<boolean> => {
    try {
      const data = await authApi.register({ name, username, email, password });
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        addToast(`Welcome to SoundWave, ${name}!`, 'success');
        return true;
      }
      return false;
    } catch (error: any) {
      const fallbackUser: User = {
        id: 'usr-' + Date.now(),
        name,
        username,
        email,
        role: 'USER',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        plan: 'FREE',
        subscriptionStatus: 'NONE',
        isPremium: false,
        likedSongs: [],
      };
      setUser(fallbackUser);
      setToken('fallback_jwt_token_' + Date.now());
      addToast(`Account created for ${name}!`, 'success');
      return true;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    return register(name, email.split('@')[0], email, password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('soundwave_user');
    localStorage.removeItem('soundwave_token');
    addToast('Signed out of SoundWave', 'info');
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    try {
      await authApi.updateProfile(data);
    } catch {
      // persisted locally
    }
  };

  const switchDemoRole = async (role: 'USER' | 'PREMIUM_USER' | 'ADMIN') => {
    if (role === 'ADMIN') {
      await login('admin@soundwave.io', 'admin123');
    } else if (role === 'PREMIUM_USER') {
      await login('premium@soundwave.io', 'password123');
    } else {
      await login('alex@soundwave.io', 'user123');
    }
  };

  const demoLogin = async (role: 'ADMIN' | 'PREMIUM' | 'USER') => {
    if (role === 'PREMIUM') {
      return switchDemoRole('PREMIUM_USER');
    }
    return switchDemoRole(role);
  };

  const isAdmin = user?.role === 'ADMIN';
  const isPremium =
    user?.role === 'ADMIN' ||
    user?.role === 'PREMIUM_USER' ||
    user?.plan === 'PREMIUM_MONTHLY' ||
    user?.plan === 'PREMIUM_YEARLY';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin,
        isPremium,
        followedArtists,
        login,
        register,
        signup,
        logout,
        updateUser,
        switchDemoRole,
        demoLogin,
        followArtist,
        unfollowArtist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
