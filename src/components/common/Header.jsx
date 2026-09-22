import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, User, Settings, LogOut, LogIn, Sparkles, ExternalLink } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();
  const { addToast } = useToast();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    addToast('Signed out of SoundWave', 'info');
    navigate('/login');
  };

  return (
    <header style={{
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10, 10, 15, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      {/* Back / Forward History Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            transition: 'background var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => navigate(1)}
          aria-label="Go forward"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            transition: 'background var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          className="badge"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'rgba(6, 182, 212, 0.12)',
            color: '#38bdf8',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'default'
          }}
        >
          <Sparkles size={14} />
          <span>PRO LOSSLESS AUDIO</span>
        </div>

        {/* User Profile / Menu */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          {user ? (
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '4px 12px 4px 6px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#f8fafc' }}>
                {user.name}
              </span>
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" className="btn-secondary" style={{ padding: '7px 16px', fontSize: '0.85rem' }}>
                Log in
              </Link>
              <Link to="/signup" className="btn-primary" style={{ padding: '7px 16px', fontSize: '0.85rem' }}>
                Sign up
              </Link>
            </div>
          )}

          {/* User Dropdown */}
          {dropdownOpen && user && (
            <div
              className="glass-dropdown"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '220px',
                padding: '8px',
                zIndex: 200,
                animation: 'fadeDown 0.15s ease'
              }}
            >
              <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{user.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', marginTop: '4px', fontWeight: 600 }}>
                  {user.tier}
                </div>
              </div>

              <div style={{ padding: '6px 0' }}>
                <Link
                  to="/settings"
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    fontSize: '0.86rem',
                    color: 'var(--text-primary)',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Settings size={16} color="var(--text-secondary)" />
                  <span>Settings</span>
                </Link>

                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    fontSize: '0.86rem',
                    color: '#f87171',
                    textAlign: 'left',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <LogOut size={16} />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
