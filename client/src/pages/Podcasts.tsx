import React, { useEffect, useState } from 'react';
import { Mic, Sparkles, Star } from 'lucide-react';
import { Podcast } from '../types';
import { api } from '../services/api';
import { PodcastCard } from '../components/cards/PodcastCard';

export const Podcasts: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const res = await api.podcasts.getAll();
        setPodcasts(res.data);
      } catch (err) {
        console.error('Podcasts error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcasts();
  }, []);

  const categories = ['all', 'Technology', 'Science', 'True Crime', 'Comedy', 'Design', 'Storytelling'];

  const filteredPodcasts =
    selectedCategory === 'all'
      ? podcasts
      : podcasts.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1b1c38] via-[#14162a] to-[#0c0d18] border border-[#272a4d] flex items-center justify-between shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Mic size={14} />
            <span>SoundWave Original Podcasts & Shows</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Podcasts & Talk</h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
            Stream thought-provoking conversations, deep tech interviews, gripping investigative journalism, and comedic roundtables.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-400 text-black shadow-md'
                : 'bg-[#181a30] text-gray-300 hover:bg-[#232644]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Podcast Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin inline-block mb-2" />
          <p className="text-xs">Loading podcasts...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      )}
    </div>
  );
};
