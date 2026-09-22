export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  album: string;
  albumId?: string;
  genre: string;
  duration: number | string;
  durationStr?: string;
  artwork?: string;
  coverUrl?: string;
  audioUrl: string;
  plays?: string;
  playCount?: number;
  releaseYear?: number;
  mood?: string;
  isExplicit?: boolean;
  canvasUrl?: string;
  lyrics?: string | Array<{ timestamp: number; text: string }>;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  monthlyListeners?: string | number;
  followers?: string;
  verified?: boolean;
  bio?: string;
  avatar?: string;
  imageUrl?: string;
  banner?: string;
  topSongIds?: string[];
  albumIds?: string[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  year?: number;
  releaseYear?: number;
  genre?: string;
  artwork?: string;
  coverUrl?: string;
  songIds?: string[];
  songs?: Song[];
  durationStr?: string;
  likesCount?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  creator?: string;
  ownerName?: string;
  ownerId?: string;
  isUserCreated?: boolean;
  cover?: string;
  coverUrl?: string;
  songIds?: string[];
  songs?: Song[];
  isPublic?: boolean;
  isCollaborative?: boolean;
  collaborators?: string[];
  followers?: string;
  accentColor?: string;
  compatibility?: number;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: number | string;
  durationStr?: string;
  releaseDate?: string;
  episodeNumber?: number;
  audioUrl: string;
}

export interface Podcast {
  id: string;
  title: string;
  host?: string;
  author?: string;
  description: string;
  coverImage?: string;
  coverUrl?: string;
  category: string;
  rating?: number | string;
  followers?: string;
  episodes?: PodcastEpisode[];
}

export interface AudiobookChapter {
  id?: string;
  number: number;
  title: string;
  duration: string;
  audioUrl: string;
}

export interface Audiobook {
  id: string;
  title: string;
  author: string;
  narrator: string;
  description: string;
  coverImage?: string;
  coverUrl?: string;
  duration: string;
  genre?: string;
  category?: string;
  rating?: number | string;
  chapters?: AudiobookChapter[];
}

export interface User {
  id: string;
  _id?: string;
  name: string;
  username?: string;
  email: string;
  role: 'USER' | 'PREMIUM_USER' | 'ADMIN';
  avatar: string;
  bio?: string;
  isPremium?: boolean;
  likedSongs?: string[];
  savedAlbums?: string[];
  followedArtists?: string[];
  followingUsers?: string[];
  plan?: string;
  subscriptionStatus?: string;
}

export interface FriendActivity {
  id: string;
  userId?: string;
  userName: string;
  avatar?: string;
  userAvatar?: string;
  isLive?: boolean;
  timestamp: string;
  song: {
    id: string;
    title: string;
    artist: string;
    coverUrl?: string;
    artwork?: string;
    duration?: string;
    audioUrl?: string;
  };
  itemTitle?: string;
  itemSubtitle?: string;
  itemArtwork?: string;
}

export interface PaymentReceipt {
  id: string;
  orderId: string;
  paymentId: string;
  planName: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface PaymentHistoryItem extends PaymentReceipt {}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalPlaylists: number;
  totalPodcasts: number;
  totalAudiobooks: number;
  totalPlays: string;
  totalRevenue: string;
}

export interface DummyAnalyticsUser {
  customer_id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Non-Binary';
  city: string;
  country: string;
  signup_date: string;
  account_age_months: number;
  plan: 'Free' | 'Premium' | 'Family' | 'Student';
  subscription_status: 'Active' | 'Cancelled' | 'Expired' | 'Trial';
  subscription_start_date: string;
  subscription_end_date: string;
  monthly_bill: number;
  payment_method: string;
  auto_renew: 'Yes' | 'No';
  login_frequency: number;
  monthly_active_days: number;
  sessions_per_month: number;
  avg_session_minutes: number;
  monthly_usage_hours: number;
  total_listening_hours: number;
  songs_played_monthly: number;
  songs_completed_monthly: number;
  songs_skipped_monthly: number;
  favorite_genre: string;
  favorite_artist: string;
  playlists_created: number;
  playlists_followed: number;
  liked_songs_count: number;
  albums_saved: number;
  artists_followed: number;
  searches_per_month: number;
  artists_viewed: number;
  albums_viewed: number;
  playlist_views: number;
  recommendation_clicks: number;
  discovery_sessions: number;
  songs_added_to_playlists: number;
  collaborative_playlists: number;
  public_playlists: number;
  playlist_shares: number;
  users_followed: number;
  followers_count: number;
  songs_shared: number;
  playlists_shared: number;
  social_interactions: number;
  podcast_episodes_played: number;
  podcast_listening_hours: number;
  podcasts_followed: number;
  audiobooks_started: number;
  audiobook_listening_hours: number;
  engagement_score: number;
  satisfaction_score: number;
  activity_score: number;
  loyalty_score: number;
  usage_change_pct: number;
  listening_change_pct: number;
  login_change_pct: number;
  complaint_count: number;
  open_complaints: number;
  avg_resolution_days: number;
  last_complaint_days_ago: number;
  support_tickets: number;
  payment_delay_days: number;
  payment_failures: number;
  late_payments: number;
  refund_requests: number;
  payment_issue_count: number;
  plan_changes: number;
  upgrades: number;
  downgrades: number;
  last_plan_change_days_ago: number;
  app_rating: number;
  favorite_feature: string;
  most_used_device: string;
  primary_device: string;
  device_count: number;
  mobile_usage_pct: number;
  desktop_usage_pct: number;
  tablet_usage_pct: number;
  last_login_days_ago: number;
  login_failures: number;
  account_warnings: number;
  user_segment: string;
  churn_risk: 'Low' | 'Medium' | 'High';
  churn: 0 | 1;
}

export interface AnalyticsDatasetResponse {
  success: boolean;
  count: number;
  summary: {
    totalUsers: number;
    activeUsers: number;
    churnedUsers: number;
    premiumUsers: number;
    avgEngagement: number;
    avgSatisfaction: number;
    avgMonthlyListeningHours: number;
    avgMonthlyBill: number;
    avgLoginFrequency: number;
    highChurnRiskUsers: number;
  };
  distributions: {
    plans: Record<string, number>;
    churn: Record<string, number>;
    churnRisk: Record<string, number>;
    segments: Record<string, number>;
  };
  users: DummyAnalyticsUser[];
}
