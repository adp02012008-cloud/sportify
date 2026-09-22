import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  Search,
  Compass,
  Library,
  Heart,
  PlusSquare,
  Headphones,
  BookOpen,
  Sparkles,
  ShieldAlert,
  Settings,
  ListMusic
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Playlist } from '../../types';

interface SidebarProps {
  playlists?: Playlist[];
  onOpenCreatePlaylist?: () => void;
  onOpenBlend?: (friendName?: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  playlists = [],
  onOpenCreatePlaylist,
  onOpenBlend,
}) => {
  const { user, isAdmin } = useAuth();

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 ${
      isActive
        ? 'bg-white/10 text-white font-semibold shadow-sm'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <aside className="w-60 min-w-[15rem] h-full hidden md:flex flex-col bg-[#0b0c14] border-r border-[#1e2035] px-3.5 py-4 overflow-hidden z-30 select-none">
      {/* SoundWave Logo */}
      <Link to="/" className="flex items-center gap-2.5 px-2 py-2 mb-3 group">
        <img
          src="/soundwave-logo.svg"
          alt="SoundWave"
          className="w-8 h-8 drop-shadow-[0_0_12px_rgba(6,182,212,0.45)] group-hover:scale-105 transition-transform"
        />
        <div>
          <div className="font-extrabold text-base tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            SoundWave
          </div>
          <div className="text-[9px] text-gray-500 font-semibold tracking-widest uppercase">
            Music & Studio
          </div>
        </div>
      </Link>

      {/* Primary Navigation */}
      <nav className="flex flex-col gap-1">
        <NavLink to="/" className={navItemClass}>
          <Home size={17} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/search" className={navItemClass}>
          <Search size={17} />
          <span>Search</span>
        </NavLink>

        <NavLink to="/explore" className={navItemClass}>
          <Compass size={17} />
          <span>Explore</span>
        </NavLink>

        <NavLink to="/library" className={navItemClass}>
          <Library size={17} />
          <span>Your Library</span>
        </NavLink>
      </nav>

      {/* Media & Content Sections */}
      <div className="mt-4 flex flex-col gap-1">
        <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
          Audio Formats
        </div>

        <NavLink to="/podcasts" className={navItemClass}>
          <Headphones size={17} />
          <span>Podcasts</span>
        </NavLink>

        <NavLink to="/audiobooks" className={navItemClass}>
          <BookOpen size={17} />
          <span>Audiobooks</span>
        </NavLink>
      </div>

      {/* Playlists & Social */}
      <div className="mt-4 flex flex-col gap-1">
        <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
          Playlists & Mixes
        </div>

        {onOpenCreatePlaylist && (
          <button
            onClick={onOpenCreatePlaylist}
            className="flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-xs sm:text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all text-left"
          >
            <div className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <PlusSquare size={13} />
            </div>
            <span>Create Playlist</span>
          </button>
        )}

        <NavLink to="/liked" className={navItemClass}>
          <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white">
            <Heart size={12} fill="#fff" />
          </div>
          <span>Liked Songs</span>
        </NavLink>

        {onOpenBlend && (
          <button
            onClick={() => onOpenBlend('Alex Mercer')}
            className="flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-xs sm:text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all text-left"
          >
            <div className="w-5 h-5 rounded bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white">
              <Sparkles size={12} />
            </div>
            <span>SoundWave Blend</span>
          </button>
        )}
      </div>

      {/* Scrollable Quick Playlists List */}
      {playlists.length > 0 && (
        <div className="mt-3 flex-1 overflow-y-auto pr-1 border-t border-[#1a1c2e] pt-2 space-y-0.5">
          {playlists.slice(0, 8).map((p) => (
            <NavLink
              key={p.id}
              to={`/playlist/${p.id}`}
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded-lg text-xs truncate transition-colors ${
                  isActive ? 'text-cyan-400 font-semibold bg-white/5' : 'text-gray-400 hover:text-gray-200'
                }`
              }
            >
              {p.name}
            </NavLink>
          ))}
        </div>
      )}

      {/* Admin Link (if admin) */}
      {isAdmin && (
        <div className="mt-auto pt-2 border-t border-[#1a1c2e]">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-xs transition-all ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                  : 'text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-500/10'
              }`
            }
          >
            <ShieldAlert size={16} />
            <span>Admin Panel</span>
          </NavLink>
        </div>
      )}

      {/* Footer / Settings */}
      <div className="pt-2">
        <NavLink to="/settings" className={navItemClass}>
          <Settings size={17} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};
