import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockPlaylists } from '../data/mockPlaylists';
import { useToast } from './ToastContext';

const LibraryContext = createContext(null);

const DEFAULT_LIKED_SONGS = ['song-1', 'song-4', 'song-7', 'song-10', 'song-13', 'song-16'];
const DEFAULT_SAVED_ALBUMS = ['alb-1', 'alb-3', 'alb-7', 'alb-11'];
const DEFAULT_FOLLOWED_ARTISTS = ['art-1', 'art-3', 'art-7', 'art-9', 'art-11'];

export const LibraryProvider = ({ children }) => {
  const { addToast } = useToast();

  const [likedSongIds, setLikedSongIds] = useState(() => {
    try {
      const saved = localStorage.getItem('soundwave_liked_songs');
      return saved ? JSON.parse(saved) : DEFAULT_LIKED_SONGS;
    } catch {
      return DEFAULT_LIKED_SONGS;
    }
  });

  const [savedAlbumIds, setSavedAlbumIds] = useState(() => {
    try {
      const saved = localStorage.getItem('soundwave_saved_albums');
      return saved ? JSON.parse(saved) : DEFAULT_SAVED_ALBUMS;
    } catch {
      return DEFAULT_SAVED_ALBUMS;
    }
  });

  const [followedArtistIds, setFollowedArtistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('soundwave_followed_artists');
      return saved ? JSON.parse(saved) : DEFAULT_FOLLOWED_ARTISTS;
    } catch {
      return DEFAULT_FOLLOWED_ARTISTS;
    }
  });

  const [customPlaylists, setCustomPlaylists] = useState(() => {
    try {
      const saved = localStorage.getItem('soundwave_custom_playlists');
      return saved ? JSON.parse(saved) : [
        {
          id: 'user-pl-1',
          name: 'My Night Drive',
          description: 'Personal favorite late-night anthems and synthwave.',
          creator: 'Alex Vance',
          isUserCreated: true,
          cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
          songIds: ['song-1', 'song-3', 'song-29', 'song-18'],
          createdAt: '2024-01-15'
        },
        {
          id: 'user-pl-2',
          name: 'Focus & Flow',
          description: 'Acoustic & lo-fi tracks to keep distractions away.',
          creator: 'Alex Vance',
          isUserCreated: true,
          cover: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
          songIds: ['song-16', 'song-17', 'song-27'],
          createdAt: '2024-02-01'
        }
      ];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('soundwave_liked_songs', JSON.stringify(likedSongIds));
  }, [likedSongIds]);

  useEffect(() => {
    localStorage.setItem('soundwave_saved_albums', JSON.stringify(savedAlbumIds));
  }, [savedAlbumIds]);

  useEffect(() => {
    localStorage.setItem('soundwave_followed_artists', JSON.stringify(followedArtistIds));
  }, [followedArtistIds]);

  useEffect(() => {
    localStorage.setItem('soundwave_custom_playlists', JSON.stringify(customPlaylists));
  }, [customPlaylists]);

  // All combined playlists
  const allPlaylists = [...customPlaylists, ...mockPlaylists];

  // Actions
  const isSongLiked = (songId) => likedSongIds.includes(songId);

  const toggleLikeSong = (songId, songTitle) => {
    if (likedSongIds.includes(songId)) {
      setLikedSongIds((prev) => prev.filter((id) => id !== songId));
      addToast(songTitle ? `Removed "${songTitle}" from Liked Songs` : 'Removed from Liked Songs', 'info');
    } else {
      setLikedSongIds((prev) => [songId, ...prev]);
      addToast(songTitle ? `Added "${songTitle}" to Liked Songs` : 'Added to Liked Songs', 'success');
    }
  };

  const isAlbumSaved = (albumId) => savedAlbumIds.includes(albumId);

  const toggleSaveAlbum = (albumId, albumTitle) => {
    if (savedAlbumIds.includes(albumId)) {
      setSavedAlbumIds((prev) => prev.filter((id) => id !== albumId));
      addToast(albumTitle ? `Removed "${albumTitle}" from Your Library` : 'Removed album from library', 'info');
    } else {
      setSavedAlbumIds((prev) => [albumId, ...prev]);
      addToast(albumTitle ? `Saved "${albumTitle}" to Your Library` : 'Saved album to library', 'success');
    }
  };

  const isArtistFollowed = (artistId) => followedArtistIds.includes(artistId);

  const toggleFollowArtist = (artistId, artistName) => {
    if (followedArtistIds.includes(artistId)) {
      setFollowedArtistIds((prev) => prev.filter((id) => id !== artistId));
      addToast(`Unfollowed ${artistName || 'artist'}`, 'info');
    } else {
      setFollowedArtistIds((prev) => [artistId, ...prev]);
      addToast(`Following ${artistName || 'artist'}`, 'success');
    }
  };

  const createPlaylist = (name = 'New Playlist', description = '', cover = '') => {
    const id = 'user-pl-' + Date.now();
    const newPlaylist = {
      id,
      name,
      description: description || 'Created by you on SoundWave',
      creator: 'You',
      isUserCreated: true,
      cover: cover || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      songIds: [],
      createdAt: new Date().toISOString()
    };
    setCustomPlaylists((prev) => [newPlaylist, ...prev]);
    addToast(`Playlist "${name}" created!`, 'success');
    return id;
  };

  const deletePlaylist = (playlistId) => {
    const target = customPlaylists.find((p) => p.id === playlistId);
    setCustomPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
    addToast(`Deleted playlist "${target?.name || 'Playlist'}"`, 'info');
  };

  const updatePlaylist = (playlistId, { name, description, cover }) => {
    setCustomPlaylists((prev) =>
      prev.map((p) => {
        if (p.id === playlistId) {
          return {
            ...p,
            name: name !== undefined ? name : p.name,
            description: description !== undefined ? description : p.description,
            cover: cover !== undefined ? cover : p.cover
          };
        }
        return p;
      })
    );
    addToast('Playlist updated', 'success');
  };

  const addSongToPlaylist = (playlistId, songId, songTitle) => {
    let playlistName = '';
    setCustomPlaylists((prev) =>
      prev.map((p) => {
        if (p.id === playlistId) {
          playlistName = p.name;
          if (p.songIds.includes(songId)) {
            return p;
          }
          return { ...p, songIds: [...p.songIds, songId] };
        }
        return p;
      })
    );
    addToast(
      songTitle ? `Added "${songTitle}" to "${playlistName}"` : `Added song to playlist`,
      'success'
    );
  };

  const removeSongFromPlaylist = (playlistId, songId, songTitle) => {
    setCustomPlaylists((prev) =>
      prev.map((p) => {
        if (p.id === playlistId) {
          return { ...p, songIds: p.songIds.filter((id) => id !== songId) };
        }
        return p;
      })
    );
    addToast(
      songTitle ? `Removed "${songTitle}" from playlist` : `Removed song from playlist`,
      'info'
    );
  };

  const reorderPlaylistSongs = (playlistId, newSongIds) => {
    setCustomPlaylists((prev) =>
      prev.map((p) => (p.id === playlistId ? { ...p, songIds: newSongIds } : p))
    );
  };

  return (
    <LibraryContext.Provider
      value={{
        likedSongIds,
        savedAlbumIds,
        followedArtistIds,
        customPlaylists,
        allPlaylists,
        isSongLiked,
        toggleLikeSong,
        isAlbumSaved,
        toggleSaveAlbum,
        isArtistFollowed,
        toggleFollowArtist,
        createPlaylist,
        deletePlaylist,
        updatePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        reorderPlaylistSongs
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within LibraryProvider');
  }
  return context;
};
