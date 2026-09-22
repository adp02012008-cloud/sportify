import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  User, 
  LogOut, 
  Settings, 
  CreditCard,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface HeaderProps {
  toggleFriendActivity?: () => void;
  showFriendActivity?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleFriendActivity, showFriendActivity }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout, switchDemoRole } = useAuth();
  const { addToast } = useToast();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isSearchPage = location.pathname.startsWith('/search');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setRoleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 bg-[#0c0d14]/80 backdrop-blur-md border-b border-[#22243a]">
      {/* Left: Navigation Buttons & Optional Inline Search */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go Back"
            className="w-8 h-8 rounded-full bg-[#1a1b2e] hover:bg-[#252849] text-gray-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => navigate(1)}
            aria-label="Go Forward"
            className="w-8 h-8 rounded-full bg-[#1a1b2e] hover:bg-[#252849] text-gray-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Search Bar for fast access */}
        {!isSearchPage ? (
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative">
            <Search size={16} className="absolute left-3 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="What do you want to play?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-56 md:w-72 pl-9 pr-4 py-1.5 rounded-full bg-[#161726] border border-[#262843] focus:border-cyan-500 focus:w-80 text-xs text-white placeholder-gray-500 outline-none transition-all duration-300"
            />
          </form>
        ) : null}
      </div>

      {/* Right: Actions, Demo Switcher, User Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Demo Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="hidden md:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-[#1e2038] hover:bg-[#282b4c] text-cyan-300 border border-cyan-500/30 transition-all"
            title="Switch Demo Role"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Role: {user?.role || 'GUEST'}</span>
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#161728] border border-[#2c2f52] shadow-2xl p-1 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Switch Demo Profile
              </div>
              <button
                onClick={() => {
                  switchDemoRole('USER');
                  setRoleMenuOpen(false);
                  addToast('Switched to Standard User', 'info');
                }}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between ${
                  user?.role === 'USER' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-gray-300 hover:bg-[#20223a]'
                }`}
              >
                <span>Standard Free User</span>
                {user?.role === 'USER' && <CheckCircle2 size={14} />}
              </button>
              <button
                onClick={() => {
                  switchDemoRole('PREMIUM_USER');
                  setRoleMenuOpen(false);
                  addToast('Switched to Premium User', 'success');
                }}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between ${
                  user?.role === 'PREMIUM_USER' ? 'bg-purple-500/20 text-purple-300 font-semibold' : 'text-gray-300 hover:bg-[#20223a]'
                }`}
              >
                <span>Premium Subscriber</span>
                {user?.role === 'PREMIUM_USER' && <CheckCircle2 size={14} />}
              </button>
              <button
                onClick={() => {
                  switchDemoRole('ADMIN');
                  setRoleMenuOpen(false);
                  addToast('Switched to Administrator', 'info');
                }}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between ${
                  user?.role === 'ADMIN' ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-gray-300 hover:bg-[#20223a]'
                }`}
              >
                <span>Admin Manager</span>
                {user?.role === 'ADMIN' && <CheckCircle2 size={14} />}
              </button>
            </div>
          )}
        </div>

        {/* Upgrade Pill for Free Users */}
        {user?.role !== 'PREMIUM_USER' && user?.role !== 'ADMIN' && (
          <button
            onClick={() => navigate('/subscription')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md shadow-cyan-500/20"
          >
            <Sparkles size={13} className="text-black" />
            <span className="hidden sm:inline">Explore Premium</span>
            <span className="sm:hidden">Upgrade</span>
          </button>
        )}

        {/* Admin Dashboard shortcut */}
        {user?.role === 'ADMIN' && (
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
          >
            <ShieldCheck size={14} />
            <span className="hidden md:inline">Admin Panel</span>
          </button>
        )}

        {/* Friend Activity drawer toggle */}
        {toggleFriendActivity && (
          <button
            onClick={toggleFriendActivity}
            aria-label="Friend Activity"
            title="Friend Activity Stream"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              showFriendActivity
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : 'bg-[#1a1b2e] text-gray-300 hover:text-white hover:bg-[#252849]'
            }`}
          >
            <Users size={16} />
          </button>
        )}

        {/* User Account / Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {isAuthenticated ? (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-[#181a2e] hover:bg-[#232542] border border-[#2b2e50] transition-colors"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User Avatar'}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-cyan-400/40"
              />
              <span className="text-xs font-medium text-gray-200 hidden sm:inline max-w-[100px] truncate">
                {user?.name || 'My Profile'}
              </span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Log in
            </button>
          )}

          {/* User Menu Dropdown */}
          {dropdownOpen && isAuthenticated && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#151627] border border-[#272a4b] shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-[#242747] mb-1">
                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                  {user?.role}
                </span>
              </div>

              <button
                onClick={() => {
                  navigate('/profile');
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#20223d] rounded-lg flex items-center gap-2 transition-colors"
              >
                <User size={15} />
                Profile & Statistics
              </button>

              <button
                onClick={() => {
                  navigate('/subscription');
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#20223d] rounded-lg flex items-center gap-2 transition-colors"
              >
                <CreditCard size={15} />
                Subscription Plan
              </button>

              <button
                onClick={() => {
                  navigate('/payments');
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#20223d] rounded-lg flex items-center gap-2 transition-colors"
              >
                <Bell size={15} />
                Payment Receipts
              </button>

              <button
                onClick={() => {
                  navigate('/settings');
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#20223d] rounded-lg flex items-center gap-2 transition-colors"
              >
                <Settings size={15} />
                Playback Settings
              </button>

              {user?.role === 'ADMIN' && (
                <button
                  onClick={() => {
                    navigate('/admin');
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-emerald-400 hover:bg-[#20223d] rounded-lg flex items-center gap-2 transition-colors"
                >
                  <ShieldCheck size={15} />
                  Admin Dashboard
                </button>
              )}

              <div className="my-1 border-t border-[#242747]" />

              <button
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                  addToast('Signed out successfully', 'info');
                }}
                className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2 transition-colors"
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
