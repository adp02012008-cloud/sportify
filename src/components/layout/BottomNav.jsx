import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Heart, Settings } from 'lucide-react';

export const BottomNav = () => {
  const navItemStyle = ({ isActive }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    flex: 1,
    color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
    fontSize: '0.72rem',
    fontWeight: isActive ? 700 : 500,
    textDecoration: 'none',
    transition: 'color var(--transition-fast)'
  });

  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        display: 'none',
        height: 'var(--mobile-nav-height)',
        background: 'rgba(12, 12, 18, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 8px'
      }}
    >
      <NavLink to="/" style={navItemStyle}>
        <Home size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/search" style={navItemStyle}>
        <Search size={20} />
        <span>Search</span>
      </NavLink>

      <NavLink to="/library" style={navItemStyle}>
        <Library size={20} />
        <span>Library</span>
      </NavLink>

      <NavLink to="/liked" style={navItemStyle}>
        <Heart size={20} />
        <span>Liked</span>
      </NavLink>

      <NavLink to="/settings" style={navItemStyle}>
        <Settings size={20} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
};
