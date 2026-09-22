import React, { useState } from 'react';
import { X, Clock, CheckCircle2, Moon } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useToast } from '../../context/ToastContext';

interface SleepTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SleepTimerModal: React.FC<SleepTimerModalProps> = ({ isOpen, onClose }) => {
  const { sleepTimerMinutes, setSleepTimer } = useAudio();
  const { addToast } = useToast();
  const [customInput, setCustomInput] = useState('');

  if (!isOpen) return null;

  const presets = [5, 15, 30, 45, 60];

  const handleSelectPreset = (mins: number) => {
    setSleepTimer(mins);
    addToast(`Sleep timer set for ${mins} minutes`, 'success');
    onClose();
  };

  const handleCancelTimer = () => {
    setSleepTimer(null);
    addToast('Sleep timer turned off', 'info');
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customInput, 10);
    if (val && val > 0 && val <= 300) {
      setSleepTimer(val);
      addToast(`Sleep timer set for ${val} minutes`, 'success');
      onClose();
    } else {
      addToast('Please enter a duration between 1 and 300 minutes', 'warning');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#121424] border border-[#262a4d] rounded-2xl p-5 shadow-2xl relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Moon size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Sleep Timer</h2>
            <p className="text-xs text-gray-400">Audio will gently fade out and stop</p>
          </div>
        </div>

        {/* Preset list */}
        <div className="space-y-1.5 mb-4">
          {presets.map((mins) => {
            const isCurrent = sleepTimerMinutes === mins;
            return (
              <button
                key={mins}
                onClick={() => handleSelectPreset(mins)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  isCurrent
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-[#181a2e] text-gray-200 hover:bg-[#222543]'
                }`}
              >
                <span>{mins} minutes</span>
                {isCurrent && <CheckCircle2 size={16} className="text-purple-400" />}
              </button>
            );
          })}
        </div>

        {/* Custom duration */}
        <form onSubmit={handleCustomSubmit} className="pt-3 border-t border-[#222543] mb-4">
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Custom duration (minutes)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="300"
              placeholder="e.g. 90"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-[#181a2e] border border-[#2b2f52] focus:border-purple-400 text-xs text-white placeholder-gray-500 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold transition-colors"
            >
              Set
            </button>
          </div>
        </form>

        {/* Cancel button if active */}
        {sleepTimerMinutes !== null && (
          <button
            onClick={handleCancelTimer}
            className="w-full py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold transition-colors"
          >
            Turn Off Sleep Timer ({sleepTimerMinutes}m remaining)
          </button>
        )}
      </div>
    </div>
  );
};
