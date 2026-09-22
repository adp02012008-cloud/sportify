import React, { useRef } from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';

export const VolumeControl = ({ volume, isMuted, onVolumeChange, onToggleMute }) => {
  const barRef = useRef(null);

  const displayVolume = isMuted ? 0 : volume;

  const handleClick = (e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = Math.max(0, Math.min(1, clickX / rect.width));
    onVolumeChange(clickPercent);
  };

  const renderIcon = () => {
    if (isMuted || displayVolume === 0) {
      return <VolumeX size={18} />;
    }
    if (displayVolume < 0.5) {
      return <Volume1 size={18} />;
    }
    return <Volume2 size={18} />;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button
        onClick={onToggleMute}
        title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
        style={{
          color: isMuted ? '#f87171' : 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px',
          borderRadius: '50%',
          transition: 'color var(--transition-fast)'
        }}
        onMouseEnter={(e) => {
          if (!isMuted) e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          if (!isMuted) e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        {renderIcon()}
      </button>

      {/* Volume Slider */}
      <div
        ref={barRef}
        onClick={handleClick}
        title={`Volume: ${Math.round(displayVolume * 100)}%`}
        style={{
          width: '90px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '4px',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          transition: 'height var(--transition-fast)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.height = '6px';
          const thumb = e.currentTarget.querySelector('.vol-thumb');
          if (thumb) thumb.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.height = '4px';
          const thumb = e.currentTarget.querySelector('.vol-thumb');
          if (thumb) thumb.style.opacity = '0';
        }}
      >
        <div
          style={{
            width: `${displayVolume * 100}%`,
            height: '100%',
            background: isMuted ? 'var(--text-muted)' : 'var(--accent-cyan)',
            borderRadius: '4px'
          }}
        />
        <div
          className="vol-thumb"
          style={{
            position: 'absolute',
            left: `${displayVolume * 100}%`,
            transform: 'translateX(-50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 0 6px rgba(0,0,0,0.5)',
            opacity: 0,
            transition: 'opacity var(--transition-fast)'
          }}
        />
      </div>
    </div>
  );
};
