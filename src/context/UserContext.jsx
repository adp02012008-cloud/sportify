import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

const DEFAULT_USER = {
  id: 'usr-1',
  name: 'Alex Vance',
  email: 'alex@soundwave.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  tier: 'SoundWave Hi-Fi Premium',
  memberSince: '2023',
  country: 'United States'
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('soundwave_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('soundwave_settings');
      return saved ? JSON.parse(saved) : {
        audioQuality: 'high', // normal, high, lossless
        crossfade: 3, // seconds
        normalizeVolume: true,
        autoplaySimilar: true,
        accentTheme: 'cyan', // cyan, purple, emerald, pink
        privateSession: false,
        emailNotifications: true,
        pushNotifications: true
      };
    } catch {
      return {
        audioQuality: 'high',
        crossfade: 3,
        normalizeVolume: true,
        autoplaySimilar: true,
        accentTheme: 'cyan',
        privateSession: false,
        emailNotifications: true,
        pushNotifications: true
      };
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('soundwave_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('soundwave_user');
      }
    } catch (e) {
      console.error('Error saving user to storage', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('soundwave_settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings', e);
    }
  }, [settings]);

  const login = (email, password, remember = true) => {
    const loggedUser = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      tier: 'SoundWave Hi-Fi Premium',
      memberSince: '2024',
      country: 'Global'
    };
    setUser(loggedUser);
    return true;
  };

  const signup = (name, email, password) => {
    const newUser = {
      id: 'usr-' + Date.now(),
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      tier: 'SoundWave Free',
      memberSince: '2024',
      country: 'Global'
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateSettings = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout, settings, updateSettings }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
