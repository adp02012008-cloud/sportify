import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 shadow-xl">
        <Radio size={36} className="animate-pulse" />
      </div>
      <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-gray-200 mt-2">Frequency Not Found</h2>
      <p className="text-xs sm:text-sm text-gray-400 max-w-sm mt-1">
        The acoustic transmission you are looking for has drifted beyond our orbital broadcast range.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        <Home size={15} />
        <span>Return to Home Base</span>
      </button>
    </div>
  );
};
