import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast('Please fill in all required fields', 'warning');
      return;
    }

    try {
      setLoading(true);
      await signup(name, email, password);
      addToast('Welcome to SoundWave! Account created successfully', 'success');
      navigate('/');
    } catch (err: any) {
      console.error('Signup error', err);
      addToast(err.response?.data?.message || 'Could not complete registration', 'error');
    } finally {
      setLoading(false);
    }
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
            Sign up for SoundWave
          </h1>
          <p className="text-xs text-gray-400">
            Join millions enjoying ad-free lossless audio streaming
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sarah Connor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#191b32] border border-[#2c3057] focus:border-cyan-400 text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#191b32] border border-[#2c3057] focus:border-cyan-400 text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="At least 6 characters"
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
                <span>Create Account</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#232644]">
          <p className="text-xs text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
