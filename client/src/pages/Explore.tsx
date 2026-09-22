import React, { useEffect, useState } from 'react';
import { Compass, Flame, Radio, Sparkles, Award } from 'lucide-react';
import { Song, Album, Artist } from '../types';
import { api } from '../services/api';
import { useAudio } from '../context/AudioContext';
import { SongCard } from '../components/cards/SongCard';
import { AlbumCard } from '../components/cards/AlbumCard';
import { ArtistCard } from '../components/cards/ArtistCard';

interface ExploreProps {
  onAddToPlaylist: (song: Song) => void;
}

export const Explore: React.FC<ExploreProps> = ({ onAddToPlaylist }) => {
  const { playSong } = useAudio();
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [songsRes, albumsRes, artistsRes] = await Promise.all([
          api.songs.getAll(),
          api.albums.getAll(),
          api.artists.getAll(),
        ]);
        setSongs(songsRes.data);
        setAlbums(albumsRes.data);
        setArtists(artistsRes.data);
      } catch (err) {
        console.error('Explore data load error', err);
      }
    };
    fetchData();
  }, []);

  const genres = ['all', 'Synthwave', 'Electronic', 'Lo-Fi', 'Chillstep', 'Ambient', 'Cyberpunk'];

  const filteredSongs =
    selectedGenre === 'all'
      ? songs
      : songs.filter((s) => s.genre?.toLowerCase() === selectedGenre.toLowerCase());

  const moodRadios = [
    { title: 'Cyber Drift', desc: '140+ BPM high octane synth bass', color: 'from-cyan-500 to-blue-700' },
    { title: 'Midnight Coffee', desc: 'Mellow chill Lo-Fi beats for focus', color: 'from-amber-600 to-orange-800' },
    { title: 'Deep Space Odyssey', desc: 'Atmospheric ambient & cosmic pads', color: 'from-purple-600 to-indigo-900' },
    { title: 'Neon Gym Surge', desc: 'Electrifying beats for heavy reps', color: 'from-red-600 to-pink-700' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1d1f3b] via-[#16182e] to-[#0f101d] border border-[#2b2f54] flex items-center justify-between shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Compass size={14} />
            <span>Discover Sonic Horizons</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Explore SoundWave</h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
            Explore curated mood radios, trending acoustic breakthroughs, and global electronic charts.
          </p>
        </div>
      </div>

      {/* Mood Radios */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Radio size={20} className="text-cyan-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">Mood Radios & Stations</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moodRadios.map((mood, i) => (
            <div
              key={mood.title}
              onClick={() => {
                const sample = songs.slice(i * 3, i * 3 + 6);
                if (sample.length > 0) playSong(sample[0], sample);
              }}
              className={`p-5 rounded-2xl bg-gradient-to-br ${mood.color} cursor-pointer shadow-lg hover:scale-105 transition-all text-white flex flex-col justify-between h-36 group`}
            >
              <div>
                <h3 className="font-extrabold text-lg">{mood.title}</h3>
                <p className="text-xs text-white/80 mt-1 leading-relaxed">{mood.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white/90">
                <Sparkles size={14} />
                <span>Start Station</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Flame size={20} className="text-pink-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">Filter by Sound Profile</h2>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                selectedGenre === g
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black shadow-md'
                  : 'bg-[#181a30] text-gray-300 hover:bg-[#232644]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Filtered Tracks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {filteredSongs.slice(0, 12).map((song) => (
            <SongCard
              key={song.id}
              song={song}
              playlistContext={filteredSongs}
              onAddToPlaylist={onAddToPlaylist}
            />
          ))}
        </div>
      </div>

      {/* Top Albums in Chart */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Award size={20} className="text-amber-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">Top Charting Albums</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {albums.slice(0, 5).map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>

      {/* Artists on the Rise */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Artists on the Rise</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.slice(6, 12).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
};
