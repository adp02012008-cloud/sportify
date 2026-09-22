import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, Play, Music, Mic, Disc3 } from 'lucide-react';
import { api } from '../services/api';
import { Song, Artist, Album, Playlist, Podcast } from '../types';
import { useAudio } from '../context/AudioContext';
import { SongRow } from '../components/cards/SongRow';
import { ArtistCard } from '../components/cards/ArtistCard';
import { AlbumCard } from '../components/cards/AlbumCard';
import { PlaylistCard } from '../components/cards/PlaylistCard';

interface SearchProps {
  onAddToPlaylist: (song: Song) => void;
}

export const Search: React.FC<SearchProps> = ({ onAddToPlaylist }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { playSong } = useAudio();

  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam);
  const [activeFilter, setActiveFilter] = useState<'all' | 'songs' | 'artists' | 'albums' | 'playlists'>('all');

  const [results, setResults] = useState<{
    songs: Song[];
    artists: Artist[];
    albums: Album[];
    playlists: Playlist[];
  }>({
    songs: [],
    artists: [],
    albums: [],
    playlists: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ songs: [], artists: [], albums: [], playlists: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.search.query(query);
        setResults({
          songs: res.data.songs || [],
          artists: res.data.artists || [],
          albums: res.data.albums || [],
          playlists: res.data.playlists || [],
        });
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSearchParams({});
  };

  const genreCards = [
    { title: 'Synthwave & Retro', color: 'from-pink-600 to-purple-800' },
    { title: 'Lo-Fi Chill Beats', color: 'from-emerald-600 to-teal-800' },
    { title: 'Cyberpunk & Bass', color: 'from-cyan-600 to-blue-800' },
    { title: 'Ambient & Drone', color: 'from-indigo-600 to-purple-900' },
    { title: 'Deep House & Techno', color: 'from-amber-600 to-orange-800' },
    { title: 'Chillstep & Future', color: 'from-rose-600 to-red-800' },
    { title: 'Acoustic & Folk', color: 'from-lime-600 to-green-800' },
    { title: 'Podcasts & Talk', color: 'from-sky-600 to-indigo-800' },
    { title: 'Audiobooks & Tales', color: 'from-fuchsia-600 to-pink-900' },
  ];

  const topSong = results.songs[0];
  const hasResults =
    results.songs.length > 0 ||
    results.artists.length > 0 ||
    results.albums.length > 0 ||
    results.playlists.length > 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Search Input Bar */}
      <div className="relative max-w-xl">
        <SearchIcon
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Artists, songs, albums, or playlists..."
          className="w-full pl-12 pr-10 py-3 rounded-full bg-[#16182c] border border-[#2b2f52] focus:border-cyan-400 text-sm text-white placeholder-gray-400 outline-none transition-all shadow-lg"
          autoFocus
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Tabs if query present */}
      {query && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {(['all', 'songs', 'artists', 'albums', 'playlists'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                activeFilter === filter
                  ? 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20'
                  : 'bg-[#181a30] text-gray-300 hover:bg-[#232644]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* When no query: Browse All Genres */}
      {!query.trim() && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {genreCards.map((genre) => (
              <div
                key={genre.title}
                onClick={() => {
                  const q = genre.title.split(' ')[0];
                  setQuery(q);
                  setSearchParams({ q });
                }}
                className={`group relative h-32 p-4 rounded-2xl bg-gradient-to-br ${genre.color} cursor-pointer overflow-hidden shadow-lg hover:scale-105 transition-all flex flex-col justify-between`}
              >
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  {genre.title}
                </h3>
                <div className="self-end p-2 rounded-full bg-black/20 text-white group-hover:scale-110 transition-transform">
                  <Music size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results View */}
      {query.trim() && (
        <div className="space-y-8">
          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin inline-block mb-2" />
              <p className="text-xs">Searching SoundWave catalog...</p>
            </div>
          ) : !hasResults ? (
            <div className="py-20 text-center text-gray-400">
              <h3 className="text-lg font-bold text-white mb-1">No results found for "{query}"</h3>
              <p className="text-xs text-gray-400">
                Please make sure your words are spelled correctly, or use fewer or different keywords.
              </p>
            </div>
          ) : (
            <>
              {/* Top Result + Songs Preview */}
              {(activeFilter === 'all' || activeFilter === 'songs') && topSong && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Top Result spotlight card */}
                  <div className="lg:col-span-5 space-y-2">
                    <h3 className="text-lg font-bold text-white">Top Result</h3>
                    <div
                      onClick={() => playSong(topSong, results.songs)}
                      className="group p-5 rounded-2xl bg-[#15172b] hover:bg-[#1f223f] border border-[#242749] transition-all cursor-pointer relative shadow-xl"
                    >
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md mb-4">
                        <img
                          src={topSong.coverUrl}
                          alt={topSong.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h4 className="text-2xl font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                        {topSong.title}
                      </h4>
                      <p className="text-sm text-gray-400 truncate mt-1">
                        Song • <span className="text-white">{topSong.artist}</span>
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playSong(topSong, results.songs);
                        }}
                        className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-black flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all"
                      >
                        <Play size={22} fill="currentColor" className="ml-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* Songs list preview */}
                  <div className="lg:col-span-7 space-y-2">
                    <h3 className="text-lg font-bold text-white">Songs</h3>
                    <div className="space-y-1">
                      {results.songs.slice(0, 4).map((song, idx) => (
                        <SongRow
                          key={song.id}
                          song={song}
                          index={idx}
                          playlistContext={results.songs}
                          onAddToPlaylist={onAddToPlaylist}
                          showAlbum={false}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* All matching songs when songs filter selected */}
              {activeFilter === 'songs' && results.songs.length > 4 && (
                <div className="space-y-1">
                  {results.songs.slice(4).map((song, idx) => (
                    <SongRow
                      key={song.id}
                      song={song}
                      index={idx + 4}
                      playlistContext={results.songs}
                      onAddToPlaylist={onAddToPlaylist}
                    />
                  ))}
                </div>
              )}

              {/* Artists Section */}
              {(activeFilter === 'all' || activeFilter === 'artists') && results.artists.length > 0 && (
                <section>
                  <h3 className="text-lg font-bold text-white mb-3">Artists</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {results.artists.map((artist) => (
                      <ArtistCard key={artist.id} artist={artist} />
                    ))}
                  </div>
                </section>
              )}

              {/* Albums Section */}
              {(activeFilter === 'all' || activeFilter === 'albums') && results.albums.length > 0 && (
                <section>
                  <h3 className="text-lg font-bold text-white mb-3">Albums</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {results.albums.map((album) => (
                      <AlbumCard key={album.id} album={album} />
                    ))}
                  </div>
                </section>
              )}

              {/* Playlists Section */}
              {(activeFilter === 'all' || activeFilter === 'playlists') && results.playlists.length > 0 && (
                <section>
                  <h3 className="text-lg font-bold text-white mb-3">Playlists</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {results.playlists.map((playlist) => (
                      <PlaylistCard key={playlist.id} playlist={playlist} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
