import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ToastProvider } from './context/ToastContext';
import { UserProvider } from './context/UserContext';
import { LibraryProvider } from './context/LibraryContext';
import { AudioProvider } from './context/AudioContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <UserProvider>
          <LibraryProvider>
            <AudioProvider>
              <App />
            </AudioProvider>
          </LibraryProvider>
        </UserProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
