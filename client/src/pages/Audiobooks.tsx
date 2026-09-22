import React, { useEffect, useState } from 'react';
import { BookOpen, Star, Clock } from 'lucide-react';
import { Audiobook } from '../types';
import { api } from '../services/api';
import { AudiobookCard } from '../components/cards/AudiobookCard';

export const Audiobooks: React.FC = () => {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        setLoading(true);
        const res = await api.audiobooks.getAll();
        setAudiobooks(res.data);
      } catch (err) {
        console.error('Audiobooks error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAudiobooks();
  }, []);

  const genres = ['all', 'Sci-Fi', 'Cyberpunk', 'Philosophy', 'Productivity', 'Fantasy', 'Mystery'];

  const filteredAudiobooks =
    selectedGenre === 'all'
      ? audiobooks
      : audiobooks.filter((b) => b.genre?.toLowerCase() === selectedGenre.toLowerCase());

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#211a3b] via-[#16142a] to-[#0c0d18] border border-[#302754] flex items-center justify-between shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <BookOpen size={14} />
            <span>SoundWave Literary Narrations</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Audiobooks & Stories</h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
            Immerse your imagination in professionally narrated science fiction classics, philosophical masterworks, and modern audio epics.
          </p>
        </div>
      </div>

      {/* Genre Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
              selectedGenre === g
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-[#181a30] text-gray-300 hover:bg-[#232644]'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <span className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin inline-block mb-2" />
          <p className="text-xs">Loading audiobooks...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAudiobooks.map((audiobook) => (
            <AudiobookCard key={audiobook.id} audiobook={audiobook} />
          ))}
        </div>
      )}
    </div>
  );
};
