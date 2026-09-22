import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, UserPlus, UserCheck } from 'lucide-react';
import { Artist } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const navigate = useNavigate();
  const { followedArtists, followArtist, unfollowArtist } = useAuth();
  const { addToast } = useToast();

  const isFollowed = followedArtists.includes(artist.id);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFollowed) {
      unfollowArtist(artist.id);
      addToast(`Unfollowed ${artist.name}`, 'info');
    } else {
      followArtist(artist.id);
      addToast(`Following ${artist.name}`, 'success');
    }
  };

  return (
    <div
      onClick={() => navigate(`/artist/${artist.id}`)}
      className="group p-4 rounded-2xl bg-[#141525]/70 hover:bg-[#1e2038] border border-[#222543]/40 hover:border-[#373b6b] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center text-center"
    >
      {/* Circular Avatar */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 rounded-full overflow-hidden shadow-xl ring-2 ring-[#292c4e] group-hover:ring-cyan-400/60 transition-all duration-500">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {artist.verified && (
          <div className="absolute bottom-1 right-1 p-0.5 bg-[#0e101c] rounded-full">
            <CheckCircle2 size={18} className="text-cyan-400 fill-cyan-950" />
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-sm font-bold text-white truncate max-w-full group-hover:text-cyan-400 transition-colors">
        {artist.name}
      </h3>

      <span className="text-xs text-gray-400 mt-1 capitalize font-medium">
        {artist.genre}
      </span>

      <span className="text-[11px] text-gray-500 mt-0.5">
        {artist.monthlyListeners ? `${artist.monthlyListeners.toLocaleString()} monthly listeners` : 'Artist'}
      </span>

      {/* Follow / Unfollow button */}
      <button
        onClick={handleFollow}
        className={`mt-3 px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
          isFollowed
            ? 'bg-[#272a4b] text-gray-200 hover:bg-red-500/20 hover:text-red-300'
            : 'bg-white/10 hover:bg-white text-white hover:text-black border border-white/20'
        }`}
      >
        {isFollowed ? (
          <>
            <UserCheck size={13} className="text-cyan-400" />
            <span>Following</span>
          </>
        ) : (
          <>
            <UserPlus size={13} />
            <span>Follow</span>
          </>
        )}
      </button>
    </div>
  );
};
