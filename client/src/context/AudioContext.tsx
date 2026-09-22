import React, { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { Song, PodcastEpisode, AudiobookChapter } from '../types';
import { songsApi } from '../services/api';

export type MediaItem = Song | (PodcastEpisode & { artist?: string; artwork?: string; coverUrl?: string }) | (AudiobookChapter & { artist?: string; artwork?: string; coverUrl?: string });

export type CrossfadeDuration = 0 | 3 | 5 | 8 | 10;
export type SleepTimerOption = 'off' | '5m' | '10m' | '15m' | '30m' | '45m' | '60m' | 'end_of_track';
export type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

interface AudioContextType {
  currentTrack: MediaItem | null;
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  shuffle: boolean;
  repeatMode: 'off' | 'all' | 'one';
  crossfade: CrossfadeDuration;
  crossfadeSeconds: number;
  sleepTimer: SleepTimerOption;
  sleepTimerMinutes: number | null;
  sleepTimeRemaining: number | null;
  playbackSpeed: PlaybackSpeed;
  playbackRate: number;
  queue: Song[];
  queueIndex: number;
  likedSongs: Song[];
  isFullscreenOpen: boolean;
  isLyricsOpen: boolean;
  isVisualizerOpen: boolean;
  playTrack: (track: MediaItem, newQueue?: MediaItem[]) => void;
  playSong: (song: Song, playlistContext?: Song[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  playNext: (song?: Song) => void;
  prevTrack: () => void;
  playPrevious: () => void;
  seekTo: (seconds: number) => void;
  seek: (seconds: number) => void;
  changeVolume: (level: number) => void;
  setVolume: (level: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  cycleRepeat: () => void;
  setCrossfade: (duration: CrossfadeDuration) => void;
  setCrossfadeSeconds: (sec: number) => void;
  setSleepTimerOption: (option: SleepTimerOption) => void;
  setSleepTimer: (minutes: number | null) => void;
  setPlaybackSpeed: (speed: PlaybackSpeed) => void;
  setPlaybackRate: (speed: number) => void;
  addToQueue: (track: Song) => void;
  playNextInQueue: (track: Song) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  isLiked: (songId: string) => boolean;
  toggleLikeSong: (song: Song) => void;
  setIsFullscreenOpen: (open: boolean) => void;
  setIsLyricsOpen: (open: boolean) => void;
  setIsVisualizerOpen: (open: boolean) => void;
}

const DEFAULT_TRACK: Song = {
  id: 'song-1',
  title: 'Neon Horizon',
  artist: 'CyberPulse',
  artistId: 'art-1',
  album: 'Synthetic Dreams',
  albumId: 'alb-1',
  genre: 'Electronic',
  duration: 215,
  durationStr: '3:35',
  coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
  artwork: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
  audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  lyrics: 'Driving down the cyber road tonight\nNeon lights reflecting in the rain\nPushing speed into the endless grid\nCatch the neon horizon before it fades\nBasslines pulsing through the circuitry\nSoundWave transmissions take us home'
};

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<MediaItem | null>(DEFAULT_TRACK);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(215);
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('soundwave_volume');
    return saved !== null ? parseFloat(saved) : 0.8;
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');

  // Advanced Controls
  const [crossfade, setCrossfadeState] = useState<CrossfadeDuration>(3);
  const [sleepTimer, setSleepTimerState] = useState<SleepTimerOption>('off');
  const [sleepTimerMinutes, setSleepTimerMinutesState] = useState<number | null>(null);
  const [sleepTimeRemaining, setSleepTimeRemaining] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeedState] = useState<PlaybackSpeed>(1);

  // Liked Songs
  const [likedSongs, setLikedSongs] = useState<Song[]>(() => {
    try {
      const saved = localStorage.getItem('soundwave_liked_songs');
      return saved ? JSON.parse(saved) : [DEFAULT_TRACK];
    } catch {
      return [DEFAULT_TRACK];
    }
  });

  useEffect(() => {
    localStorage.setItem('soundwave_liked_songs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  // Queue & Views
  const [queue, setQueue] = useState<Song[]>([DEFAULT_TRACK]);
  const [queueIndex, setQueueIndex] = useState<number>(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevVolumeRef = useRef<number>(0.8);
  const synthTimerRef = useRef<any>(null);
  const sleepTimerIntervalRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

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
      if (sleepTimer === 'end_of_track') {
        setIsPlaying(false);
        setSleepTimerState('off');
        setSleepTimerMinutesState(null);
        setSleepTimeRemaining(null);
        return;
      }
      nextTrack();
    };

    const handleError = () => {
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
  }, [sleepTimer]);

  // Sync Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    localStorage.setItem('soundwave_volume', volume.toString());
  }, [volume, isMuted]);

  // Procedural synthesizer fallback for offline or broken audio links
  const startProceduralSynth = useCallback(() => {
    stopProceduralSynth();
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const notes = [220, 261.63, 329.63, 392.0, 440, 523.25];
      let step = 0;

      synthTimerRef.current = setInterval(() => {
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
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.75);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.8);
        } catch {}
      }, 750);
    } catch {}
  }, [isMuted, volume]);

  const stopProceduralSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  const playTrack = useCallback(
    (track: MediaItem, newQueue?: MediaItem[]) => {
      if (!track) return;
      const songItem = track as Song;

      if (newQueue && Array.isArray(newQueue) && newQueue.length > 0) {
        setQueue(newQueue as Song[]);
        const idx = newQueue.findIndex((t) => t.id === track.id);
        setQueueIndex(idx !== -1 ? idx : 0);
      } else {
        const existingIdx = queue.findIndex((t) => t.id === track.id);
        if (existingIdx !== -1) {
          setQueueIndex(existingIdx);
        } else {
          setQueue((prev) => [songItem, ...prev]);
          setQueueIndex(0);
        }
      }

      setCurrentTrack(songItem);
      setCurrentTime(0);
      setDuration(typeof songItem.duration === 'number' ? songItem.duration : 215);

      if (audioRef.current) {
        audioRef.current.src = track.audioUrl || '';
        audioRef.current.currentTime = 0;
        audioRef.current.playbackRate = playbackSpeed;
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
    },
    [queue, playbackSpeed, startProceduralSynth]
  );

  const playSong = useCallback(
    (song: Song, playlistContext?: Song[]) => {
      playTrack(song, playlistContext);
    },
    [playTrack]
  );

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      stopProceduralSynth();
    } else {
      if (!audioRef.current.src && currentTrack) {
        audioRef.current.src = currentTrack.audioUrl;
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
  }, [isPlaying, currentTrack, startProceduralSynth]);

  const nextTrack = useCallback(() => {
    if (repeatMode === 'one' && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }

    if (queue.length === 0) return;

    let nextIdx: number;
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
    const nextItem = queue[nextIdx];
    if (nextItem) playTrack(nextItem);
  }, [queue, queueIndex, isShuffle, repeatMode, playTrack]);

  const prevTrack = useCallback(() => {
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
    const prevItem = queue[prevIdx];
    if (prevItem) playTrack(prevItem);
  }, [queue, queueIndex, playTrack]);

  const seekTo = (seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(clamped);
    if (audioRef.current) {
      audioRef.current.currentTime = clamped;
    }
  };

  const changeVolume = (level: number) => {
    const clamped = Math.max(0, Math.min(1, level));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolumeState(prevVolumeRef.current || 0.8);
    } else {
      prevVolumeRef.current = volume;
      setIsMuted(true);
    }
  };

  const toggleShuffle = () => setIsShuffle((prev) => !prev);

  const cycleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const setPlaybackSpeed = (speed: PlaybackSpeed) => {
    setPlaybackSpeedState(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const setSleepTimer = (minutes: number | null) => {
    setSleepTimerMinutesState(minutes);
    if (sleepTimerIntervalRef.current) {
      clearInterval(sleepTimerIntervalRef.current);
      sleepTimerIntervalRef.current = null;
    }

    if (!minutes || minutes <= 0) {
      setSleepTimerState('off');
      setSleepTimeRemaining(null);
      return;
    }

    setSleepTimerState(`${minutes}m` as SleepTimerOption);
    let seconds = minutes * 60;
    setSleepTimeRemaining(seconds);

    sleepTimerIntervalRef.current = setInterval(() => {
      seconds -= 1;
      setSleepTimeRemaining(seconds);
      setSleepTimerMinutesState(Math.ceil(seconds / 60));
      if (seconds <= 0) {
        clearInterval(sleepTimerIntervalRef.current);
        if (audioRef.current) audioRef.current.pause();
        setIsPlaying(false);
        setSleepTimerState('off');
        setSleepTimerMinutesState(null);
        setSleepTimeRemaining(null);
      }
    }, 1000);
  };

  const setSleepTimerOption = (option: SleepTimerOption) => {
    const minutesMap: Record<string, number> = {
      '5m': 5,
      '10m': 10,
      '15m': 15,
      '30m': 30,
      '45m': 45,
      '60m': 60,
    };
    if (option === 'off') setSleepTimer(null);
    else if (option === 'end_of_track') {
      setSleepTimerState('end_of_track');
      setSleepTimerMinutesState(null);
    } else {
      setSleepTimer(minutesMap[option] || 15);
    }
  };

  const isLiked = (songId: string) => likedSongs.some((s) => s.id === songId);

  const toggleLikeSong = (song: Song) => {
    setLikedSongs((prev) => {
      const exists = prev.some((s) => s.id === song.id);
      if (exists) {
        return prev.filter((s) => s.id !== song.id);
      } else {
        return [song, ...prev];
      }
    });
  };

  const currentSong = currentTrack as Song | null;

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        shuffle: isShuffle,
        repeatMode,
        crossfade,
        crossfadeSeconds: crossfade,
        sleepTimer,
        sleepTimerMinutes,
        sleepTimeRemaining,
        playbackSpeed,
        playbackRate: playbackSpeed,
        queue,
        queueIndex,
        likedSongs,
        isFullscreenOpen,
        isLyricsOpen,
        isVisualizerOpen,
        playTrack,
        playSong,
        togglePlay,
        nextTrack,
        playNext: (s?: Song) => (s ? playTrack(s) : nextTrack()),
        prevTrack,
        playPrevious: prevTrack,
        seekTo,
        seek: seekTo,
        changeVolume,
        setVolume: changeVolume,
        toggleMute,
        toggleShuffle,
        toggleRepeat: cycleRepeat,
        cycleRepeat,
        setCrossfade: (d: CrossfadeDuration) => setCrossfadeState(d),
        setCrossfadeSeconds: (sec: number) => setCrossfadeState((sec as CrossfadeDuration) || 0),
        setSleepTimerOption,
        setSleepTimer,
        setPlaybackSpeed,
        setPlaybackRate: (r: number) => setPlaybackSpeed(r as PlaybackSpeed),
        addToQueue: (track: Song) => setQueue((prev) => [...prev, track]),
        playNextInQueue: (track: Song) => {
          setQueue((prev) => {
            const nextList = [...prev];
            nextList.splice(queueIndex + 1, 0, track);
            return nextList;
          });
        },
        removeFromQueue: (index: number) => {
          setQueue((prev) => prev.filter((_, i) => i !== index));
          if (index < queueIndex) setQueueIndex((prev) => prev - 1);
        },
        clearQueue: () => {
          if (currentSong) {
            setQueue([currentSong]);
            setQueueIndex(0);
          } else {
            setQueue([]);
            setQueueIndex(0);
          }
        },
        isLiked,
        toggleLikeSong,
        setIsFullscreenOpen,
        setIsLyricsOpen,
        setIsVisualizerOpen,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};
