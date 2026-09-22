import React, { useState } from 'react';
import { Settings as SettingsIcon, Sliders, Volume2, ShieldCheck, Zap, Sparkles, Check } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Settings: React.FC = () => {
  const { crossfadeSeconds, setCrossfadeSeconds } = useAudio();
  const { user, switchDemoRole } = useAuth();
  const { addToast } = useToast();

  const [audioQuality, setAudioQuality] = useState('320k');
  const [normalizeVolume, setNormalizeVolume] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [equalizerPreset, setEqualizerPreset] = useState('Electronic');

  const crossfadeOptions = [0, 3, 5, 8, 10];
  const eqPresets = ['Flat', 'Bass Boost', 'Acoustic', 'Electronic', 'Vocal Presence', 'Club'];

  return (
    <div className="space-y-8 pb-16 max-w-4xl">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171a36] via-[#121429] to-[#0a0b14] border border-[#262a52] flex items-center justify-between shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <SettingsIcon size={14} />
            <span>Preferences & Playback</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Playback Settings</h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Tune acoustic fidelity, audio transition crossfading, and streaming engine behaviors.
          </p>
        </div>
      </div>

      {/* Crossfade Audio Transition */}
      <section className="p-6 rounded-3xl bg-[#131526] border border-[#232746] space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders size={16} className="text-cyan-400" />
              <span>Crossfade Transition</span>
            </h3>
            <p className="text-xs text-gray-400">
              Overlap audio seamlessly between ending and upcoming songs without silence.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            {crossfadeSeconds === 0 ? 'Disabled' : `${crossfadeSeconds} seconds`}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 pt-2">
          {crossfadeOptions.map((sec) => (
            <button
              key={sec}
              onClick={() => {
                setCrossfadeSeconds(sec);
                addToast(sec === 0 ? 'Crossfade turned off' : `Crossfade set to ${sec}s`, 'info');
              }}
              className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                crossfadeSeconds === sec
                  ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20'
                  : 'bg-[#191c33] text-gray-300 hover:bg-[#222644]'
              }`}
            >
              {sec === 0 ? 'Off' : `${sec}s`}
            </button>
          ))}
        </div>
      </section>

      {/* Audio Streaming Quality */}
      <section className="p-6 rounded-3xl bg-[#131526] border border-[#232746] space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap size={16} className="text-purple-400" />
            <span>Streaming Audio Quality</span>
          </h3>
          <p className="text-xs text-gray-400">
            Higher streaming bitrates provide studio-grade frequency clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: '160k', label: 'Standard (160 kbps)', desc: 'Balanced data usage' },
            { id: '320k', label: 'High Fidelity (320 kbps)', desc: 'Studio crisp highs & lows' },
            { id: 'flac', label: 'Lossless HiFi (FLAC)', desc: 'Bit-perfect audio stream' },
          ].map((q) => (
            <div
              key={q.id}
              onClick={() => {
                setAudioQuality(q.id);
                addToast(`Audio quality: ${q.label}`, 'success');
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                audioQuality === q.id
                  ? 'bg-purple-500/15 border-purple-500/40 text-purple-200'
                  : 'bg-[#181a30] hover:bg-[#1e213d] border-transparent text-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{q.label}</span>
                {audioQuality === q.id && <Check size={16} className="text-purple-400" />}
              </div>
              <p className="text-[11px] text-gray-400 mt-1">{q.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Equalizer Preset */}
      <section className="p-6 rounded-3xl bg-[#131526] border border-[#232746] space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Volume2 size={16} className="text-emerald-400" />
            <span>Harmonic Equalizer Preset</span>
          </h3>
          <p className="text-xs text-gray-400">
            Adjust acoustic response curve for headphones or speakers.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {eqPresets.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setEqualizerPreset(preset);
                addToast(`Equalizer set to "${preset}"`, 'info');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                equalizerPreset === preset
                  ? 'bg-emerald-400 text-black font-bold shadow-md'
                  : 'bg-[#191c33] text-gray-300 hover:bg-[#222644]'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </section>

      {/* Engine Toggles */}
      <section className="p-6 rounded-3xl bg-[#131526] border border-[#232746] space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-[#212440]">
          <div>
            <h4 className="text-xs font-bold text-white">Normalize Volume</h4>
            <p className="text-[11px] text-gray-400">Maintains uniform perceived loudness across songs</p>
          </div>
          <input
            type="checkbox"
            checked={normalizeVolume}
            onChange={(e) => setNormalizeVolume(e.target.checked)}
            className="w-4 h-4 accent-cyan-400 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="text-xs font-bold text-white">Autoplay Recommended Tracks</h4>
            <p className="text-[11px] text-gray-400">Keep streaming similar tracks when your playlist ends</p>
          </div>
          <input
            type="checkbox"
            checked={autoplay}
            onChange={(e) => setAutoplay(e.target.checked)}
            className="w-4 h-4 accent-cyan-400 cursor-pointer"
          />
        </div>
      </section>
    </div>
  );
};
