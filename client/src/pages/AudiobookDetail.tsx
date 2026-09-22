import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, BookOpen, Star, Clock, User, Headphones } from 'lucide-react';
import { Audiobook, AudiobookChapter, Song } from '../types';
import { api } from '../services/api';
import { useAudio } from '../context/AudioContext';

export const AudiobookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentSong, isPlaying, playSong, togglePlay } = useAudio();

  const [audiobook, setAudiobook] = useState<Audiobook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudiobook = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await api.audiobooks.getById(id);
        setAudiobook(res.data);
      } catch (err) {
        console.error('Audiobook error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAudiobook();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        <span className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin inline-block mb-2" />
        <p className="text-xs">Loading audiobook...</p>
      </div>
    );
  }

  if (!audiobook) {
    return <div className="py-20 text-center text-gray-400">Audiobook not found.</div>;
  }

  const handlePlayChapter = (ch: AudiobookChapter) => {
    const songItem: Song = {
      id: ch.id,
      title: `${audiobook.title} - ${ch.title}`,
      artist: audiobook.author,
      album: `Narrated by ${audiobook.narrator}`,
      duration: ch.duration,
      coverUrl: audiobook.coverUrl,
      audioUrl: ch.audioUrl,
      genre: audiobook.genre,
    };

    if (currentSong?.id === ch.id) {
      togglePlay();
    } else {
      playSong(songItem);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#211a3b] via-[#151426] to-[#0c0d18] border border-[#302754] flex flex-col sm:flex-row items-start sm:items-end gap-6 shadow-2xl relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-15"
          style={{ backgroundImage: `url(${audiobook.coverUrl})` }}
        />

        <div className="relative z-10 w-36 h-48 sm:w-44 sm:h-60 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10 flex-shrink-0">
          <img src={audiobook.coverUrl} alt={audiobook.title} className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-purple-400">
            Audiobook • {audiobook.genre}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {audiobook.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
            {audiobook.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-1">
            <span className="text-white font-medium">Author: {audiobook.author}</span>
            <span>•</span>
            <span className="text-purple-300">Narrated by {audiobook.narrator}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{audiobook.duration}</span>
            </div>
            {audiobook.rating && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star size={13} fill="currentColor" />
                  <span>{audiobook.rating}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white">Chapters & Segments</h2>

        <div className="space-y-2">
          {audiobook.chapters?.map((ch, idx) => {
            const isCurrent = currentSong?.id === ch.id;
            const isPlayingThis = isCurrent && isPlaying;

            return (
              <div
                key={ch.id}
                onClick={() => handlePlayChapter(ch)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#1e1a38] border-purple-500/40 text-purple-300'
                    : 'bg-[#141628] hover:bg-[#191c36] border-[#222543] text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono text-gray-500 w-6 text-center">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className={`text-sm font-semibold truncate ${
                      isCurrent ? 'text-purple-300' : 'text-white'
                    }`}>
                      {ch.title}
                    </h3>
                    <span className="text-xs text-gray-500 font-mono">{ch.duration}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayChapter(ch);
                  }}
                  className="w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  {isPlayingThis ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
