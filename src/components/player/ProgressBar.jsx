import React, { useRef, useState } from 'react';

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const barRef = useRef(null);
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(0);

  const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClick = (e) => {
    if (!barRef.current || duration <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(clickPercent * duration);
  };

  const handleMouseMove = (e) => {
    if (!barRef.current || duration <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const moveX = e.clientX - rect.left;
    const movePercent = Math.max(0, Math.min(1, moveX / rect.width));
    setHoverTime(movePercent * duration);
    setHoverPosition(moveX);
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '560px' }}>
      {/* Current Time */}
      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', width: '35px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
        {formatTime(currentTime)}
      </span>

      {/* Progress Track */}
      <div
        ref={barRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={(e) => {
          handleMouseLeave();
          e.currentTarget.style.height = '4px';
          const thumb = e.currentTarget.querySelector('.progress-thumb');
          if (thumb) thumb.style.opacity = '0';
        }}
        style={{
          position: 'relative',
          flex: 1,
          height: '4px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          transition: 'height var(--transition-fast)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.height = '6px';
          const thumb = e.currentTarget.querySelector('.progress-thumb');
          if (thumb) thumb.style.opacity = '1';
        }}
      >
        {/* Fill */}
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: 'var(--accent-gradient)',
            borderRadius: '4px',
            position: 'relative'
          }}
        />

        {/* Thumb */}
        <div
          className="progress-thumb"
          style={{
            position: 'absolute',
            left: `${percentage}%`,
            transform: 'translateX(-50%)',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 0 8px rgba(6, 182, 212, 0.8)',
            opacity: 0,
            transition: 'opacity var(--transition-fast)'
          }}
        />

        {/* Hover Tooltip */}
        {hoverTime !== null && (
          <div
            style={{
              position: 'absolute',
              top: '-26px',
              left: `${hoverPosition}px`,
              transform: 'translateX(-50%)',
              background: 'rgba(20, 20, 30, 0.95)',
              color: '#fff',
              fontSize: '0.68rem',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {formatTime(hoverTime)}
          </div>
        )}
      </div>

      {/* Duration */}
      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', width: '35px', textAlign: 'left', fontVariantNumeric: 'tabular-nums' }}>
        {formatTime(duration)}
      </span>
    </div>
  );
};
