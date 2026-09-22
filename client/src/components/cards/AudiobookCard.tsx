import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Star, Clock } from 'lucide-react';
import { Audiobook } from '../../types';

interface AudiobookCardProps {
  audiobook: Audiobook;
}

export const AudiobookCard: React.FC<AudiobookCardProps> = ({ audiobook }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/audiobooks/${audiobook.id}`)}
      className="group relative p-3.5 rounded-2xl bg-[#141525]/70 hover:bg-[#1e2038] border border-[#222543]/40 hover:border-[#373b6b] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
    >
      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-3 bg-[#0d0e19]">
        <img
          src={audiobook.coverUrl}
          alt={audiobook.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-sm text-purple-400">
          <BookOpen size={14} />
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            {audiobook.genre}
          </span>
          {audiobook.rating && (
            <div className="flex items-center gap-0.5 text-[11px] text-amber-400 font-medium">
              <Star size={11} fill="currentColor" />
              <span>{audiobook.rating}</span>
            </div>
          )}
        </div>

        <h3 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
          {audiobook.title}
        </h3>
        <p className="text-xs text-gray-400 truncate mt-0.5">
          By {audiobook.author}
        </p>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
          <Clock size={11} />
          <span>{audiobook.duration}</span>
        </div>
      </div>
    </div>
  );
};
