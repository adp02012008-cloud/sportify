// SoundWave Playlists Catalog
// 10+ curated playlists across multiple moods, genres and activities

export const mockPlaylists = [
  {
    id: 'pl-1',
    name: 'Cyberpunk Neon Drive',
    description: 'High-octane synthwave and electronic pulses for late-night highway cruisers and neon dreamers.',
    creator: 'SoundWave Editorial',
    isEditorial: true,
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-1', 'song-2', 'song-3', 'song-29', 'song-33'],
    followers: '840,290',
    accentColor: '#06b6d4'
  },
  {
    id: 'pl-2',
    name: 'Lo-Fi Study Beats',
    description: 'Calm, gentle instrumentals and soothing tape crackle to help you focus, code, and relax.',
    creator: 'SoundWave Chill',
    isEditorial: true,
    cover: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-16', 'song-17', 'song-18', 'song-31'],
    followers: '2,150,000',
    accentColor: '#10b981'
  },
  {
    id: 'pl-3',
    name: 'Bollywood Romance & Sufi',
    description: 'Soul-stirring Hindi melodies, acoustic guitars, and heartfelt lyrics from iconic modern cinema.',
    creator: 'SoundWave India',
    isEditorial: true,
    cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-10', 'song-11', 'song-12', 'song-32'],
    followers: '4,890,300',
    accentColor: '#ec4899'
  },
  {
    id: 'pl-4',
    name: 'Tamil High-Voltage Hits',
    description: 'Explosive kuthu rhythms, EDM drops, and anthemic hooks straight from Kollywood.',
    creator: 'SoundWave Tamil',
    isEditorial: true,
    cover: 'https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-13', 'song-14', 'song-15', 'song-34'],
    followers: '3,210,000',
    accentColor: '#f59e0b'
  },
  {
    id: 'pl-5',
    name: 'Pure Pop Energy',
    description: 'The brightest, most irresistible pop anthems topping global playlists right now.',
    creator: 'SoundWave Hits',
    isEditorial: true,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-4', 'song-5', 'song-6', 'song-30'],
    followers: '1,980,000',
    accentColor: '#3b82f6'
  },
  {
    id: 'pl-6',
    name: 'Late Night Hip-Hop Cypher',
    description: 'Heavy basslines, boom-bap drums, and lyrical storytelling for the midnight hours.',
    creator: 'SoundWave Urban',
    isEditorial: true,
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-7', 'song-8', 'song-9'],
    followers: '1,420,000',
    accentColor: '#8b5cf6'
  },
  {
    id: 'pl-7',
    name: 'Midnight Jazz & Espresso',
    description: 'Smoky saxophones, upright bass, and quiet brass chords for winding down after dark.',
    creator: 'SoundWave Jazz',
    isEditorial: true,
    cover: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-22', 'song-23', 'song-24'],
    followers: '760,000',
    accentColor: '#d97706'
  },
  {
    id: 'pl-8',
    name: 'Raw Rock & Overdrive',
    description: 'Distorted guitars, driving bass, and anthemic garage rock solos that ignite the room.',
    creator: 'SoundWave Rock',
    isEditorial: true,
    cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-19', 'song-20', 'song-21'],
    followers: '1,120,000',
    accentColor: '#ef4444'
  },
  {
    id: 'pl-9',
    name: 'Deep Focus Classical',
    description: 'Timeless piano nocturnes and orchestral movements curated for undisturbed concentration.',
    creator: 'SoundWave Classical',
    isEditorial: true,
    cover: 'https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-25', 'song-26'],
    followers: '690,000',
    accentColor: '#6366f1'
  },
  {
    id: 'pl-10',
    name: 'Indie Sunset Roadtrip',
    description: 'Warm acoustic strums, indie folk harmonies, and fresh air for open highway drives.',
    creator: 'SoundWave Indie',
    isEditorial: true,
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80',
    songIds: ['song-27', 'song-28'],
    followers: '850,000',
    accentColor: '#14b8a6'
  }
];

export const mockGenres = [
  { id: 'pop', name: 'Pop', color: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', icon: 'Sparkles' },
  { id: 'electronic', name: 'Electronic', color: 'linear-gradient(135deg, #06b6d4 0%, #0369a1 100%)', icon: 'Radio' },
  { id: 'hip-hop', name: 'Hip-Hop', color: 'linear-gradient(135deg, #8b5cf6 0%, #5b21b6 100%)', icon: 'Flame' },
  { id: 'bollywood', name: 'Bollywood', color: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)', icon: 'Heart' },
  { id: 'tamil', name: 'Tamil', color: 'linear-gradient(135deg, #f43f5e 0%, #9f1239 100%)', icon: 'Zap' },
  { id: 'lo-fi', name: 'Lo-fi', color: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', icon: 'Coffee' },
  { id: 'rock', name: 'Rock', color: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)', icon: 'Guitar' },
  { id: 'jazz', name: 'Jazz', color: 'linear-gradient(135deg, #d97706 0%, #78350f 100%)', icon: 'Music' },
  { id: 'classical', name: 'Classical', color: 'linear-gradient(135deg, #6366f1 0%, #3730a3 100%)', icon: 'Disc' },
  { id: 'indie', name: 'Indie', color: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)', icon: 'Compass' }
];
