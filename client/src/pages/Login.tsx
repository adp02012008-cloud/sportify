import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchDemoRole } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password', 'warning');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      addToast('Welcome back to SoundWave!', 'success');
      navigate('/');
    } catch (err: any) {
      console.error('Login error', err);
      addToast(err.response?.data?.message || 'Invalid email or password', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: 'USER' | 'PREMIUM_USER' | 'ADMIN') => {
    switchDemoRole(role);
    addToast(`Logged in as Demo ${role}`, 'success');
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#121424] border border-[#262a4d] rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-500 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Sparkles size={24} className="text-black" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Log in to SoundWave
          </h1>
          <p className="text-xs text-gray-400">
            Stream high-fidelity music, audiobooks, and original podcasts
          </p>
        </div>

        {/* Demo 1-Click Login Quick Buttons */}
        <div className="p-4 rounded-2xl bg-[#17192f] border border-[#25284b] space-y-2.5">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block text-center">
            ⚡ Quick 1-Click Test Access
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('USER')}
              className="px-2 py-2 rounded-xl bg-[#20233f] hover:bg-[#2b2f56] text-[11px] font-semibold text-gray-200 transition-colors"
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('PREMIUM_USER')}
              className="px-2 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-[11px] font-bold text-purple-300 border border-purple-500/30 transition-colors"
            >
              Premium
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('ADMIN')}
              className="px-2 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-[11px] font-bold text-emerald-300 border border-emerald-500/30 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Traditional Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="user@soundwave.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#191b32] border border-[#2c3057] focus:border-cyan-400 text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-gray-300">Password</label>
              <span className="text-gray-500 hover:text-cyan-400 cursor-pointer">
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#191b32] border border-[#2c3057] focus:border-cyan-400 text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold text-sm shadow-lg shadow-cyan-500/20 hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Signup Redirect Link */}
        <div className="text-center pt-2 border-t border-[#232644]">
          <p className="text-xs text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-cyan-400 font-semibold hover:underline">
              Create SoundWave Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
