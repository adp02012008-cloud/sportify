import React from 'react';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';
import {
  User,
  Sliders,
  Volume2,
  Shield,
  Bell,
  Sparkles,
  Palette,
  Check
} from 'lucide-react';

const ToggleSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    style={{
      width: '44px',
      height: '24px',
      borderRadius: '9999px',
      background: checked ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.15)',
      position: 'relative',
      transition: 'background var(--transition-fast)',
      padding: '2px',
      cursor: 'pointer'
    }}
  >
    <div
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: '#ffffff',
        transform: checked ? 'translateX(20px)' : 'translateX(0)',
        transition: 'transform var(--transition-fast)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
      }}
    />
  </button>
);

export const Settings = () => {
  const { user, settings, updateSettings } = useUser();
  const { addToast } = useToast();

  const handleSettingChange = (key, val, label) => {
    updateSettings(key, val);
    addToast(`${label || 'Setting'} updated`, 'info');
  };

  return (
    <div style={{ maxWidth: '840px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      <div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '2px' }}>
          Customize your streaming playback, audio fidelity, and account preferences
        </p>
      </div>

      {/* Account Section */}
      <section className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <User size={20} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Account & Membership</h2>
        </div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{user.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                <div className="badge" style={{ marginTop: '6px' }}>{user.tier}</div>
              </div>
            </div>

            <button
              onClick={() => addToast('Account is in good standing', 'success')}
              className="btn-secondary"
            >
              Manage Subscription
            </button>
          </div>
        ) : (
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            You are browsing as a guest.{' '}
            <a href="/login" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>
              Log in or sign up
            </a>{' '}
            to sync across devices.
          </div>
        )}
      </section>

      {/* Audio Playback & Quality */}
      <section className="glass-panel" style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Volume2 size={20} color="var(--accent-blue)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Audio Quality & Streaming</h2>
        </div>

        {/* Streaming Quality */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Streaming Quality</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Controls the bit rate and acoustic fidelity of streamed tracks
            </div>
          </div>

          <select
            value={settings.audioQuality}
            onChange={(e) => handleSettingChange('audioQuality', e.target.value, 'Audio quality')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              fontSize: '0.86rem'
            }}
          >
            <option value="normal" style={{ background: '#14141e' }}>Normal (160 kbit/s)</option>
            <option value="high" style={{ background: '#14141e' }}>High (320 kbit/s)</option>
            <option value="lossless" style={{ background: '#14141e' }}>Lossless Hi-Fi (24-bit/96kHz FLAC)</option>
          </select>
        </div>

        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />

        {/* Crossfade */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Crossfade Tracks</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Smooth transitions between ending songs and next tracks: {settings.crossfade}s
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="range"
              min="0"
              max="12"
              step="1"
              value={settings.crossfade}
              onChange={(e) => handleSettingChange('crossfade', parseInt(e.target.value), 'Crossfade')}
              style={{ width: '120px', accentColor: 'var(--accent-cyan)' }}
            />
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', width: '30px' }}>
              {settings.crossfade}s
            </span>
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />

        {/* Normalize Volume */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Normalize Volume</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Set the same uniform volume level for all tracks
            </div>
          </div>
          <ToggleSwitch
            checked={settings.normalizeVolume}
            onChange={(val) => handleSettingChange('normalizeVolume', val, 'Volume normalization')}
          />
        </div>

        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />

        {/* Autoplay Similar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Autoplay Similar Songs</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Keep the music playing with recommendations when your queue finishes
            </div>
          </div>
          <ToggleSwitch
            checked={settings.autoplaySimilar}
            onChange={(val) => handleSettingChange('autoplaySimilar', val, 'Autoplay')}
          />
        </div>
      </section>

      {/* Theme & Accents */}
      <section className="glass-panel" style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Palette size={20} color="var(--accent-purple)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Appearance & Accent Colors</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Theme Accent</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Choose your primary neon glow highlight color
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { id: 'cyan', color: '#06b6d4', label: 'Cyan' },
              { id: 'purple', color: '#8b5cf6', label: 'Purple' },
              { id: 'emerald', color: '#10b981', label: 'Emerald' },
              { id: 'pink', color: '#ec4899', label: 'Pink' }
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleSettingChange('accentTheme', theme.id, 'Accent color')}
                title={theme.label}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: theme.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: settings.accentTheme === theme.id ? '3px solid #fff' : 'none',
                  boxShadow: settings.accentTheme === theme.id ? `0 0 10px ${theme.color}` : 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {settings.accentTheme === theme.id && <Check size={14} color="#fff" strokeWidth={3} />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Notifications */}
      <section className="glass-panel" style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={20} color="#10b981" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Privacy & Notifications</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Private Listening Session</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Temporarily hide your activity from followers
            </div>
          </div>
          <ToggleSwitch
            checked={settings.privateSession}
            onChange={(val) => handleSettingChange('privateSession', val, 'Private session')}
          />
        </div>

        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Push Notifications</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Get alerts for new releases from artists you follow
            </div>
          </div>
          <ToggleSwitch
            checked={settings.pushNotifications}
            onChange={(val) => handleSettingChange('pushNotifications', val, 'Push notifications')}
          />
        </div>
      </section>
    </div>
  );
};
