import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Heart, Music, Mic, BookOpen, UserCheck, Search as SearchIcon } from 'lucide-react';
import { Playlist, Artist, Podcast, Audiobook, Song } from '../types';
import { api } from '../services/api';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { PlaylistCard } from '../components/cards/PlaylistCard';
import { ArtistCard } from '../components/cards/ArtistCard';
import { PodcastCard } from '../components/cards/PodcastCard';
import { AudiobookCard } from '../components/cards/AudiobookCard';

interface LibraryProps {
  playlists: Playlist[];
  onOpenCreatePlaylist: () => void;
}

export const Library: React.FC<LibraryProps> = ({ playlists, onOpenCreatePlaylist }) => {
  const navigate = useNavigate();
  const { likedSongs, playSong } = useAudio();
  const { followedArtists } = useAuth();

  const [activeTab, setActiveTab] = useState<'all' | 'playlists' | 'artists' | 'podcasts' | 'audiobooks'>('all');
  const [filterQuery, setFilterQuery] = useState('');
  const [allArtists, setAllArtists] = useState<Artist[]>([]);
  const [allPodcasts, setAllPodcasts] = useState<Podcast[]>([]);
  const [allAudiobooks, setAllAudiobooks] = useState<Audiobook[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsRes, podcastsRes, audiobooksRes] = await Promise.all([
          api.artists.getAll(),
          api.podcasts.getAll(),
          api.audiobooks.getAll(),
        ]);
        setAllArtists(artistsRes.data);
        setAllPodcasts(podcastsRes.data);
        setAllAudiobooks(audiobooksRes.data);
      } catch (err) {
        console.error('Library data error', err);
      }
    };
    fetchData();
  }, []);

  const followedArtistsList = allArtists.filter((a) => followedArtists.includes(a.id));

  const filteredPlaylists = playlists.filter((p) =>
    p.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header and Action controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Your Library</h1>
          <p className="text-xs text-gray-400">Playlists, saved podcasts, followed artists, and audiobooks</p>
        </div>

        <button
          onClick={onOpenCreatePlaylist}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Plus size={16} />
          <span>New Playlist</span>
        </button>
      </div>

      {/* Filter Tabs & Local Filter Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#212440] pb-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {(['all', 'playlists', 'artists', 'podcasts', 'audiobooks'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-cyan-400 text-black font-bold'
                  : 'bg-[#181a30] text-gray-300 hover:bg-[#232644]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search in Library..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-full bg-[#181a30] border border-[#2b2e52] focus:border-cyan-400 text-xs text-white placeholder-gray-500 outline-none"
          />
        </div>
      </div>

      {/* Liked Songs Special Tile (when tab is all or playlists) */}
      {(activeTab === 'all' || activeTab === 'playlists') && (
        <div
          onClick={() => navigate('/liked')}
          className="group p-5 rounded-2xl bg-gradient-to-br from-[#450af5] to-[#8e8ee5] hover:opacity-95 transition-all cursor-pointer shadow-xl relative overflow-hidden flex flex-col justify-between h-44"
        >
          <div className="space-y-1">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
              <Heart size={20} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-3">Liked Songs</h2>
            <p className="text-xs text-white/80 font-medium">
              {likedSongs.length} liked tracks
            </p>
          </div>

          <div className="text-xs text-white/90 font-semibold flex items-center gap-1">
            <span>Open Liked Tracks Collection →</span>
          </div>
        </div>
      )}

      {/* Playlists Grid */}
      {(activeTab === 'all' || activeTab === 'playlists') && (
        <div>
          <h2 className="text-lg font-bold text-white mb-3">Playlists</h2>
          {filteredPlaylists.length === 0 ? (
            <p className="text-xs text-gray-500 py-4">No matching playlists.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredPlaylists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Followed Artists Grid */}
      {(activeTab === 'all' || activeTab === 'artists') && (
        <div>
          <h2 className="text-lg font-bold text-white mb-3">Followed Artists</h2>
          {(followedArtistsList.length > 0 ? followedArtistsList : allArtists.slice(0, 6)).length === 0 ? (
            <p className="text-xs text-gray-500 py-4">No artists followed yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {(followedArtistsList.length > 0 ? followedArtistsList : allArtists.slice(0, 6)).map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Saved Podcasts */}
      {(activeTab === 'all' || activeTab === 'podcasts') && (
        <div>
          <h2 className="text-lg font-bold text-white mb-3">Podcasts & Shows</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allPodcasts.slice(0, 5).map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </div>
      )}

      {/* Saved Audiobooks */}
      {(activeTab === 'all' || activeTab === 'audiobooks') && (
        <div>
          <h2 className="text-lg font-bold text-white mb-3">Audiobooks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allAudiobooks.slice(0, 5).map((audiobook) => (
              <AudiobookCard key={audiobook.id} audiobook={audiobook} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
