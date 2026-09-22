import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { mockSongs } from '../data/mockSongs';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(mockSongs[0]); // default starting song
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(mockSongs[0].duration || 215);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('soundwave_volume');
    return saved !== null ? parseFloat(saved) : 0.8;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off' | 'all' | 'one'
  const [queue, setQueue] = useState(mockSongs.slice(0, 15));
  const [queueIndex, setQueueIndex] = useState(0);
  const [history, setHistory] = useState([]);

  const audioRef = useRef(null);
  const prevVolumeRef = useRef(0.8);
  const synthTimerRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Initialize HTML5 Audio
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      handleSongEnded();
    };

    const handleError = () => {
      console.warn('Audio URL playback error, starting harmonic fallback synthesizer.');
      startProceduralSynth();
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      stopProceduralSynth();
    };
  }, []);

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    localStorage.setItem('soundwave_volume', volume.toString());
  }, [volume, isMuted]);

  // Procedural synthesizer fallback for zero-downtime audio
  const startProceduralSynth = useCallback(() => {
    stopProceduralSynth();
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Play soft ambient rhythmic chord progression
      const notes = [220, 261.63, 329.63, 392.00, 440, 523.25];
      let step = 0;

      synthTimerRef.current = setInterval(() => {
        if (!isPlaying && audioRef.current && audioRef.current.paused) return;
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, ctx.currentTime);

          const freq = notes[step % notes.length];
          step++;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const curVol = isMuted ? 0 : volume * 0.15;
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(Math.max(0.001, curVol), ctx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.85);
        } catch (e) {
          // ignore synth node errors
        }
      }, 750);
    } catch (e) {
      console.warn('Synth fallback error', e);
    }
  }, [isPlaying, isMuted, volume]);

  const stopProceduralSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  // Play a specific song
  const playSong = useCallback((song, newQueue = null) => {
    if (!song) return;

    if (newQueue && Array.isArray(newQueue) && newQueue.length > 0) {
      setQueue(newQueue);
      const idx = newQueue.findIndex((s) => s.id === song.id);
      setQueueIndex(idx !== -1 ? idx : 0);
    } else {
      // Check if song already in queue
      const existingIdx = queue.findIndex((s) => s.id === song.id);
      if (existingIdx !== -1) {
        setQueueIndex(existingIdx);
      } else {
        setQueue((prev) => [song, ...prev]);
        setQueueIndex(0);
      }
    }

    setCurrentSong(song);
    setCurrentTime(0);
    setDuration(song.duration || 215);

    if (audioRef.current) {
      audioRef.current.src = song.audioUrl || '';
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          stopProceduralSynth();
        })
        .catch((err) => {
          console.warn('Playback autoplay promise error:', err);
          setIsPlaying(true);
          startProceduralSynth();
        });
    }

    // Add to history
    setHistory((prev) => [song, ...prev.filter((s) => s.id !== song.id)].slice(0, 30));
  }, [queue, startProceduralSynth]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      stopProceduralSynth();
    } else {
      if (!audioRef.current.src && currentSong) {
        audioRef.current.src = currentSong.audioUrl;
      }
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          stopProceduralSynth();
        })
        .catch(() => {
          setIsPlaying(true);
          startProceduralSynth();
        });
    }
  }, [isPlaying, currentSong, startProceduralSynth]);

  // Next song
  const nextSong = useCallback(() => {
    if (repeatMode === 'one' && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }

    if (queue.length === 0) return;

    let nextIdx;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * queue.length);
    } else {
      nextIdx = queueIndex + 1;
      if (nextIdx >= queue.length) {
        if (repeatMode === 'all') {
          nextIdx = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }
    }

    setQueueIndex(nextIdx);
    const nextTrack = queue[nextIdx];
    if (nextTrack) {
      playSong(nextTrack);
    }
  }, [queue, queueIndex, isShuffle, repeatMode, playSong]);

  // Previous song
  const prevSong = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    if (queue.length === 0) return;

    let prevIdx = queueIndex - 1;
    if (prevIdx < 0) {
      prevIdx = queue.length - 1;
    }
    setQueueIndex(prevIdx);
    const prevTrack = queue[prevIdx];
    if (prevTrack) {
      playSong(prevTrack);
    }
  }, [queue, queueIndex, playSong]);

  // Handle track ending
  const handleSongEnded = useCallback(() => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } else {
      nextSong();
    }
  }, [repeatMode, nextSong]);

  // Seek
  const seekTo = (seconds) => {
    const clamped = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(clamped);
    if (audioRef.current) {
      audioRef.current.currentTime = clamped;
    }
  };

  // Change volume
  const changeVolume = (newVol) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(prevVolumeRef.current || 0.8);
    } else {
      prevVolumeRef.current = volume;
      setIsMuted(true);
    }
  };

  // Toggle shuffle
  const toggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  // Cycle repeat
  const cycleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  // Queue manipulation
  const addToQueue = (song) => {
    setQueue((prev) => [...prev, song]);
  };

  const playNextInQueue = (song) => {
    setQueue((prev) => {
      const nextList = [...prev];
      nextList.splice(queueIndex + 1, 0, song);
      return nextList;
    });
  };

  const removeFromQueue = (index) => {
    setQueue((prev) => prev.filter((_, i) => i !== index));
    if (index < queueIndex) {
      setQueueIndex((prev) => prev - 1);
    }
  };

  const clearQueue = () => {
    if (currentSong) {
      setQueue([currentSong]);
      setQueueIndex(0);
    } else {
      setQueue([]);
      setQueueIndex(0);
    }
  };

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in input, textarea or contenteditable
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        nextSong();
      } else if (e.code === 'ArrowLeft' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        prevSong();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekTo(currentTime + 5);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekTo(currentTime - 5);
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, nextSong, prevSong, currentTime, isMuted, volume]);

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        repeatMode,
        queue,
        queueIndex,
        history,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        seekTo,
        changeVolume,
        toggleMute,
        toggleShuffle,
        cycleRepeat,
        addToQueue,
        playNextInQueue,
        removeFromQueue,
        clearQueue
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};
