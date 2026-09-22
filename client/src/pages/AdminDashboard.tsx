import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Music, 
  Disc3, 
  CreditCard, 
  Plus, 
  Trash2, 
  TrendingUp, 
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  Download,
  RefreshCw,
  FileSpreadsheet,
  BarChart3,
  AlertTriangle,
  Activity,
  Flame,
  Layers,
  HeartHandshake,
  Star,
  Clock,
  LogIn,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Song, Artist, Album, User, DummyAnalyticsUser, AnalyticsDatasetResponse } from '../types';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { generateDummyUsers } from '../services/dummyDataGenerator';

export const AdminDashboard: React.FC = () => {
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<'analytics' | 'export-dataset' | 'songs' | 'artists' | 'albums' | 'users'>('export-dataset');
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // New Song form modal state
  const [showAddSong, setShowAddSong] = useState(false);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [newSongAlbum, setNewSongAlbum] = useState('');
  const [newSongGenre, setNewSongGenre] = useState('Synthwave');
  const [newSongDuration, setNewSongDuration] = useState('3:45');
  const [newSongAudioUrl, setNewSongAudioUrl] = useState('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  const [newSongCoverUrl, setNewSongCoverUrl] = useState('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80');

  // Dummy Dataset Generator & Analytics State
  const [datasetCount, setDatasetCount] = useState<number>(100);
  const [datasetLoading, setDatasetLoading] = useState<boolean>(false);
  const [datasetData, setDatasetData] = useState<AnalyticsDatasetResponse | null>(null);
  const [datasetSearch, setDatasetSearch] = useState<string>('');
  const [datasetSegmentFilter, setDatasetSegmentFilter] = useState<string>('All');
  const [datasetChurnFilter, setDatasetChurnFilter] = useState<'All' | '0' | '1'>('All');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [songsRes, artistsRes, albumsRes, usersRes] = await Promise.all([
        api.songs.getAll(),
        api.artists.getAll(),
        api.albums.getAll(),
        api.admin.getUsers(),
      ]);

      setSongs(songsRes.data);
      setArtists(artistsRes.data);
      setAlbums(albumsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataset = async (count: number = datasetCount) => {
    try {
      setDatasetLoading(true);
      try {
        const res = await api.admin.getAnalyticsDataset(count);
        if (res && res.success && res.users && res.users.length > 0) {
          setDatasetData(res);
          addToast(`Generated ${res.count} realistic SoundWave users!`, 'success');
          return;
        }
      } catch (backendErr) {
        console.warn('Backend analytics API unavailable or warming up, generating instant client dataset', backendErr);
      }

      // Instant client-side fallback
      const users = generateDummyUsers(count);
      const totalUsers = users.length;
      const activeUsers = users.filter((u) => u.churn === 0).length;
      const churnedUsers = users.filter((u) => u.churn === 1).length;
      const premiumUsers = users.filter((u) => u.plan === 'Premium' || u.plan === 'Family' || u.plan === 'Student').length;
      const highChurnRiskUsers = users.filter((u) => u.churn_risk === 'High').length;

      const avgEngagement = Math.round((users.reduce((acc, u) => acc + u.engagement_score, 0) / totalUsers) * 10) / 10;
      const avgSatisfaction = Math.round((users.reduce((acc, u) => acc + u.satisfaction_score, 0) / totalUsers) * 10) / 10;
      const avgMonthlyListeningHours = Math.round((users.reduce((acc, u) => acc + u.monthly_usage_hours, 0) / totalUsers) * 10) / 10;
      const avgMonthlyBill = Math.round((users.reduce((acc, u) => acc + u.monthly_bill, 0) / totalUsers) * 10) / 10;
      const avgLoginFrequency = Math.round((users.reduce((acc, u) => acc + u.login_frequency, 0) / totalUsers) * 10) / 10;

      const planDistribution = users.reduce((acc: Record<string, number>, u) => {
        acc[u.plan] = (acc[u.plan] || 0) + 1;
        return acc;
      }, {});
      const churnDistribution = { Active: activeUsers, Churned: churnedUsers };
      const churnRiskDistribution = users.reduce((acc: Record<string, number>, u) => {
        acc[u.churn_risk] = (acc[u.churn_risk] || 0) + 1;
        return acc;
      }, {});
      const segmentDistribution = users.reduce((acc: Record<string, number>, u) => {
        acc[u.user_segment] = (acc[u.user_segment] || 0) + 1;
        return acc;
      }, {});

      setDatasetData({
        success: true,
        count: totalUsers,
        summary: {
          totalUsers,
          activeUsers,
          churnedUsers,
          premiumUsers,
          avgEngagement,
          avgSatisfaction,
          avgMonthlyListeningHours,
          avgMonthlyBill,
          avgLoginFrequency,
          highChurnRiskUsers
        },
        distributions: {
          plans: planDistribution,
          churn: churnDistribution,
          churnRisk: churnRiskDistribution,
          segments: segmentDistribution
        },
        users
      });
      addToast(`Generated ${totalUsers} realistic SoundWave users!`, 'success');
    } catch (err: any) {
      console.error('Failed to generate dataset', err);
      addToast('Failed to generate analytics dataset', 'error');
    } finally {
      setDatasetLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataset(100);
  }, []);

  const convertToCSV = (usersList: DummyAnalyticsUser[]): string => {
    if (usersList.length === 0) return '';
    const headers = Object.keys(usersList[0]);
    const rows = usersList.map((u) =>
      headers
        .map((header) => {
          const val = (u as any)[header];
          if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
            return `"${val.replace(/"/g, '""')}"`;
          }
          return val !== undefined && val !== null ? val : '';
        })
        .join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  };

  const handleDownloadCSV = () => {
    if (!datasetData || datasetData.users.length === 0) {
      addToast('Please generate a dataset first', 'warning');
      return;
    }
    const csvContent = convertToCSV(datasetData.users);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'soundwave_users_analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast(`Downloaded soundwave_users_analytics.csv (${datasetData.users.length} users)`, 'success');
  };

  const handleDeleteSong = async (id: string, title: string) => {
    if (window.confirm(`Delete song "${title}"?`)) {
      try {
        await api.admin.deleteSong(id);
        setSongs((prev) => prev.filter((s) => s.id !== id));
        addToast(`Song "${title}" deleted`, 'success');
      } catch (err) {
        addToast('Failed to delete song', 'error');
      }
    }
  };

  const handleCreateSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSongTitle || !newSongArtist) {
      addToast('Please provide Title and Artist', 'warning');
      return;
    }

    try {
      const res = await api.admin.createSong({
        title: newSongTitle,
        artist: newSongArtist,
        album: newSongAlbum || 'SoundWave Singles',
        genre: newSongGenre,
        duration: newSongDuration,
        audioUrl: newSongAudioUrl,
        coverUrl: newSongCoverUrl,
      });

      setSongs((prev) => [res.data, ...prev]);
      setShowAddSong(false);
      setNewSongTitle('');
      setNewSongArtist('');
      addToast(`Added song "${res.data.title}"`, 'success');
    } catch (err) {
      addToast('Failed to create song', 'error');
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'USER' | 'PREMIUM_USER' | 'ADMIN') => {
    try {
      await api.admin.updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      addToast(`Updated user role to ${newRole}`, 'success');
    } catch (err) {
      addToast('Failed to update role', 'error');
    }
  };

  // Filtered dataset users for preview table
  const filteredUsers = (datasetData?.users || []).filter((u) => {
    const matchesSearch =
      datasetSearch.trim() === '' ||
      u.customer_id.toLowerCase().includes(datasetSearch.toLowerCase()) ||
      u.name.toLowerCase().includes(datasetSearch.toLowerCase()) ||
      u.city.toLowerCase().includes(datasetSearch.toLowerCase()) ||
      u.favorite_genre.toLowerCase().includes(datasetSearch.toLowerCase()) ||
      u.user_segment.toLowerCase().includes(datasetSearch.toLowerCase());

    const matchesSegment =
      datasetSegmentFilter === 'All' || u.user_segment === datasetSegmentFilter;

    const matchesChurn =
      datasetChurnFilter === 'All' || String(u.churn) === datasetChurnFilter;

    return matchesSearch && matchesSegment && matchesChurn;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#172421] via-[#101b1b] to-[#091114] border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
            <ShieldCheck size={14} />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">SoundWave Admin Panel</h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
            Simulate user behaviour, evaluate churn and retention ML models, manage audio catalogue, and oversee platform activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('export-dataset')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-black text-xs font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <FileSpreadsheet size={16} />
            <span>User Analytics & Export</span>
          </button>
          <button
            onClick={() => setShowAddSong(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={16} />
            <span>Upload Song</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
            <span>Total Catalog Songs</span>
            <Music size={16} className="text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-white">{songs.length}</p>
          <span className="text-[11px] text-emerald-400 font-medium">50+ Seed Audio Assets</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
            <span>Registered Users</span>
            <Users size={16} className="text-purple-400" />
          </div>
          <p className="text-2xl font-black text-white">{users.length}</p>
          <span className="text-[11px] text-purple-400 font-medium">Active streaming base</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
            <span>Artists & Albums</span>
            <Disc3 size={16} className="text-pink-400" />
          </div>
          <p className="text-2xl font-black text-white">{artists.length + albums.length}</p>
          <span className="text-[11px] text-pink-400 font-medium">{artists.length} Artists • {albums.length} Albums</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs font-medium">
            <span>Platform Revenue</span>
            <CreditCard size={16} className="text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">₹24,890</p>
          <span className="text-[11px] text-emerald-400 font-medium">+18% Monthly Recurring Growth</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#212440] pb-3 overflow-x-auto">
        {[
          { id: 'export-dataset' as const, label: 'User Analytics & Export', icon: FileSpreadsheet, badge: 'ML Dataset' },
          { id: 'analytics' as const, label: 'Overview', icon: BarChart3 },
          { id: 'songs' as const, label: 'Audio Tracks', icon: Music },
          { id: 'artists' as const, label: 'Artists', icon: Disc3 },
          { id: 'albums' as const, label: 'Albums', icon: Layers },
          { id: 'users' as const, label: 'User Accounts', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-[#16182c] text-gray-300 hover:bg-[#20233f]'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  activeTab === tab.id ? 'bg-black text-emerald-400' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB: USER ANALYTICS & EXPORT DATASET */}
      {activeTab === 'export-dataset' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Generator Controls Toolbar */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#121529] via-[#0f1122] to-[#0a0c18] border border-[#262c54] shadow-2xl space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
                  <Sparkles size={14} />
                  <span>Synthetic User Simulation Engine</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  User Behaviour & Churn Analytics Generator
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
                  Simulate 50–100 completely fictional users with correlated engagement, music consumption, payment health, support tickets, and realistic churn probabilities for machine learning and BI dashboards.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center bg-[#171930] p-1 rounded-xl border border-[#2b2f54]">
                  {[50, 75, 100].map((count) => (
                    <button
                      key={count}
                      onClick={() => {
                        setDatasetCount(count);
                        fetchDataset(count);
                      }}
                      disabled={datasetLoading}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        datasetCount === count
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-md'
                          : 'text-gray-300 hover:text-white hover:bg-[#202446]'
                      }`}
                    >
                      Generate {count} Users
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => fetchDataset(datasetCount)}
                  disabled={datasetLoading}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1d2140] hover:bg-[#282d56] text-gray-200 text-xs font-semibold border border-[#303766] transition-all disabled:opacity-50"
                  title="Regenerate dataset with new seed patterns"
                >
                  <RefreshCw size={14} className={datasetLoading ? 'animate-spin text-cyan-400' : ''} />
                  <span>Regenerate Dataset</span>
                </button>

                <button
                  onClick={handleDownloadCSV}
                  disabled={datasetLoading || !datasetData}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-black text-xs font-extrabold shadow-lg shadow-cyan-400/25 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Download size={16} />
                  <span>Download CSV</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-gray-400 pt-3 border-t border-[#1e2342]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Default: <strong>100 users</strong> • Fictional names, emails & IDs (C1001–C1100)</span>
              </div>
              <span className="font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                Filename: soundwave_users_analytics.csv
              </span>
            </div>
          </div>

          {/* ANALYTICS PREVIEW: 10 KPI METRICS DASHBOARD */}
          {datasetData && datasetData.summary && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity size={18} className="text-cyan-400" />
                  <span>Analytics Preview Dashboard ({datasetData.count} Users)</span>
                </h3>
                <span className="text-xs text-gray-400 font-mono">
                  Computed from correlated behavioral models
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                {/* 1. Total Users */}
                <div className="p-4 rounded-2xl bg-[#131526] border border-[#232746] shadow space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>Total Users</span>
                    <Users size={15} className="text-cyan-400" />
                  </div>
                  <p className="text-2xl font-black text-white">{datasetData.summary.totalUsers}</p>
                  <p className="text-[10px] text-gray-400">Dataset row count</p>
                </div>

                {/* 2. Active Users */}
                <div className="p-4 rounded-2xl bg-[#131526] border border-[#232746] shadow space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>Active Users</span>
                    <CheckCircle2 size={15} className="text-emerald-400" />
                  </div>
                  <p className="text-2xl font-black text-emerald-400">{datasetData.summary.activeUsers}</p>
                  <p className="text-[10px] text-emerald-400/80 font-medium">
                    {Math.round((datasetData.summary.activeUsers / datasetData.summary.totalUsers) * 100)}% Retained (churn = 0)
                  </p>
                </div>

                {/* 3. Churned Users */}
                <div className="p-4 rounded-2xl bg-[#131526] border border-[#232746] shadow space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>Churned Users</span>
                    <XCircle size={15} className="text-rose-400" />
                  </div>
                  <p className="text-2xl font-black text-rose-400">{datasetData.summary.churnedUsers}</p>
                  <p className="text-[10px] text-rose-400/80 font-medium">
                    {Math.round((datasetData.summary.churnedUsers / datasetData.summary.totalUsers) * 100)}% Churned (churn = 1)
                  </p>
                </div>

                {/* 4. Premium Users */}
                <div className="p-4 rounded-2xl bg-[#131526] border border-[#232746] shadow space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>Premium Users</span>
                    <CreditCard size={15} className="text-purple-400" />
                  </div>
                  <p className="text-2xl font-black text-purple-400">{datasetData.summary.premiumUsers}</p>
                  <p className="text-[10px] text-purple-400/80 font-medium">
                    Premium, Family, Student
                  </p>
                </div>

                {/* 5. Average Engagement */}
                <div className="p-4 rounded-2xl bg-[#131526] border border-[#232746] shadow space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>Avg Engagement</span>
                    <Flame size={15} className="text-amber-400" />
                  </div>
                  <p className="text-2xl font-black text-amber-400">{datasetData.summary.avgEngagement}</p>
                  <p className="text-[10px] text-gray-400">Score out of 100</p>
                </div>

                {/* 6. Average Satisfaction */}
                <div className="p-4 rounded-2xl bg-[#131526] border border-[#232746] shadow space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>Avg Satisfaction</span>
                    <Star size={15} className="text-yellow-400" />
                  </div>
                  <p className="text-2xl font-black text-yellow-400">{datasetData.summary.avgSatisfaction} / 5.0</p>
                  <p className="text-[10px] text-gray-400">CSAT benchmark</p>
                </div>

                {/* 7. Average Monthly Listening Hours */}
                <div className="p-4 rounded-2xl bg-[#131526] border border-[#232746] shadow space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>Avg Listening Hours</span>
                    <Clock size={15} className="text-cyan-400" />
                  </div>
                  <p className="text-2xl font-black text-white">{datasetData.summary.avgMonthlyListeningHours} <span className="text-xs font-normal text-gray-400">hrs</span></p>
                  <p className="text-[10px] text-cyan-400 font-medium">Monthly usage</p>
                </div>

                {/* 8. Average Monthly Bill */}
                <div className="p-4 rounded-2xl bg-[#131526] border border-[#232746] shadow space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>Avg Monthly Bill</span>
                    <CreditCard size={15} className="text-emerald-400" />
                  </div>
                  <p className="text-2xl font-black text-emerald-400">₹{datasetData.summary.avgMonthlyBill}</p>
                  <p className="text-[10px] text-gray-400">Blended ARPU</p>
                </div>

                {/* 9. Average Login Frequency */}
                <div className="p-4 rounded-2xl bg-[#131526] border border-[#232746] shadow space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>Avg Login Frequency</span>
                    <LogIn size={15} className="text-indigo-400" />
                  </div>
                  <p className="text-2xl font-black text-white">{datasetData.summary.avgLoginFrequency} <span className="text-xs font-normal text-gray-400">days</span></p>
                  <p className="text-[10px] text-gray-400">Days logged in / month</p>
                </div>

                {/* 10. High Churn Risk Users */}
                <div className="p-4 rounded-2xl bg-[#131526] border border-[#232746] shadow space-y-1">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>High Churn Risk</span>
                    <AlertTriangle size={15} className="text-rose-400" />
                  </div>
                  <p className="text-2xl font-black text-rose-400">{datasetData.summary.highChurnRiskUsers}</p>
                  <p className="text-[10px] text-rose-400/80 font-medium">
                    Priority intervention queue
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DISTRIBUTION CHARTS & VISUALIZATIONS */}
          {datasetData && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-purple-400" />
                <span>Behavioural & Demographic Distributions</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Plan Distribution */}
                <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] space-y-4">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Plan Distribution</span>
                    <span className="text-cyan-400 text-[11px] lowercase">4 subscription tiers</span>
                  </h4>
                  <div className="space-y-2.5">
                    {Object.entries(datasetData.distributions.plans || {}).map(([plan, count]) => {
                      const pct = Math.round((count / datasetData.count) * 100);
                      const color =
                        plan === 'Premium'
                          ? 'bg-purple-400'
                          : plan === 'Free'
                          ? 'bg-gray-400'
                          : plan === 'Family'
                          ? 'bg-cyan-400'
                          : 'bg-emerald-400';
                      return (
                        <div key={plan} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-gray-200">{plan}</span>
                            <span className="text-gray-400 font-mono">{count} users ({pct}%)</span>
                          </div>
                          <div className="w-full h-2 bg-[#1b1e36] rounded-full overflow-hidden">
                            <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Churn Distribution */}
                <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] space-y-4">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Churn Distribution</span>
                    <span className="text-rose-400 text-[11px] lowercase">target label (churn: 0 vs 1)</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                        <CheckCircle2 size={13} /> Active: {datasetData.distributions.churn.Active}
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold text-rose-400">
                        <XCircle size={13} /> Churned: {datasetData.distributions.churn.Churned}
                      </span>
                    </div>

                    <div className="w-full h-4 bg-[#1b1e36] rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-emerald-500 transition-all"
                        style={{ width: `${(datasetData.distributions.churn.Active / datasetData.count) * 100}%` }}
                        title={`Active: ${datasetData.distributions.churn.Active}`}
                      />
                      <div
                        className="h-full bg-rose-500 transition-all"
                        style={{ width: `${(datasetData.distributions.churn.Churned / datasetData.count) * 100}%` }}
                        title={`Churned: ${datasetData.distributions.churn.Churned}`}
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-[#191c36] text-[11px] text-gray-400 leading-relaxed border border-[#262c52]">
                      Realistic churn distribution incorporates stochastic noise for realistic training/testing datasets in ML classification models.
                    </div>
                  </div>
                </div>

                {/* 3. Churn Risk Breakdown */}
                <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] space-y-4">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Churn Risk Breakdown</span>
                    <span className="text-amber-400 text-[11px] lowercase">predictive categorization</span>
                  </h4>
                  <div className="space-y-2.5">
                    {['Low', 'Medium', 'High'].map((risk) => {
                      const count = datasetData.distributions.churnRisk[risk] || 0;
                      const pct = Math.round((count / datasetData.count) * 100);
                      const color =
                        risk === 'Low'
                          ? 'bg-emerald-400 text-emerald-400'
                          : risk === 'Medium'
                          ? 'bg-amber-400 text-amber-400'
                          : 'bg-rose-400 text-rose-400';
                      return (
                        <div key={risk} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className={`font-semibold ${color.split(' ')[1]}`}>{risk} Risk</span>
                            <span className="text-gray-400 font-mono">{count} users ({pct}%)</span>
                          </div>
                          <div className="w-full h-2 bg-[#1b1e36] rounded-full overflow-hidden">
                            <div className={`h-full ${color.split(' ')[0]} rounded-full`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. User Segments (10 segments) */}
                <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] space-y-3 lg:col-span-2">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
                    <span>User Segments & Behavioral Archetypes</span>
                    <span className="text-cyan-400 text-[11px] lowercase">10 cluster groups</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {Object.entries(datasetData.distributions.segments || {}).map(([segment, count]) => {
                      const pct = Math.round((count / datasetData.count) * 100);
                      return (
                        <div key={segment} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-300 font-medium truncate max-w-[180px]">{segment}</span>
                            <span className="text-gray-400 font-mono text-[11px]">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#1b1e36] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" style={{ width: `${Math.max(5, pct * 4)}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Satisfaction & Ratings Breakdown */}
                <div className="p-5 rounded-2xl bg-[#131526] border border-[#232746] space-y-4">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Satisfaction Breakdown</span>
                    <span className="text-yellow-400 text-[11px]">CSAT 1.0 - 5.0</span>
                  </h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = datasetData.users.filter((u) => Math.round(u.satisfaction_score) === rating).length;
                      const pct = Math.round((count / datasetData.count) * 100);
                      return (
                        <div key={rating} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="flex items-center gap-1 text-gray-300 font-medium">
                              <span>{rating}</span>
                              <Star size={11} className="text-yellow-400 fill-yellow-400" />
                            </span>
                            <span className="text-gray-400 font-mono text-[11px]">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#1b1e36] rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* INTERACTIVE DATASET TABLE PREVIEW */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileSpreadsheet size={18} className="text-emerald-400" />
                  <span>Simulated User Records ({filteredUsers.length} shown)</span>
                </h3>
                <p className="text-xs text-gray-400">Search and explore individual user attributes, metrics, and risk classifications</p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative min-w-[200px]">
                  <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by ID, name, genre..."
                    value={datasetSearch}
                    onChange={(e) => setDatasetSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#14162b] border border-[#272b50] text-xs text-white placeholder-gray-500 outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Segment Filter */}
                <select
                  value={datasetSegmentFilter}
                  onChange={(e) => setDatasetSegmentFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#14162b] border border-[#272b50] text-xs text-gray-200 outline-none focus:border-cyan-400"
                >
                  <option value="All">All Segments</option>
                  <option value="Power User">Power User</option>
                  <option value="Regular User">Regular User</option>
                  <option value="Casual User">Casual User</option>
                  <option value="New User">New User</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Churned User">Churned User</option>
                  <option value="Podcast Listener">Podcast Listener</option>
                  <option value="Audiobook Listener">Audiobook Listener</option>
                  <option value="Free User">Free User</option>
                  <option value="Premium Loyal User">Premium Loyal User</option>
                </select>

                {/* Churn Filter */}
                <select
                  value={datasetChurnFilter}
                  onChange={(e) => setDatasetChurnFilter(e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl bg-[#14162b] border border-[#272b50] text-xs text-gray-200 outline-none focus:border-cyan-400"
                >
                  <option value="All">All Churn Status</option>
                  <option value="0">Active (0)</option>
                  <option value="1">Churned (1)</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-[#131526] border border-[#232746] overflow-hidden shadow-xl">
              <div className="overflow-x-auto max-h-[550px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="sticky top-0 z-10 bg-[#171932] text-gray-400 border-b border-[#232746]">
                    <tr>
                      <th className="p-3">Customer ID</th>
                      <th className="p-3">User & City</th>
                      <th className="p-3">Plan</th>
                      <th className="p-3">Segment</th>
                      <th className="p-3">Engagement</th>
                      <th className="p-3">Satisfaction</th>
                      <th className="p-3">Usage / Month</th>
                      <th className="p-3">Trend %</th>
                      <th className="p-3">Complaints</th>
                      <th className="p-3">Churn Risk</th>
                      <th className="p-3">Churn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f2238]">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={11} className="p-8 text-center text-gray-400">
                          No users match the current search or filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u.customer_id} className="hover:bg-[#191b33] transition-colors">
                          <td className="p-3 font-mono font-bold text-cyan-300">
                            {u.customer_id}
                          </td>
                          <td className="p-3">
                            <div>
                              <p className="font-semibold text-white">{u.name}</p>
                              <p className="text-[10px] text-gray-400">{u.city}, {u.country} • {u.age}y</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              u.plan === 'Premium'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : u.plan === 'Family'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : u.plan === 'Student'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-gray-700/30 text-gray-400 border border-gray-600/30'
                            }`}>
                              {u.plan}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="text-gray-300 text-[11px] font-medium">
                              {u.user_segment}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1.5 font-mono">
                              <span className={`font-bold ${
                                u.engagement_score >= 70
                                  ? 'text-emerald-400'
                                  : u.engagement_score >= 40
                                  ? 'text-amber-400'
                                  : 'text-rose-400'
                              }`}>
                                {u.engagement_score}
                              </span>
                              <span className="text-[10px] text-gray-500">/100</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1 text-yellow-400 font-mono text-[11px]">
                              <span>{u.satisfaction_score}</span>
                              <Star size={11} className="fill-yellow-400" />
                            </div>
                          </td>
                          <td className="p-3 font-mono text-gray-300">
                            <div>
                              <span>{u.monthly_usage_hours} hrs</span>
                              <p className="text-[10px] text-gray-400 font-sans">{u.songs_played_monthly} songs</p>
                            </div>
                          </td>
                          <td className="p-3 font-mono">
                            <span className={`font-bold text-[11px] ${
                              u.usage_change_pct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                            }`}>
                              {u.usage_change_pct >= 0 ? `+${u.usage_change_pct}%` : `${u.usage_change_pct}%`}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-gray-400">
                            {u.complaint_count > 0 ? (
                              <span className="text-rose-400 font-bold">{u.complaint_count} ({u.open_complaints} open)</span>
                            ) : (
                              <span className="text-gray-500">0</span>
                            )}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              u.churn_risk === 'Low'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : u.churn_risk === 'Medium'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-rose-500/20 text-rose-400 font-black'
                            }`}>
                              {u.churn_risk}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              u.churn === 1
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {u.churn === 1 ? '1 (Churned)' : '0 (Active)'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Download Reminder Bar */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#141b2b] via-[#111e22] to-[#121626] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Download size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Export Complete Analytical Record</h4>
                  <p className="text-xs text-gray-400">Standard RFC-compliant CSV containing all 86 user, engagement, usage, payment, and churn columns.</p>
                </div>
              </div>

              <button
                onClick={handleDownloadCSV}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                Download CSV ({datasetData ? datasetData.users.length : 100} Rows)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Analytics View */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#131526] border border-[#232746] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              <span>Real-Time Stream Distribution by Genre</span>
            </h3>

            <div className="space-y-3">
              {[
                { genre: 'Synthwave & Cyberpunk', streams: 14200, percent: 38, color: 'bg-cyan-400' },
                { genre: 'Lo-Fi Study Beats', streams: 11400, percent: 30, color: 'bg-purple-400' },
                { genre: 'Electronic & Deep House', streams: 7200, percent: 19, color: 'bg-emerald-400' },
                { genre: 'Chillstep & Ambient', streams: 4900, percent: 13, color: 'bg-amber-400' },
              ].map((item) => (
                <div key={item.genre} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-gray-200">{item.genre}</span>
                    <span className="text-gray-400 font-mono">{item.streams.toLocaleString()} streams ({item.percent}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#1b1e36] rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Songs Management */}
      {activeTab === 'songs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">All Audio Tracks ({songs.length})</h3>
            <button
              onClick={() => setShowAddSong(true)}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-400 text-black text-xs font-bold flex items-center gap-1.5"
            >
              <Plus size={14} />
              Add Track
            </button>
          </div>

          <div className="rounded-2xl bg-[#131526] border border-[#232746] overflow-hidden">
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-[#17192f] text-gray-400 border-b border-[#232746]">
                  <tr>
                    <th className="p-3">Track</th>
                    <th className="p-3">Artist</th>
                    <th className="p-3">Album</th>
                    <th className="p-3">Genre</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2238]">
                  {songs.map((song) => (
                    <tr key={song.id} className="hover:bg-[#191b33] transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <img src={song.coverUrl} alt={song.title} className="w-8 h-8 rounded-lg object-cover" />
                          <span className="font-semibold text-white truncate max-w-[150px] sm:max-w-xs">{song.title}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-300">{song.artist}</td>
                      <td className="p-3 text-gray-400">{song.album}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px]">
                          {song.genre}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-gray-400">{song.duration}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteSong(song.id, song.title)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete track"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Artists Management */}
      {activeTab === 'artists' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Artists ({artists.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artists.map((artist) => (
              <div key={artist.id} className="p-4 rounded-2xl bg-[#131526] border border-[#232746] flex flex-col items-center text-center">
                <img src={artist.imageUrl} alt={artist.name} className="w-20 h-20 rounded-full object-cover mb-2 ring-2 ring-cyan-400/40" />
                <h4 className="text-xs font-bold text-white truncate w-full">{artist.name}</h4>
                <span className="text-[10px] text-cyan-300 capitalize">{artist.genre}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Albums Management */}
      {activeTab === 'albums' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Albums ({albums.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {albums.map((album) => (
              <div key={album.id} className="p-3 rounded-2xl bg-[#131526] border border-[#232746]">
                <img src={album.coverUrl} alt={album.title} className="w-full aspect-square rounded-xl object-cover mb-2" />
                <h4 className="text-xs font-bold text-white truncate">{album.title}</h4>
                <p className="text-[11px] text-gray-400 truncate">{album.artist} • {album.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Users Management */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">User Accounts ({users.length})</h3>
          <div className="rounded-2xl bg-[#131526] border border-[#232746] overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#17192f] text-gray-400 border-b border-[#232746]">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Current Role</th>
                  <th className="p-3 text-right">Change Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2238]">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#191b33] transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                        <span className="font-semibold text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-400 font-mono">{u.email}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        u.role === 'ADMIN'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : u.role === 'PREMIUM_USER'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-gray-700/30 text-gray-300 border border-gray-600/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleRoleChange(u.id, 'USER')}
                          className="px-2 py-1 rounded bg-[#20233f] hover:bg-[#2c3058] text-[10px] text-gray-300"
                        >
                          User
                        </button>
                        <button
                          onClick={() => handleRoleChange(u.id, 'PREMIUM_USER')}
                          className="px-2 py-1 rounded bg-purple-500/20 hover:bg-purple-500/40 text-[10px] text-purple-300 font-semibold"
                        >
                          Premium
                        </button>
                        <button
                          onClick={() => handleRoleChange(u.id, 'ADMIN')}
                          className="px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/40 text-[10px] text-emerald-300 font-semibold"
                        >
                          Admin
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Song Modal */}
      {showAddSong && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-[#121424] border border-[#272b50] rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-4">Upload New Master Audio Track</h3>
            <form onSubmit={handleCreateSong} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Song Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Celestial Horizon"
                  value={newSongTitle}
                  onChange={(e) => setNewSongTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#191b30] border border-[#2b2f52] text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Artist Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Astral Projection"
                  value={newSongArtist}
                  onChange={(e) => setNewSongArtist(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#191b30] border border-[#2b2f52] text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Album</label>
                  <input
                    type="text"
                    placeholder="e.g. Neon Horizons"
                    value={newSongAlbum}
                    onChange={(e) => setNewSongAlbum(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#191b30] border border-[#2b2f52] text-white outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Genre</label>
                  <input
                    type="text"
                    placeholder="Synthwave"
                    value={newSongGenre}
                    onChange={(e) => setNewSongGenre(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#191b30] border border-[#2b2f52] text-white outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Audio Stream URL</label>
                <input
                  type="url"
                  value={newSongAudioUrl}
                  onChange={(e) => setNewSongAudioUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#191b30] border border-[#2b2f52] text-white outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Cover Artwork URL</label>
                <input
                  type="url"
                  value={newSongCoverUrl}
                  onChange={(e) => setNewSongCoverUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#191b30] border border-[#2b2f52] text-white outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddSong(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold"
                >
                  Publish Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
