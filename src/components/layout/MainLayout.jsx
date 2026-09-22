import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from '../common/Header';
import { MusicPlayer } from '../player/MusicPlayer';
import { BottomNav } from './BottomNav';

export const MainLayout = () => {
  return (
    <div className="app-container">
      <div className="main-body">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Scrollable Viewport */}
        <div className="content-viewport">
          <Header />
          <main className="page-content">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Sticky Bottom Music Player */}
      <MusicPlayer />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
