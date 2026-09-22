import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Library } from './pages/Library';
import { LikedSongs } from './pages/LikedSongs';
import { PlaylistDetail } from './pages/PlaylistDetail';
import { AlbumDetail } from './pages/AlbumDetail';
import { ArtistDetail } from './pages/ArtistDetail';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="library" element={<Library />} />
        <Route path="liked" element={<LikedSongs />} />
        <Route path="playlist/:id" element={<PlaylistDetail />} />
        <Route path="album/:id" element={<AlbumDetail />} />
        <Route path="artist/:id" element={<ArtistDetail />} />
        <Route path="settings" element={<Settings />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
