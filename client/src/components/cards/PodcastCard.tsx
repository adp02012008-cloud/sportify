import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Star } from 'lucide-react';
import { Podcast } from '../../types';

interface PodcastCardProps {
  podcast: Podcast;
}

export const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/podcasts/${podcast.id}`)}
      className="group relative p-3.5 rounded-2xl bg-[#141525]/70 hover:bg-[#1e2038] border border-[#222543]/40 hover:border-[#373b6b] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
    >
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#0d0e19]">
        <img
          src={podcast.coverUrl}
          alt={podcast.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-sm text-cyan-400">
          <Mic size={14} />
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {podcast.category}
          </span>
          {podcast.rating && (
            <div className="flex items-center gap-0.5 text-[11px] text-amber-400 font-medium">
              <Star size={11} fill="currentColor" />
              <span>{podcast.rating}</span>
            </div>
          )}
        </div>
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
          {podcast.title}
        </h3>
        <p className="text-xs text-gray-400 truncate mt-0.5">
          Host: {podcast.host}
        </p>
        <p className="text-[11px] text-gray-500 mt-1">
          {podcast.episodes?.length || 0} episodes
        </p>
      </div>
    </div>
  );
};
