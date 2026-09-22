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
