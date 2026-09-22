import React from 'react';
import { User, ShieldCheck, Heart, Sparkles, Music, Disc3, Headphones, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { Playlist } from '../types';

interface ProfileProps {
  playlists: Playlist[];
}

export const Profile: React.FC<ProfileProps> = ({ playlists }) => {
  const { user, followedArtists } = useAuth();
  const { likedSongs } = useAudio();

  const userPlaylists = playlists.filter(
    (p) => p.ownerName === user?.name || p.ownerName === 'SoundWave User'
  );

  const topGenres = [
    { name: 'Synthwave / Retro', percent: 42, color: 'bg-cyan-400' },
    { name: 'Lo-Fi Beats', percent: 28, color: 'bg-purple-400' },
    { name: 'Cyberpunk Bass', percent: 18, color: 'bg-pink-400' },
    { name: 'Ambient & Space', percent: 12, color: 'bg-emerald-400' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Profile Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#171936] via-[#121429] to-[#0a0b14] border border-[#262a52] flex flex-col sm:flex-row items-center sm:items-end gap-6 shadow-2xl">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-2xl ring-4 ring-cyan-400/40 flex-shrink-0">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
            alt={user?.name || 'User Avatar'}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center sm:text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
            <Sparkles size={12} />
            <span>Profile</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            {user?.name || 'SoundWave Listener'}
          </h1>

          <p className="text-xs text-gray-400">{user?.email}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-gray-300">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1e2244] border border-cyan-500/30 text-cyan-300 font-bold">
              {user?.role || 'USER'}
            </span>
            <span>•</span>
            <span>{userPlaylists.length} Playlists</span>
            <span>•</span>
            <span>{followedArtists.length} Followed Artists</span>
          </div>
        </div>
      </div>

      {/* Listening Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#141628] border border-[#242749] shadow-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-pink-500/15 text-pink-400">
            <Heart size={22} fill="currentColor" />
          </div>
          <div>
            <span className="text-xl font-bold text-white">{likedSongs.length}</span>
            <p className="text-xs text-gray-400">Liked Songs</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141628] border border-[#242749] shadow-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/15 text-cyan-400">
            <Music size={22} />
          </div>
          <div>
            <span className="text-xl font-bold text-white">{userPlaylists.length}</span>
            <p className="text-xs text-gray-400">Created Playlists</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141628] border border-[#242749] shadow-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/15 text-purple-400">
            <Headphones size={22} />
          </div>
          <div>
            <span className="text-xl font-bold text-white">{followedArtists.length}</span>
            <p className="text-xs text-gray-400">Followed Artists</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141628] border border-[#242749] shadow-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400">
            <Award size={22} />
          </div>
          <div>
            <span className="text-xl font-bold text-white">Lossless</span>
            <p className="text-xs text-gray-400">Audio Quality</p>
          </div>
        </div>
      </div>

      {/* Top Genres Breakdown */}
      <section className="p-6 rounded-3xl bg-[#131526] border border-[#222543] space-y-4">
        <h2 className="text-base font-bold text-white">Top Listening Genres</h2>
        <div className="space-y-3">
          {topGenres.map((genre) => (
            <div key={genre.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-gray-300">{genre.name}</span>
                <span className="font-mono text-cyan-400 font-bold">{genre.percent}%</span>
              </div>
              <div className="w-full h-2 bg-[#1b1e36] rounded-full overflow-hidden">
                <div
                  className={`h-full ${genre.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${genre.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
