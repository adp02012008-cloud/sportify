import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, Mic, Star, Calendar, Clock } from 'lucide-react';
import { Podcast, PodcastEpisode, Song } from '../types';
import { api } from '../services/api';
import { useAudio } from '../context/AudioContext';

export const PodcastDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentSong, isPlaying, playSong, togglePlay } = useAudio();

  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcast = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await api.podcasts.getById(id);
        setPodcast(res.data);
      } catch (err) {
        console.error('Failed to load podcast', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcast();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin inline-block mb-2" />
        <p className="text-xs">Loading podcast...</p>
      </div>
    );
  }

  if (!podcast) {
    return <div className="py-20 text-center text-gray-400">Podcast not found.</div>;
  }

  const handlePlayEpisode = (ep: PodcastEpisode) => {
    // Map episode to Song format for player
    const songItem: Song = {
      id: ep.id,
      title: ep.title,
      artist: podcast.title,
      album: `Episode ${ep.id}`,
      duration: ep.duration,
      coverUrl: podcast.coverUrl,
      audioUrl: ep.audioUrl,
      genre: podcast.category,
    };

    if (currentSong?.id === ep.id) {
      togglePlay();
    } else {
      playSong(songItem);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1c1e38] via-[#121426] to-[#0d0e1b] border border-[#272a4d] flex flex-col sm:flex-row items-start sm:items-end gap-6 shadow-2xl relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-15"
          style={{ backgroundImage: `url(${podcast.coverUrl})` }}
        />

        <div className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10 flex-shrink-0">
          <img src={podcast.coverUrl} alt={podcast.title} className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
            Podcast • {podcast.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {podcast.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
            {podcast.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
            <span className="text-white font-medium">Host: {podcast.host}</span>
            <span>•</span>
            {podcast.rating && (
              <div className="flex items-center gap-1 text-amber-400">
                <Star size={13} fill="currentColor" />
                <span>{podcast.rating}</span>
              </div>
            )}
            <span>•</span>
            <span>{podcast.episodes?.length || 0} episodes</span>
          </div>
        </div>
      </div>

      {/* Episodes List */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white">All Episodes</h2>

        <div className="space-y-3">
          {podcast.episodes?.map((ep) => {
            const isCurrent = currentSong?.id === ep.id;
            const isPlayingThis = isCurrent && isPlaying;

            return (
              <div
                key={ep.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-[#1b1e38] border-cyan-500/40'
                    : 'bg-[#141628] hover:bg-[#181b33] border-[#222543]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className={`text-sm font-semibold truncate ${
                      isCurrent ? 'text-cyan-400' : 'text-white'
                    }`}>
                      {ep.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {ep.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500 pt-1 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {ep.releaseDate || 'Recent'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {ep.duration}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlayEpisode(ep)}
                    className="self-start sm:self-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex-shrink-0"
                  >
                    {isPlayingThis ? (
                      <>
                        <Pause size={14} fill="currentColor" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} fill="currentColor" />
                        <span>Play Episode</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
