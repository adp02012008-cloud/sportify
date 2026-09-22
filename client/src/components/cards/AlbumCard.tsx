import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Disc3 } from 'lucide-react';
import { Album } from '../../types';

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${album.id}`)}
      className="group relative p-3.5 rounded-2xl bg-[#141525]/70 hover:bg-[#1e2038] border border-[#222543]/40 hover:border-[#373b6b] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
    >
      {/* Artwork container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#0d0e19]">
        <img
          src={album.coverUrl}
          alt={album.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Vinyl accent overlay */}
        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-gray-300">
          <Disc3 size={14} className="group-hover:rotate-180 transition-transform duration-700" />
        </div>

        {/* Floating Play Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/album/${album.id}`);
          }}
          aria-label="View Album"
          className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 text-black flex items-center justify-center shadow-xl opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Play size={20} fill="currentColor" className="ml-0.5" />
        </button>
      </div>

      {/* Info */}
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
          {album.title}
        </h3>
        <p className="text-xs text-gray-400 truncate mt-0.5">
          {album.artist}
        </p>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
          <span>{album.year}</span>
          <span>•</span>
          <span>{album.songs?.length || 0} tracks</span>
        </div>
      </div>
    </div>
  );
};
