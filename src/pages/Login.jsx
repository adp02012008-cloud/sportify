import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';

export const Login = () => {
  const [email, setEmail] = useState('alex@soundwave.io');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const { login } = useUser();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    login(email.trim(), password, rememberMe);
    addToast('Welcome back to SoundWave!', 'success');
    navigate('/');
  };

  const handleGoogleLogin = () => {
    login('google.user@soundwave.io', 'googlePass', true);
    addToast('Logged in with Google account', 'success');
    navigate('/');
  };

  const handleDemoGuest = () => {
    login('guest@soundwave.io', 'demo', true);
    addToast('Logged in as SoundWave Explorer', 'success');
    navigate('/');
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '36px',
          borderRadius: '20px',
          background: 'rgba(18, 18, 28, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img
            src="/soundwave-logo.svg"
            alt="SoundWave"
            style={{ width: '52px', height: '52px', margin: '0 auto 12px auto', display: 'block' }}
          />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Welcome to SoundWave
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
            Sign in to access your playlists, liked tracks & lossless streaming
          </p>
        </div>

        {/* Google / Demo 1-Click Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '11px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'background var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={handleDemoGuest}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '10px',
              borderRadius: '10px',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              color: 'var(--accent-cyan)',
              fontSize: '0.86rem',
              fontWeight: 600,
              transition: 'background var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(6, 182, 212, 0.18)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)'}
          >
            <Sparkles size={16} />
            <span>Instant 1-Click Guest Login</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>or email</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
              Email address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#fff',
                  fontSize: '0.92rem'
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Password
              </label>
              <button
                type="button"
                onClick={() => addToast('Reset link sent to your email', 'info')}
                style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)' }}
              >
                Forgot password?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#fff',
                  fontSize: '0.92rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
            />
            <label htmlFor="rememberMe" style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              Remember me on this browser
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '13px', borderRadius: '10px', fontSize: '0.95rem', marginTop: '6px' }}
          >
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'var(--accent-cyan)', fontWeight: 600, textDecoration: 'none' }}>
            Sign up for SoundWave
          </Link>
        </div>
      </div>
    </div>
  );
};
