// SoundWave Pre-bundled Audio & Content Catalogue for Zero-Latency Standalone / Vercel Operation
import { Song, Artist, Album, Playlist, Podcast, Audiobook, User } from '../types';

export const defaultSongs: Song[] = [
  {
    "id": "song-1",
    "title": "Neon Horizon",
    "artist": "CyberPulse",
    "artistId": "art-1",
    "album": "Synthetic Dreams",
    "albumId": "alb-1",
    "genre": "Electronic",
    "duration": 215,
    "durationStr": "3:35",
    "artwork": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "plays": "1,420,890",
    "playCount": 1420890,
    "releaseYear": 2024,
    "mood": "Energetic",
    "lyrics": [
      {
        "timestamp": 0,
        "text": "[Instrumental Synth Intro]"
      },
      {
        "timestamp": 14,
        "text": "Driving down the cyber road tonight"
      },
      {
        "timestamp": 28,
        "text": "Neon lights reflecting in the rain"
      },
      {
        "timestamp": 42,
        "text": "Pushing speed into the endless grid"
      },
      {
        "timestamp": 58,
        "text": "Catch the neon horizon before it fades"
      }
    ]
  },
  {
    "id": "song-2",
    "title": "Digital Mirage",
    "artist": "CyberPulse",
    "artistId": "art-1",
    "album": "Synthetic Dreams",
    "albumId": "alb-1",
    "genre": "Electronic",
    "duration": 198,
    "durationStr": "3:18",
    "artwork": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "plays": "890,120",
    "playCount": 890120,
    "releaseYear": 2024,
    "mood": "Hypnotic"
  },
  {
    "id": "song-3",
    "title": "Cybernetic Echoes",
    "artist": "Kroma Synth",
    "artistId": "art-2",
    "album": "Vapor Waveform",
    "albumId": "alb-2",
    "genre": "Electronic",
    "duration": 242,
    "durationStr": "4:02",
    "artwork": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "plays": "2,150,430",
    "playCount": 2150430,
    "releaseYear": 2023,
    "mood": "Futuristic"
  },
  {
    "id": "song-4",
    "title": "Starlight Avenue",
    "artist": "Aria Vance",
    "artistId": "art-3",
    "album": "Golden Hour Glow",
    "albumId": "alb-3",
    "genre": "Pop",
    "duration": 184,
    "durationStr": "3:04",
    "artwork": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "plays": "5,820,100",
    "playCount": 5820100,
    "releaseYear": 2024,
    "mood": "Uplifting",
    "lyrics": [
      {
        "timestamp": 0,
        "text": "[Upbeat Guitar Chords]"
      },
      {
        "timestamp": 12,
        "text": "Met you right beneath the golden glow"
      },
      {
        "timestamp": 25,
        "text": "Dancing slow along the avenue"
      },
      {
        "timestamp": 40,
        "text": "Never felt the world so bright and true"
      }
    ]
  },
  {
    "id": "song-5",
    "title": "Dancing in the Rain",
    "artist": "Aria Vance",
    "artistId": "art-3",
    "album": "Golden Hour Glow",
    "albumId": "alb-3",
    "genre": "Pop",
    "duration": 205,
    "durationStr": "3:25",
    "artwork": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "plays": "3,450,210",
    "playCount": 3450210,
    "releaseYear": 2024,
    "mood": "Joyful"
  },
  {
    "id": "song-6",
    "title": "Electric Heartbeat",
    "artist": "Luna Sterling",
    "artistId": "art-4",
    "album": "Prism of Sound",
    "albumId": "alb-4",
    "genre": "Pop",
    "duration": 192,
    "durationStr": "3:12",
    "artwork": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "plays": "4,102,900",
    "playCount": 4102900,
    "releaseYear": 2023,
    "mood": "Romantic"
  },
  {
    "id": "song-7",
    "title": "Midnight Hustle",
    "artist": "King Cipher",
    "artistId": "art-5",
    "album": "Crown & Concrete",
    "albumId": "alb-5",
    "genre": "Hip-Hop",
    "duration": 210,
    "durationStr": "3:30",
    "artwork": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    "plays": "6,230,000",
    "playCount": 6230000,
    "releaseYear": 2023,
    "mood": "Intense",
    "isExplicit": true
  },
  {
    "id": "song-8",
    "title": "Empire State of Mindset",
    "artist": "King Cipher",
    "artistId": "art-5",
    "album": "Crown & Concrete",
    "albumId": "alb-5",
    "genre": "Hip-Hop",
    "duration": 188,
    "durationStr": "3:08",
    "artwork": "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    "plays": "3,890,400",
    "playCount": 3890400,
    "releaseYear": 2023,
    "mood": "Confident"
  },
  {
    "id": "song-9",
    "title": "Subway Rhymes",
    "artist": "Echo Flow",
    "artistId": "art-6",
    "album": "Underground Frequency",
    "albumId": "alb-6",
    "genre": "Hip-Hop",
    "duration": 224,
    "durationStr": "3:44",
    "artwork": "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    "plays": "1,920,500",
    "playCount": 1920500,
    "releaseYear": 2024,
    "mood": "Gritty"
  },
  {
    "id": "song-10",
    "title": "Tum Hi Meri Dharkan",
    "artist": "Arijit Verma",
    "artistId": "art-7",
    "album": "Surili Shaam",
    "albumId": "alb-7",
    "genre": "Bollywood",
    "duration": 268,
    "durationStr": "4:28",
    "artwork": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    "plays": "12,450,000",
    "playCount": 12450000,
    "releaseYear": 2024,
    "mood": "Soulful"
  },
  {
    "id": "song-11",
    "title": "Bheegi Si Raatein",
    "artist": "Arijit Verma",
    "artistId": "art-7",
    "album": "Surili Shaam",
    "albumId": "alb-7",
    "genre": "Bollywood",
    "duration": 245,
    "durationStr": "4:05",
    "artwork": "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    "plays": "8,750,900",
    "playCount": 8750900,
    "releaseYear": 2024,
    "mood": "Romantic"
  },
  {
    "id": "song-12",
    "title": "Dhol Baje Re",
    "artist": "Shreya Kapoor",
    "artistId": "art-8",
    "album": "Rangrez",
    "albumId": "alb-8",
    "genre": "Bollywood",
    "duration": 215,
    "durationStr": "3:35",
    "artwork": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    "plays": "9,120,400",
    "playCount": 9120400,
    "releaseYear": 2023,
    "mood": "Festive"
  },
  {
    "id": "song-13",
    "title": "Kavithai Paada",
    "artist": "Anirudh Sriram",
    "artistId": "art-9",
    "album": "Chennai Beats",
    "albumId": "alb-9",
    "genre": "Tamil",
    "duration": 230,
    "durationStr": "3:50",
    "artwork": "https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    "plays": "11,800,000",
    "playCount": 11800000,
    "releaseYear": 2024,
    "mood": "Energetic"
  },
  {
    "id": "song-14",
    "title": "Mazhai Kaalam",
    "artist": "Anirudh Sriram",
    "artistId": "art-9",
    "album": "Chennai Beats",
    "albumId": "alb-9",
    "genre": "Tamil",
    "duration": 252,
    "durationStr": "4:12",
    "artwork": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    "plays": "7,320,100",
    "playCount": 7320100,
    "releaseYear": 2024,
    "mood": "Melodic"
  },
  {
    "id": "song-15",
    "title": "Nenjukkul Nizhalgal",
    "artist": "Harini Sundar",
    "artistId": "art-10",
    "album": "Thendral Raagam",
    "albumId": "alb-10",
    "genre": "Tamil",
    "duration": 240,
    "durationStr": "4:00",
    "artwork": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    "plays": "5,640,000",
    "playCount": 5640000,
    "releaseYear": 2023,
    "mood": "Poetic"
  },
  {
    "id": "song-16",
    "title": "Rainy Cafe Study",
    "artist": "Coffee Bean Chords",
    "artistId": "art-11",
    "album": "Warm Mug Sessions",
    "albumId": "alb-11",
    "genre": "Lo-fi",
    "duration": 154,
    "durationStr": "2:34",
    "artwork": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    "plays": "15,200,300",
    "playCount": 15200300,
    "releaseYear": 2024,
    "mood": "Chill"
  },
  {
    "id": "song-17",
    "title": "Midnight Notebook",
    "artist": "Coffee Bean Chords",
    "artistId": "art-11",
    "album": "Warm Mug Sessions",
    "albumId": "alb-11",
    "genre": "Lo-fi",
    "duration": 168,
    "durationStr": "2:48",
    "artwork": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "plays": "9,410,000",
    "playCount": 9410000,
    "releaseYear": 2024,
    "mood": "Peaceful"
  },
  {
    "id": "song-18",
    "title": "Sunset Rooftop",
    "artist": "Lofi Sloth",
    "artistId": "art-12",
    "album": "Pastel Skies",
    "albumId": "alb-12",
    "genre": "Lo-fi",
    "duration": 142,
    "durationStr": "2:22",
    "artwork": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "plays": "8,190,000",
    "playCount": 8190000,
    "releaseYear": 2023,
    "mood": "Relaxing"
  },
  {
    "id": "song-19",
    "title": "Thunderstrike Canyon",
    "artist": "The Iron Reverbs",
    "artistId": "art-13",
    "album": "Fossil & Flame",
    "albumId": "alb-13",
    "genre": "Rock",
    "duration": 260,
    "durationStr": "4:20",
    "artwork": "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "plays": "4,150,000",
    "playCount": 4150000,
    "releaseYear": 2023,
    "mood": "Rebellious"
  },
  {
    "id": "song-20",
    "title": "Rebel Road",
    "artist": "The Iron Reverbs",
    "artistId": "art-13",
    "album": "Fossil & Flame",
    "albumId": "alb-13",
    "genre": "Rock",
    "duration": 232,
    "durationStr": "3:52",
    "artwork": "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "plays": "2,980,000",
    "playCount": 2980000,
    "releaseYear": 2023,
    "mood": "High-Energy"
  },
  {
    "id": "song-21",
    "title": "Electric Distortion",
    "artist": "Silver Distortion",
    "artistId": "art-14",
    "album": "Overdrive Protocol",
    "albumId": "alb-14",
    "genre": "Rock",
    "duration": 218,
    "durationStr": "3:38",
    "artwork": "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "plays": "1,840,000",
    "playCount": 1840000,
    "releaseYear": 2024,
    "mood": "Raw"
  },
  {
    "id": "song-22",
    "title": "Blue Velvet Dusk",
    "artist": "Miles Henderson Quartet",
    "artistId": "art-15",
    "album": "Smoke & Bourbon",
    "albumId": "alb-15",
    "genre": "Jazz",
    "duration": 310,
    "durationStr": "5:10",
    "artwork": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "plays": "1,430,900",
    "playCount": 1430900,
    "releaseYear": 2023,
    "mood": "Sophisticated"
  },
  {
    "id": "song-23",
    "title": "Saxophone in Soho",
    "artist": "Miles Henderson Quartet",
    "artistId": "art-15",
    "album": "Smoke & Bourbon",
    "albumId": "alb-15",
    "genre": "Jazz",
    "duration": 285,
    "durationStr": "4:45",
    "artwork": "https://images.unsplash.com/photo-1525994886773-080587e161c2?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    "plays": "980,000",
    "playCount": 980000,
    "releaseYear": 2023,
    "mood": "Smooth"
  },
  {
    "id": "song-24",
    "title": "Autumn in Greenwich",
    "artist": "Ella Laurent",
    "artistId": "art-16",
    "album": "Coffee & Clarinet",
    "albumId": "alb-16",
    "genre": "Jazz",
    "duration": 244,
    "durationStr": "4:04",
    "artwork": "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    "plays": "2,200,000",
    "playCount": 2200000,
    "releaseYear": 2024,
    "mood": "Cozy"
  },
  {
    "id": "song-25",
    "title": "Nocturne in C-Sharp Minor",
    "artist": "Vienna Chamber Collective",
    "artistId": "art-17",
    "album": "Midnight Piano Solos",
    "albumId": "alb-17",
    "genre": "Classical",
    "duration": 275,
    "durationStr": "4:35",
    "artwork": "https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    "plays": "3,800,000",
    "playCount": 3800000,
    "releaseYear": 2022,
    "mood": "Reflective"
  },
  {
    "id": "song-26",
    "title": "Symphony of the Pines",
    "artist": "Vienna Chamber Collective",
    "artistId": "art-17",
    "album": "Midnight Piano Solos",
    "albumId": "alb-17",
    "genre": "Classical",
    "duration": 340,
    "durationStr": "5:40",
    "artwork": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    "plays": "1,720,000",
    "playCount": 1720000,
    "releaseYear": 2022,
    "mood": "Majestic"
  },
  {
    "id": "song-27",
    "title": "Wildflower Coast",
    "artist": "The Cedar Meadows",
    "artistId": "art-18",
    "album": "Pacific Folkways",
    "albumId": "alb-18",
    "genre": "Indie",
    "duration": 212,
    "durationStr": "3:32",
    "artwork": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    "plays": "3,110,400",
    "playCount": 3110400,
    "releaseYear": 2024,
    "mood": "Earthy"
  },
  {
    "id": "song-28",
    "title": "Campfire Harmonies",
    "artist": "The Cedar Meadows",
    "artistId": "art-18",
    "album": "Pacific Folkways",
    "albumId": "alb-18",
    "genre": "Indie",
    "duration": 195,
    "durationStr": "3:15",
    "artwork": "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    "plays": "2,400,000",
    "playCount": 2400000,
    "releaseYear": 2024,
    "mood": "Warm"
  },
  {
    "id": "song-29",
    "title": "Aurora Borealis",
    "artist": "CyberPulse",
    "artistId": "art-1",
    "album": "Synthetic Dreams",
    "albumId": "alb-1",
    "genre": "Electronic",
    "duration": 228,
    "durationStr": "3:48",
    "artwork": "https://images.unsplash.com/photo-1517230878791-4d28214017c3?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    "plays": "4,900,000",
    "playCount": 4900000,
    "releaseYear": 2024,
    "mood": "Dreamy"
  },
  {
    "id": "song-30",
    "title": "Chasing the Sunset",
    "artist": "Aria Vance",
    "artistId": "art-3",
    "album": "Golden Hour Glow",
    "albumId": "alb-3",
    "genre": "Pop",
    "duration": 199,
    "durationStr": "3:19",
    "artwork": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    "plays": "6,700,200",
    "playCount": 6700200,
    "releaseYear": 2024,
    "mood": "Uplifting"
  },
  {
    "id": "song-31",
    "title": "Golden Sunset Beats",
    "artist": "Lofi Sloth",
    "artistId": "art-12",
    "album": "Pastel Skies",
    "albumId": "alb-12",
    "genre": "Lo-fi",
    "duration": 172,
    "durationStr": "2:52",
    "artwork": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    "plays": "11,400,000",
    "playCount": 11400000,
    "releaseYear": 2023,
    "mood": "Chill"
  },
  {
    "id": "song-32",
    "title": "Raag Yaman Odyssey",
    "artist": "Arijit Verma",
    "artistId": "art-7",
    "album": "Surili Shaam",
    "albumId": "alb-7",
    "genre": "Bollywood",
    "duration": 288,
    "durationStr": "4:48",
    "artwork": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    "plays": "8,100,500",
    "playCount": 8100500,
    "releaseYear": 2024,
    "mood": "Meditative"
  },
  {
    "id": "song-33",
    "title": "Symphony of Lights",
    "artist": "Kroma Synth",
    "artistId": "art-2",
    "album": "Vapor Waveform",
    "albumId": "alb-2",
    "genre": "Electronic",
    "duration": 204,
    "durationStr": "3:24",
    "artwork": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "plays": "1,650,000",
    "playCount": 1650000,
    "releaseYear": 2023,
    "mood": "Futuristic"
  },
  {
    "id": "song-34",
    "title": "Chennai Metro Groove",
    "artist": "Anirudh Sriram",
    "artistId": "art-9",
    "album": "Chennai Beats",
    "albumId": "alb-9",
    "genre": "Tamil",
    "duration": 215,
    "durationStr": "3:35",
    "artwork": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "plays": "14,200,000",
    "playCount": 14200000,
    "releaseYear": 2024,
    "mood": "Energetic"
  },
  {
    "id": "song-35",
    "title": "Trap Anthem 808",
    "artist": "Echo Flow",
    "artistId": "art-6",
    "album": "Underground Frequency",
    "albumId": "alb-6",
    "genre": "Hip-Hop",
    "duration": 178,
    "durationStr": "2:58",
    "artwork": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "plays": "2,850,000",
    "playCount": 2850000,
    "releaseYear": 2024,
    "mood": "Hype"
  },
  {
    "id": "song-36",
    "title": "Mast Malang",
    "artist": "Shreya Kapoor",
    "artistId": "art-8",
    "album": "Rangrez",
    "albumId": "alb-8",
    "genre": "Bollywood",
    "duration": 232,
    "durationStr": "3:52",
    "artwork": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "plays": "7,450,000",
    "playCount": 7450000,
    "releaseYear": 2023,
    "mood": "Joyful"
  },
  {
    "id": "song-37",
    "title": "Thendral Vanthu Theendum",
    "artist": "Harini Sundar",
    "artistId": "art-10",
    "album": "Thendral Raagam",
    "albumId": "alb-10",
    "genre": "Tamil",
    "duration": 260,
    "durationStr": "4:20",
    "artwork": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "plays": "6,100,000",
    "playCount": 6100000,
    "releaseYear": 2023,
    "mood": "Soulful"
  },
  {
    "id": "song-38",
    "title": "Overdrive Solo",
    "artist": "Silver Distortion",
    "artistId": "art-14",
    "album": "Overdrive Protocol",
    "albumId": "alb-14",
    "genre": "Rock",
    "duration": 245,
    "durationStr": "4:05",
    "artwork": "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    "plays": "1,420,000",
    "playCount": 1420000,
    "releaseYear": 2024,
    "mood": "Intense"
  },
  {
    "id": "song-39",
    "title": "Café Parisien",
    "artist": "Ella Laurent",
    "artistId": "art-16",
    "album": "Coffee & Clarinet",
    "albumId": "alb-16",
    "genre": "Jazz",
    "duration": 220,
    "durationStr": "3:40",
    "artwork": "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    "plays": "1,890,000",
    "playCount": 1890000,
    "releaseYear": 2024,
    "mood": "Romantic"
  },
  {
    "id": "song-40",
    "title": "Clair de Lune Variations",
    "artist": "Vienna Chamber Collective",
    "artistId": "art-17",
    "album": "Midnight Piano Solos",
    "albumId": "alb-17",
    "genre": "Classical",
    "duration": 312,
    "durationStr": "5:12",
    "artwork": "https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    "plays": "4,200,000",
    "playCount": 4200000,
    "releaseYear": 2022,
    "mood": "Peaceful"
  },
  {
    "id": "song-41",
    "title": "Dunes of Timbuktu",
    "artist": "Rhythm of Sahara",
    "artistId": "art-19",
    "album": "Desert Caravan",
    "albumId": "alb-19",
    "genre": "World",
    "duration": 258,
    "durationStr": "4:18",
    "artwork": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    "plays": "1,320,000",
    "playCount": 1320000,
    "releaseYear": 2023,
    "mood": "Hypnotic"
  },
  {
    "id": "song-42",
    "title": "Oasis Mirage",
    "artist": "Rhythm of Sahara",
    "artistId": "art-19",
    "album": "Desert Caravan",
    "albumId": "alb-19",
    "genre": "World",
    "duration": 235,
    "durationStr": "3:55",
    "artwork": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    "plays": "980,000",
    "playCount": 980000,
    "releaseYear": 2023,
    "mood": "Mystical"
  },
  {
    "id": "song-43",
    "title": "Fjord Sunlight",
    "artist": "Aurora Borealis Club",
    "artistId": "art-20",
    "album": "Nordic Deep",
    "albumId": "alb-20",
    "genre": "Electronic",
    "duration": 280,
    "durationStr": "4:40",
    "artwork": "https://images.unsplash.com/photo-1517230878791-4d28214017c3?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    "plays": "3,750,000",
    "playCount": 3750000,
    "releaseYear": 2024,
    "mood": "Euphoric"
  },
  {
    "id": "song-44",
    "title": "Midnight Sun Groove",
    "artist": "Aurora Borealis Club",
    "artistId": "art-20",
    "album": "Nordic Deep",
    "albumId": "alb-20",
    "genre": "Electronic",
    "duration": 265,
    "durationStr": "4:25",
    "artwork": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    "plays": "2,900,000",
    "playCount": 2900000,
    "releaseYear": 2024,
    "mood": "Groovy"
  },
  {
    "id": "song-45",
    "title": "Kyoto Rain Droplets",
    "artist": "Zen Garden Strings",
    "artistId": "art-21",
    "album": "Bamboo Meditation",
    "albumId": "alb-21",
    "genre": "Classical",
    "duration": 290,
    "durationStr": "4:50",
    "artwork": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    "plays": "2,450,000",
    "playCount": 2450000,
    "releaseYear": 2023,
    "mood": "Tranquil"
  },
  {
    "id": "song-46",
    "title": "Lotus Pond Dawn",
    "artist": "Zen Garden Strings",
    "artistId": "art-21",
    "album": "Bamboo Meditation",
    "albumId": "alb-21",
    "genre": "Classical",
    "duration": 270,
    "durationStr": "4:30",
    "artwork": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    "plays": "1,890,000",
    "playCount": 1890000,
    "releaseYear": 2023,
    "mood": "Serene"
  },
  {
    "id": "song-47",
    "title": "Electric Velvet",
    "artist": "CyberPulse",
    "artistId": "art-1",
    "album": "Synthetic Dreams",
    "albumId": "alb-1",
    "genre": "Electronic",
    "duration": 210,
    "durationStr": "3:30",
    "artwork": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    "plays": "3,100,000",
    "playCount": 3100000,
    "releaseYear": 2024,
    "mood": "Hypnotic"
  },
  {
    "id": "song-48",
    "title": "Golden Skyline",
    "artist": "Aria Vance",
    "artistId": "art-3",
    "album": "Golden Hour Glow",
    "albumId": "alb-3",
    "genre": "Pop",
    "duration": 195,
    "durationStr": "3:15",
    "artwork": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    "plays": "4,650,000",
    "playCount": 4650000,
    "releaseYear": 2024,
    "mood": "Joyful"
  },
  {
    "id": "song-49",
    "title": "Concrete Jungle Echoes",
    "artist": "King Cipher",
    "artistId": "art-5",
    "album": "Crown & Concrete",
    "albumId": "alb-5",
    "genre": "Hip-Hop",
    "duration": 220,
    "durationStr": "3:40",
    "artwork": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "plays": "2,950,000",
    "playCount": 2950000,
    "releaseYear": 2023,
    "mood": "Raw"
  },
  {
    "id": "song-50",
    "title": "Dil Ki Dhadkan",
    "artist": "Arijit Verma",
    "artistId": "art-7",
    "album": "Surili Shaam",
    "albumId": "alb-7",
    "genre": "Bollywood",
    "duration": 275,
    "durationStr": "4:35",
    "artwork": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "plays": "9,800,000",
    "playCount": 9800000,
    "releaseYear": 2024,
    "mood": "Romantic"
  },
  {
    "id": "song-51",
    "title": "Chennai Rockstar",
    "artist": "Anirudh Sriram",
    "artistId": "art-9",
    "album": "Chennai Beats",
    "albumId": "alb-9",
    "genre": "Tamil",
    "duration": 218,
    "durationStr": "3:38",
    "artwork": "https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "plays": "13,500,000",
    "playCount": 13500000,
    "releaseYear": 2024,
    "mood": "Energetic"
  },
  {
    "id": "song-52",
    "title": "Study Night Chords",
    "artist": "Coffee Bean Chords",
    "artistId": "art-11",
    "album": "Warm Mug Sessions",
    "albumId": "alb-11",
    "genre": "Lo-fi",
    "duration": 160,
    "durationStr": "2:40",
    "artwork": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "plays": "12,900,000",
    "playCount": 12900000,
    "releaseYear": 2024,
    "mood": "Peaceful"
  }
];

export const defaultArtists: Artist[] = [
  {
    "id": "art-1",
    "name": "CyberPulse",
    "genre": "Electronic / Synthwave",
    "monthlyListeners": "3,842,109",
    "followers": "1,420,900",
    "verified": true,
    "bio": "Pioneering retro-futuristic synthwave and cybernetic electronica from Berlin. Known for atmospheric analog synthesizer sequences and pulsating neon beats.",
    "avatar": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-1",
      "song-2",
      "song-29"
    ],
    "albumIds": [
      "alb-1"
    ]
  },
  {
    "id": "art-2",
    "name": "Kroma Synth",
    "genre": "Electronic / Chillwave",
    "monthlyListeners": "2,154,800",
    "followers": "890,200",
    "verified": true,
    "bio": "Architect of ambient analog soundscapes and hypnotic bass grooves. Blending Tokyo city nights with retro-future tape saturation.",
    "avatar": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-3",
      "song-33"
    ],
    "albumIds": [
      "alb-2"
    ]
  },
  {
    "id": "art-3",
    "name": "Aria Vance",
    "genre": "Pop / Synth-Pop",
    "monthlyListeners": "8,920,400",
    "followers": "5,340,100",
    "verified": true,
    "bio": "Global chart-topping pop singer-songwriter with luminous vocal agility and infectious dance anthems.",
    "avatar": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-4",
      "song-5",
      "song-30"
    ],
    "albumIds": [
      "alb-3"
    ]
  },
  {
    "id": "art-4",
    "name": "Luna Sterling",
    "genre": "Pop / Indie Pop",
    "monthlyListeners": "4,102,900",
    "followers": "2,100,500",
    "verified": true,
    "bio": "Crafting shimmering acoustic and dream-pop records that captivate festival audiences worldwide.",
    "avatar": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-6"
    ],
    "albumIds": [
      "alb-4"
    ]
  },
  {
    "id": "art-5",
    "name": "King Cipher",
    "genre": "Hip-Hop / Boom Bap",
    "monthlyListeners": "6,230,000",
    "followers": "3,800,200",
    "verified": true,
    "bio": "East coast lyrical titan known for razor-sharp rhyme schemes, heavy brass samples, and gritty storytelling.",
    "avatar": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-7",
      "song-8"
    ],
    "albumIds": [
      "alb-5"
    ]
  },
  {
    "id": "art-6",
    "name": "Echo Flow",
    "genre": "Hip-Hop / Trap",
    "monthlyListeners": "2,920,500",
    "followers": "1,450,000",
    "verified": false,
    "bio": "Atlanta underground prodigy fusing melodic 808s with quick-witted punchlines and cinematic intros.",
    "avatar": "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-9",
      "song-35"
    ],
    "albumIds": [
      "alb-6"
    ]
  },
  {
    "id": "art-7",
    "name": "Arijit Verma",
    "genre": "Bollywood / Sufi Romance",
    "monthlyListeners": "14,800,000",
    "followers": "9,200,000",
    "verified": true,
    "bio": "The undisputed voice of modern romantic cinema. Delivering heartfelt classical nuances and soulful acoustic ballads.",
    "avatar": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-10",
      "song-11",
      "song-32"
    ],
    "albumIds": [
      "alb-7"
    ]
  },
  {
    "id": "art-8",
    "name": "Shreya Kapoor",
    "genre": "Bollywood / Classical Pop",
    "monthlyListeners": "9,120,400",
    "followers": "6,400,000",
    "verified": true,
    "bio": "Celebrated songstress with timeless vocal mastery across semi-classical, folk rhythms, and blockbuster festive hits.",
    "avatar": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-12",
      "song-36"
    ],
    "albumIds": [
      "alb-8"
    ]
  },
  {
    "id": "art-9",
    "name": "Anirudh Sriram",
    "genre": "Tamil / Electro-Folk",
    "monthlyListeners": "12,500,000",
    "followers": "8,100,000",
    "verified": true,
    "bio": "Rockstar composer transforming South Indian cinema music with high-octane rock hooks, EDM drops, and traditional percussion.",
    "avatar": "https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-13",
      "song-14",
      "song-34"
    ],
    "albumIds": [
      "alb-9"
    ]
  },
  {
    "id": "art-10",
    "name": "Harini Sundar",
    "genre": "Tamil / Melody",
    "monthlyListeners": "5,640,000",
    "followers": "3,200,000",
    "verified": true,
    "bio": "Enchanting melodist blending Carnatic classical heritage with contemporary acoustic guitars and orchestral arrangements.",
    "avatar": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1520523839898-507127027582?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-15",
      "song-37"
    ],
    "albumIds": [
      "alb-10"
    ]
  },
  {
    "id": "art-11",
    "name": "Coffee Bean Chords",
    "genre": "Lo-fi / Chillhop",
    "monthlyListeners": "16,200,300",
    "followers": "7,800,000",
    "verified": true,
    "bio": "The soundtrack to midnight studying, rainy mornings, and warm tea. Velvet piano chords and soothing vinyl crackle.",
    "avatar": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-16",
      "song-17"
    ],
    "albumIds": [
      "alb-11"
    ]
  },
  {
    "id": "art-12",
    "name": "Lofi Sloth",
    "genre": "Lo-fi / Ambient",
    "monthlyListeners": "10,190,000",
    "followers": "4,600,000",
    "verified": true,
    "bio": "Low-tempo beats for high-stress days. Crafting nostalgic tape loops that make you feel right at home.",
    "avatar": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-18",
      "song-31"
    ],
    "albumIds": [
      "alb-12"
    ]
  },
  {
    "id": "art-13",
    "name": "The Iron Reverbs",
    "genre": "Rock / Alternative",
    "monthlyListeners": "4,150,000",
    "followers": "2,750,000",
    "verified": true,
    "bio": "Garage rock power-trio hailing from Seattle. Heavy fuzz basslines, roaring drums, and stadium-sized chorus hooks.",
    "avatar": "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-19",
      "song-20"
    ],
    "albumIds": [
      "alb-13"
    ]
  },
  {
    "id": "art-14",
    "name": "Silver Distortion",
    "genre": "Rock / Hard Rock",
    "monthlyListeners": "1,840,000",
    "followers": "920,000",
    "verified": false,
    "bio": "Pure electric adrenaline. Dual lead guitars and thunderous rhythms that echo the golden age of hard rock.",
    "avatar": "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-21",
      "song-38"
    ],
    "albumIds": [
      "alb-14"
    ]
  },
  {
    "id": "art-15",
    "name": "Miles Henderson Quartet",
    "genre": "Jazz / Bebop & Cool",
    "monthlyListeners": "1,430,900",
    "followers": "680,000",
    "verified": true,
    "bio": "Manhattan jazz veterans delivering timeless tenor sax improvisations, walking upright bass, and smoky piano voicings.",
    "avatar": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1525994886773-080587e161c2?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-22",
      "song-23"
    ],
    "albumIds": [
      "alb-15"
    ]
  },
  {
    "id": "art-16",
    "name": "Ella Laurent",
    "genre": "Jazz / Vocal Jazz",
    "monthlyListeners": "2,200,000",
    "followers": "1,150,000",
    "verified": true,
    "bio": "Silky vocal jazz and Parisian cafe nostalgia. Nominated for International Jazz Vocalist of the Year.",
    "avatar": "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-24",
      "song-39"
    ],
    "albumIds": [
      "alb-16"
    ]
  },
  {
    "id": "art-17",
    "name": "Vienna Chamber Collective",
    "genre": "Classical / Instrumental",
    "monthlyListeners": "3,800,000",
    "followers": "1,900,000",
    "verified": true,
    "bio": "World-renowned acoustic chamber ensemble known for pristine performances of classical and modern neo-classical movements.",
    "avatar": "https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-25",
      "song-26",
      "song-40"
    ],
    "albumIds": [
      "alb-17"
    ]
  },
  {
    "id": "art-18",
    "name": "The Cedar Meadows",
    "genre": "Indie / Folk Acoustic",
    "monthlyListeners": "3,110,400",
    "followers": "1,650,000",
    "verified": true,
    "bio": "Pacific northwest indie collective blending gentle banjo picks, cello lines, and heartfelt vocal duets.",
    "avatar": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-27",
      "song-28"
    ],
    "albumIds": [
      "alb-18"
    ]
  },
  {
    "id": "art-19",
    "name": "Rhythm of Sahara",
    "genre": "World / Desert Blues",
    "monthlyListeners": "1,720,000",
    "followers": "840,000",
    "verified": true,
    "bio": "Hypnotic desert electric guitars, polyrhythmic hand drums, and ancestral chants from West Africa.",
    "avatar": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-41",
      "song-42"
    ],
    "albumIds": [
      "alb-19"
    ]
  },
  {
    "id": "art-20",
    "name": "Aurora Borealis Club",
    "genre": "Electronic / Deep House",
    "monthlyListeners": "4,500,000",
    "followers": "2,300,000",
    "verified": true,
    "bio": "Nordic sunset house and atmospheric club music crafted with deep analog bass and crisp organic percussion.",
    "avatar": "https://images.unsplash.com/photo-1517230878791-4d28214017c3?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-43",
      "song-44"
    ],
    "albumIds": [
      "alb-20"
    ]
  },
  {
    "id": "art-21",
    "name": "Zen Garden Strings",
    "genre": "Acoustic / Meditation",
    "monthlyListeners": "2,900,000",
    "followers": "1,400,000",
    "verified": true,
    "bio": "Minimalist harp and acoustic guitar designed for mindfulness, deep sleep, and meditation.",
    "avatar": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80",
    "banner": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop&q=80",
    "topSongIds": [
      "song-45",
      "song-46"
    ],
    "albumIds": [
      "alb-21"
    ]
  }
];

export const defaultAlbums: Album[] = [
  {
    "id": "alb-1",
    "title": "Synthetic Dreams",
    "artist": "CyberPulse",
    "artistId": "art-1",
    "releaseYear": 2024,
    "genre": "Electronic",
    "artwork": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-1",
      "song-2",
      "song-29",
      "song-47"
    ],
    "durationStr": "14 min 11 sec",
    "likesCount": "48,290"
  },
  {
    "id": "alb-2",
    "title": "Vapor Waveform",
    "artist": "Kroma Synth",
    "artistId": "art-2",
    "releaseYear": 2023,
    "genre": "Electronic",
    "artwork": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-3",
      "song-33"
    ],
    "durationStr": "7 min 26 sec",
    "likesCount": "29,400"
  },
  {
    "id": "alb-3",
    "title": "Golden Hour Glow",
    "artist": "Aria Vance",
    "artistId": "art-3",
    "releaseYear": 2024,
    "genre": "Pop",
    "artwork": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-4",
      "song-5",
      "song-30",
      "song-48"
    ],
    "durationStr": "13 min 03 sec",
    "likesCount": "192,800"
  },
  {
    "id": "alb-4",
    "title": "Prism of Sound",
    "artist": "Luna Sterling",
    "artistId": "art-4",
    "releaseYear": 2023,
    "genre": "Pop",
    "artwork": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-6"
    ],
    "durationStr": "3 min 12 sec",
    "likesCount": "34,100"
  },
  {
    "id": "alb-5",
    "title": "Crown & Concrete",
    "artist": "King Cipher",
    "artistId": "art-5",
    "releaseYear": 2023,
    "genre": "Hip-Hop",
    "artwork": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-7",
      "song-8",
      "song-49"
    ],
    "durationStr": "10 min 18 sec",
    "likesCount": "88,900"
  },
  {
    "id": "alb-6",
    "title": "Underground Frequency",
    "artist": "Echo Flow",
    "artistId": "art-6",
    "releaseYear": 2024,
    "genre": "Hip-Hop",
    "artwork": "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-9",
      "song-35"
    ],
    "durationStr": "6 min 42 sec",
    "likesCount": "21,500"
  },
  {
    "id": "alb-7",
    "title": "Surili Shaam",
    "artist": "Arijit Verma",
    "artistId": "art-7",
    "releaseYear": 2024,
    "genre": "Bollywood",
    "artwork": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-10",
      "song-11",
      "song-32",
      "song-50"
    ],
    "durationStr": "17 min 56 sec",
    "likesCount": "342,000"
  },
  {
    "id": "alb-8",
    "title": "Rangrez",
    "artist": "Shreya Kapoor",
    "artistId": "art-8",
    "releaseYear": 2023,
    "genre": "Bollywood",
    "artwork": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-12",
      "song-36"
    ],
    "durationStr": "7 min 27 sec",
    "likesCount": "76,400"
  },
  {
    "id": "alb-9",
    "title": "Chennai Beats",
    "artist": "Anirudh Sriram",
    "artistId": "art-9",
    "releaseYear": 2024,
    "genre": "Tamil",
    "artwork": "https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-13",
      "song-14",
      "song-34",
      "song-51"
    ],
    "durationStr": "15 min 15 sec",
    "likesCount": "218,000"
  },
  {
    "id": "alb-10",
    "title": "Thendral Raagam",
    "artist": "Harini Sundar",
    "artistId": "art-10",
    "releaseYear": 2023,
    "genre": "Tamil",
    "artwork": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-15",
      "song-37"
    ],
    "durationStr": "8 min 20 sec",
    "likesCount": "41,200"
  },
  {
    "id": "alb-11",
    "title": "Warm Mug Sessions",
    "artist": "Coffee Bean Chords",
    "artistId": "art-11",
    "releaseYear": 2024,
    "genre": "Lo-fi",
    "artwork": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-16",
      "song-17",
      "song-52"
    ],
    "durationStr": "8 min 02 sec",
    "likesCount": "512,000"
  },
  {
    "id": "alb-12",
    "title": "Pastel Skies",
    "artist": "Lofi Sloth",
    "artistId": "art-12",
    "releaseYear": 2023,
    "genre": "Lo-fi",
    "artwork": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-18",
      "song-31"
    ],
    "durationStr": "5 min 14 sec",
    "likesCount": "198,000"
  },
  {
    "id": "alb-13",
    "title": "Fossil & Flame",
    "artist": "The Iron Reverbs",
    "artistId": "art-13",
    "releaseYear": 2023,
    "genre": "Rock",
    "artwork": "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-19",
      "song-20"
    ],
    "durationStr": "8 min 12 sec",
    "likesCount": "62,700"
  },
  {
    "id": "alb-14",
    "title": "Overdrive Protocol",
    "artist": "Silver Distortion",
    "artistId": "art-14",
    "releaseYear": 2024,
    "genre": "Rock",
    "artwork": "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-21",
      "song-38"
    ],
    "durationStr": "7 min 43 sec",
    "likesCount": "18,400"
  },
  {
    "id": "alb-15",
    "title": "Smoke & Bourbon",
    "artist": "Miles Henderson Quartet",
    "artistId": "art-15",
    "releaseYear": 2023,
    "genre": "Jazz",
    "artwork": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-22",
      "song-23"
    ],
    "durationStr": "9 min 55 sec",
    "likesCount": "45,300"
  },
  {
    "id": "alb-16",
    "title": "Coffee & Clarinet",
    "artist": "Ella Laurent",
    "artistId": "art-16",
    "releaseYear": 2024,
    "genre": "Jazz",
    "artwork": "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-24",
      "song-39"
    ],
    "durationStr": "7 min 44 sec",
    "likesCount": "39,100"
  },
  {
    "id": "alb-17",
    "title": "Midnight Piano Solos",
    "artist": "Vienna Chamber Collective",
    "artistId": "art-17",
    "releaseYear": 2022,
    "genre": "Classical",
    "artwork": "https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-25",
      "song-26",
      "song-40"
    ],
    "durationStr": "15 min 27 sec",
    "likesCount": "94,000"
  },
  {
    "id": "alb-18",
    "title": "Pacific Folkways",
    "artist": "The Cedar Meadows",
    "artistId": "art-18",
    "releaseYear": 2024,
    "genre": "Indie",
    "artwork": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-27",
      "song-28"
    ],
    "durationStr": "6 min 47 sec",
    "likesCount": "35,000"
  },
  {
    "id": "alb-19",
    "title": "Desert Caravan",
    "artist": "Rhythm of Sahara",
    "artistId": "art-19",
    "releaseYear": 2023,
    "genre": "World",
    "artwork": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-41",
      "song-42"
    ],
    "durationStr": "8 min 13 sec",
    "likesCount": "28,000"
  },
  {
    "id": "alb-20",
    "title": "Nordic Deep",
    "artist": "Aurora Borealis Club",
    "artistId": "art-20",
    "releaseYear": 2024,
    "genre": "Electronic",
    "artwork": "https://images.unsplash.com/photo-1517230878791-4d28214017c3?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-43",
      "song-44"
    ],
    "durationStr": "9 min 05 sec",
    "likesCount": "52,000"
  },
  {
    "id": "alb-21",
    "title": "Bamboo Meditation",
    "artist": "Zen Garden Strings",
    "artistId": "art-21",
    "releaseYear": 2023,
    "genre": "Classical",
    "artwork": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-45",
      "song-46"
    ],
    "durationStr": "9 min 20 sec",
    "likesCount": "67,000"
  }
];

export const defaultPlaylists: Playlist[] = [
  {
    "id": "pl-1",
    "name": "Cyberpunk Neon Drive",
    "description": "High-octane synthwave and electronic pulses for late-night highway cruisers and neon dreamers.",
    "creator": "SoundWave Editorial",
    "cover": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-1",
      "song-2",
      "song-3",
      "song-29",
      "song-33",
      "song-47"
    ],
    "followers": "840,290",
    "accentColor": "#06b6d4",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-2",
    "name": "Lo-Fi Study Beats",
    "description": "Calm, gentle instrumentals and soothing tape crackle to help you focus, code, and relax.",
    "creator": "SoundWave Chill",
    "cover": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-16",
      "song-17",
      "song-18",
      "song-31",
      "song-52"
    ],
    "followers": "2,150,000",
    "accentColor": "#10b981",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-3",
    "name": "Bollywood Romance & Sufi",
    "description": "Soul-stirring Hindi melodies, acoustic guitars, and heartfelt lyrics from iconic modern cinema.",
    "creator": "SoundWave India",
    "cover": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-10",
      "song-11",
      "song-12",
      "song-32",
      "song-36",
      "song-50"
    ],
    "followers": "4,890,300",
    "accentColor": "#ec4899",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-4",
    "name": "Tamil High-Voltage Hits",
    "description": "Explosive kuthu rhythms, EDM drops, and anthemic hooks straight from Kollywood.",
    "creator": "SoundWave Tamil",
    "cover": "https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-13",
      "song-14",
      "song-15",
      "song-34",
      "song-37",
      "song-51"
    ],
    "followers": "3,210,000",
    "accentColor": "#f59e0b",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-5",
    "name": "Pure Pop Energy",
    "description": "The brightest, most irresistible pop anthems topping global playlists right now.",
    "creator": "SoundWave Hits",
    "cover": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-4",
      "song-5",
      "song-6",
      "song-30",
      "song-48"
    ],
    "followers": "1,980,000",
    "accentColor": "#3b82f6",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-6",
    "name": "Late Night Hip-Hop Cypher",
    "description": "Heavy basslines, boom-bap drums, and lyrical storytelling for the midnight hours.",
    "creator": "SoundWave Urban",
    "cover": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-7",
      "song-8",
      "song-9",
      "song-35",
      "song-49"
    ],
    "followers": "1,420,000",
    "accentColor": "#8b5cf6",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-7",
    "name": "Midnight Jazz & Espresso",
    "description": "Smoky saxophones, upright bass, and quiet brass chords for winding down after dark.",
    "creator": "SoundWave Jazz",
    "cover": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-22",
      "song-23",
      "song-24",
      "song-39"
    ],
    "followers": "760,000",
    "accentColor": "#d97706",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-8",
    "name": "Raw Rock & Overdrive",
    "description": "Distorted guitars, driving bass, and anthemic garage rock solos that ignite the room.",
    "creator": "SoundWave Rock",
    "cover": "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-19",
      "song-20",
      "song-21",
      "song-38"
    ],
    "followers": "1,120,000",
    "accentColor": "#ef4444",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-9",
    "name": "Deep Focus Classical",
    "description": "Timeless piano nocturnes and orchestral movements curated for undisturbed concentration.",
    "creator": "SoundWave Classical",
    "cover": "https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-25",
      "song-26",
      "song-40"
    ],
    "followers": "690,000",
    "accentColor": "#6366f1",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-10",
    "name": "Indie Sunset Roadtrip",
    "description": "Warm acoustic strums, indie folk harmonies, and fresh air for open highway drives.",
    "creator": "SoundWave Indie",
    "cover": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-27",
      "song-28"
    ],
    "followers": "850,000",
    "accentColor": "#14b8a6",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-11",
    "name": "SoundWave Blend: Alex & Sarah",
    "description": "A shared musical mix reflecting your combined listening taste. 86% musical compatibility!",
    "creator": "SoundWave Blend",
    "cover": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-1",
      "song-4",
      "song-16",
      "song-10",
      "song-43"
    ],
    "followers": "2",
    "accentColor": "#ec4899",
    "isPublic": true,
    "isCollaborative": true,
    "collaborators": [
      "usr-alex",
      "usr-premium"
    ]
  },
  {
    "id": "pl-12",
    "name": "Workout Adrenaline",
    "description": "BPM 140+ high energy electronic drops and hip-hop heaters to smash your personal records.",
    "creator": "SoundWave Fitness",
    "cover": "https://images.unsplash.com/photo-1517230878791-4d28214017c3?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-7",
      "song-13",
      "song-21",
      "song-34",
      "song-43"
    ],
    "followers": "1,560,000",
    "accentColor": "#f43f5e",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-13",
    "name": "Acoustic Morning Sunlight",
    "description": "Soft fingerpicked guitars, warm vocals, and morning tranquility.",
    "creator": "SoundWave Acoustic",
    "cover": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-27",
      "song-28",
      "song-45",
      "song-46"
    ],
    "followers": "920,000",
    "accentColor": "#f59e0b",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-14",
    "name": "Deep Sleep & Raindrops",
    "description": "Low-frequency ambient drones, rain textures, and slow soothing piano chords.",
    "creator": "SoundWave Sleep",
    "cover": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-17",
      "song-25",
      "song-45"
    ],
    "followers": "1,840,000",
    "accentColor": "#38bdf8",
    "isPublic": true,
    "isCollaborative": false
  },
  {
    "id": "pl-15",
    "name": "Discover Weekly",
    "description": "Your personalized weekly mixtape of fresh tracks and artists you will love.",
    "creator": "Made For You",
    "cover": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    "songIds": [
      "song-3",
      "song-6",
      "song-9",
      "song-14",
      "song-20",
      "song-29",
      "song-44"
    ],
    "followers": "Personal",
    "accentColor": "#8b5cf6",
    "isPublic": false,
    "isCollaborative": false
  }
];

export const defaultPodcasts: Podcast[] = [
  {
    "id": "pod-1",
    "title": "Sound Architecture: Music Tech & Synthesizers",
    "author": "Felix Vance",
    "description": "Deep dives into vintage modular synthesizers, digital audio workstations, analog tape, and cutting-edge music production techniques.",
    "coverImage": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80",
    "category": "Technology & Music",
    "followers": "340,000",
    "episodes": [
      {
        "id": "ep-101",
        "title": "The Rise of Analog Synths in 2026",
        "duration": 1840,
        "durationStr": "30:40",
        "releaseDate": "2024-03-01",
        "episodeNumber": 1,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "description": "Why modern bedroom producers are ditching pure digital plugins for analog voltage-controlled oscillators."
      },
      {
        "id": "ep-102",
        "title": "Spatial Audio & Atmos Mixing Secrets",
        "duration": 2150,
        "durationStr": "35:50",
        "releaseDate": "2024-03-08",
        "episodeNumber": 2,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        "description": "How Dolby Atmos and binaural rendering transform stereo acoustics into three-dimensional soundstages."
      },
      {
        "id": "ep-103",
        "title": "Mastering Lossless Hi-Fi Audio",
        "duration": 1980,
        "durationStr": "33:00",
        "releaseDate": "2024-03-15",
        "episodeNumber": 3,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        "description": "Understanding dynamic range, sample rates, dither, and FLAC compression for audiophile playback."
      }
    ]
  },
  {
    "id": "pod-2",
    "title": "The Director’s Cut: Cinema & Soundtracks",
    "author": "Clara Delacroix",
    "description": "Exploring the world’s most cinematic film scores, character themes, orchestral movements, and sound design masterpieces.",
    "coverImage": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=80",
    "category": "Film & Media",
    "followers": "520,000",
    "episodes": [
      {
        "id": "ep-201",
        "title": "Hans Zimmer & The Wall of Bass",
        "duration": 2420,
        "durationStr": "40:20",
        "releaseDate": "2024-02-12",
        "episodeNumber": 1,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        "description": "Deconstructing the seismic brass and Shepard tones behind iconic sci-fi blockbuster scores."
      },
      {
        "id": "ep-202",
        "title": "Indian Cinema Scoring Revolutions",
        "duration": 2280,
        "durationStr": "38:00",
        "releaseDate": "2024-02-26",
        "episodeNumber": 2,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        "description": "From Rahman to Anirudh: How rhythm, folk orchestration, and rock riffs redefined multilingual cinema music."
      },
      {
        "id": "ep-203",
        "title": "The Silence of Suspense",
        "duration": 1920,
        "durationStr": "32:00",
        "releaseDate": "2024-03-10",
        "episodeNumber": 3,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        "description": "Why negative space and room silence are often more terrifying than violent musical stabs."
      }
    ]
  },
  {
    "id": "pod-3",
    "title": "Daily Startup Pulse",
    "author": "Maya Lin & David Kim",
    "description": "Bite-sized daily breakdowns of the biggest tech breakthroughs, venture funding rounds, AI innovations, and founder lessons.",
    "coverImage": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80",
    "category": "Business & Tech",
    "followers": "890,000",
    "episodes": [
      {
        "id": "ep-301",
        "title": "AI Audio Models & Generative Beats",
        "duration": 1450,
        "durationStr": "24:10",
        "releaseDate": "2024-03-18",
        "episodeNumber": 1,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        "description": "How generative diffusion models are helping independent creators produce royalty-free sample packs."
      },
      {
        "id": "ep-302",
        "title": "Streaming Economics 2026",
        "duration": 1600,
        "durationStr": "26:40",
        "releaseDate": "2024-03-19",
        "episodeNumber": 2,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        "description": "A breakdown of user-centric payout models, merchandise bundles, and high-fidelity tier pricing."
      },
      {
        "id": "ep-303",
        "title": "Building Mobile-First Global Products",
        "duration": 1720,
        "durationStr": "28:40",
        "releaseDate": "2024-03-20",
        "episodeNumber": 3,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        "description": "Designing frictionless mobile checkout, responsive gesture navigation, and low-latency client state."
      }
    ]
  },
  {
    "id": "pod-4",
    "title": "Mindful Horizons: Meditation & Neuroscience",
    "author": "Dr. Elena Rostova",
    "description": "Evidence-based cognitive science, guided breathwork, sleep architecture, and meditation routines to conquer digital burnout.",
    "coverImage": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80",
    "category": "Health & Wellness",
    "followers": "670,000",
    "episodes": [
      {
        "id": "ep-401",
        "title": "Binaural Beats & Brainwave Entrainment",
        "duration": 1540,
        "durationStr": "25:40",
        "releaseDate": "2024-01-20",
        "episodeNumber": 1,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        "description": "Do alpha and theta binaural frequencies actually enhance focus and deep states of calm?"
      },
      {
        "id": "ep-402",
        "title": "Overcoming Notification Fatigue",
        "duration": 1800,
        "durationStr": "30:00",
        "releaseDate": "2024-02-05",
        "episodeNumber": 2,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        "description": "Practical habits to reclaim cognitive clarity from endless push notifications and doomscrolling."
      },
      {
        "id": "ep-403",
        "title": "15-Minute Evening Wind Down Meditation",
        "duration": 900,
        "durationStr": "15:00",
        "releaseDate": "2024-02-18",
        "episodeNumber": 3,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        "description": "A relaxing vocal session with soft ambient pads designed to prepare the nervous system for sleep."
      }
    ]
  },
  {
    "id": "pod-5",
    "title": "Cyberpunk Chronicles: Sci-Fi Stories",
    "author": "K. J. Sterling",
    "description": "Original immersive audio fiction set in rain-slicked mega-cities, neuro-linked cyber realms, and orbital stations.",
    "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    "category": "Fiction & Drama",
    "followers": "410,000",
    "episodes": [
      {
        "id": "ep-501",
        "title": "Episode 1: The Phantom Protocol",
        "duration": 2310,
        "durationStr": "38:30",
        "releaseDate": "2024-01-10",
        "episodeNumber": 1,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
        "description": "A renegade memory hacker discovers an encrypted consciousness in the city subway mainframe."
      },
      {
        "id": "ep-502",
        "title": "Episode 2: Neon Alley Exchange",
        "duration": 2450,
        "durationStr": "40:50",
        "releaseDate": "2024-01-24",
        "episodeNumber": 2,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
        "description": "Cornered by black-market cyber-mercenaries, Kira makes a dangerous trade for clean biometric credentials."
      },
      {
        "id": "ep-503",
        "title": "Episode 3: Ghost in the Neural Core",
        "duration": 2600,
        "durationStr": "43:20",
        "releaseDate": "2024-02-07",
        "episodeNumber": 3,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        "description": "Infiltrating the high-altitude cloud server where the city artificial intelligence awakens."
      }
    ]
  },
  {
    "id": "pod-6",
    "title": "History Uncovered: Ancient Mysteries",
    "author": "Prof. Julian Graves",
    "description": "Uncovering the lost civilizations, archaeological breakthroughs, and forgotten legends of antiquity.",
    "coverImage": "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80",
    "category": "History",
    "followers": "780,000",
    "episodes": [
      {
        "id": "ep-601",
        "title": "The Library of Alexandria Legends",
        "duration": 2240,
        "durationStr": "37:20",
        "releaseDate": "2024-01-15",
        "episodeNumber": 1,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        "description": "What scrolls and scientific wonders were actually preserved in the greatest intellectual beacon of the ancient Mediterranean."
      },
      {
        "id": "ep-602",
        "title": "The Antikythera Mechanism Decoded",
        "duration": 2100,
        "durationStr": "35:00",
        "releaseDate": "2024-02-01",
        "episodeNumber": 2,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "description": "How a corroded bronze artifact recovered from a Greek shipwreck proved the existence of an ancient astronomical computer."
      },
      {
        "id": "ep-603",
        "title": "The Indus Valley Acoustic Architecture",
        "duration": 1980,
        "durationStr": "33:00",
        "releaseDate": "2024-02-15",
        "episodeNumber": 3,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        "description": "Exploring the urban layout, drainage systems, and ceremonial sound design of Mohenjo-Daro."
      }
    ]
  },
  {
    "id": "pod-7",
    "title": "Cook & Simmer: Culinary Cultures",
    "author": "Chef Siobhan Rao",
    "description": "Stories of street food masters, heirloom spices, sourdough alchemy, and fermentation traditions from around the globe.",
    "coverImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80",
    "category": "Food & Culture",
    "followers": "310,000",
    "episodes": [
      {
        "id": "ep-701",
        "title": "The Geography of Spices: From Malabar to Mexico",
        "duration": 1850,
        "durationStr": "30:50",
        "releaseDate": "2024-02-10",
        "episodeNumber": 1,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        "description": "How black pepper, cardamom, and chili peppers shaped worldwide trade routes and national cuisines."
      },
      {
        "id": "ep-702",
        "title": "The Ancient Art of Sourdough Wild Ferments",
        "duration": 1950,
        "durationStr": "32:30",
        "releaseDate": "2024-02-24",
        "episodeNumber": 2,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        "description": "Cultivating wild lactobacillus and yeast starters for artisanal bread with complex open crumbs."
      },
      {
        "id": "ep-703",
        "title": "Tokyo Ramen Masters & 48-Hour Broths",
        "duration": 2040,
        "durationStr": "34:00",
        "releaseDate": "2024-03-09",
        "episodeNumber": 3,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        "description": "The obsessive precision of simmering dashi, tare, and tonkotsu stocks for ultimate umami depth."
      }
    ]
  },
  {
    "id": "pod-8",
    "title": "Code & Coffee: Developer Journeys",
    "author": "Arjun Nambiar",
    "description": "Engineering leadership, distributed systems, full-stack architecture, open source triumphs, and developer life.",
    "coverImage": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    "category": "Technology",
    "followers": "620,000",
    "episodes": [
      {
        "id": "ep-801",
        "title": "React 19 & The Modern Frontend Ecosystem",
        "duration": 2150,
        "durationStr": "35:50",
        "releaseDate": "2024-02-14",
        "episodeNumber": 1,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        "description": "Exploring Actions, compiler optimizations, hydration improvements, and modern state architecture."
      },
      {
        "id": "ep-802",
        "title": "Building Low-Latency Audio Players on the Web",
        "duration": 2400,
        "durationStr": "40:00",
        "releaseDate": "2024-02-28",
        "episodeNumber": 2,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        "description": "Handling HTML5 audio streams, procedural synthesizer fallbacks, crossfade gain nodes, and memory management."
      },
      {
        "id": "ep-803",
        "title": "Zero-Downtime Microservice Migrations",
        "duration": 2280,
        "durationStr": "38:00",
        "releaseDate": "2024-03-14",
        "episodeNumber": 3,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        "description": "How to refactor monolith databases into partitioned micro-stores without dropping user transactions."
      }
    ]
  },
  {
    "id": "pod-9",
    "title": "Cosmos & Beyond: Astrophysics Today",
    "author": "Dr. Neil Montgomery",
    "description": "The James Webb Space Telescope discoveries, gravitational waves, black hole accretion discs, and the search for exoplanets.",
    "coverImage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    "category": "Science",
    "followers": "940,000",
    "episodes": [
      {
        "id": "ep-901",
        "title": "First Galaxies at the Dawn of Time",
        "duration": 2350,
        "durationStr": "39:10",
        "releaseDate": "2024-01-28",
        "episodeNumber": 1,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        "description": "How infrared observations revealed massive luminous galaxies forming mere hundreds of millions of years after the Big Bang."
      },
      {
        "id": "ep-902",
        "title": "What Happens Inside an Event Horizon?",
        "duration": 2480,
        "durationStr": "41:20",
        "releaseDate": "2024-02-18",
        "episodeNumber": 2,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        "description": "General relativity vs quantum mechanics: Testing the boundaries of spacetime physics."
      },
      {
        "id": "ep-903",
        "title": "Water Worlds in Trappist-1",
        "duration": 2190,
        "durationStr": "36:30",
        "releaseDate": "2024-03-05",
        "episodeNumber": 3,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        "description": "Investigating atmospheric biosignatures on temperate terrestrial planets orbiting red dwarf stars."
      }
    ]
  },
  {
    "id": "pod-10",
    "title": "Green Planet: Climate & Clean Tech",
    "author": "Amara O’Connor",
    "description": "Next-generation solid-state batteries, geothermal energy, ocean restoration, and regenerative agriculture.",
    "coverImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    "category": "Environment",
    "followers": "450,000",
    "episodes": [
      {
        "id": "ep-1001",
        "title": "The Grid Battery Revolution",
        "duration": 1980,
        "durationStr": "33:00",
        "releaseDate": "2024-02-08",
        "episodeNumber": 1,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        "description": "Sodium-ion and iron-air storage facilities stabilizing solar and wind renewable grids."
      },
      {
        "id": "ep-1002",
        "title": "Reforestation via Autonomous Seed Drones",
        "duration": 1840,
        "durationStr": "30:40",
        "releaseDate": "2024-02-22",
        "episodeNumber": 2,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
        "description": "Planting thousands of native saplings per hour in remote mountain terrain using computer vision."
      },
      {
        "id": "ep-1003",
        "title": "Deep Geothermal: Tapping the Earth’s Core",
        "duration": 2050,
        "durationStr": "34:10",
        "releaseDate": "2024-03-07",
        "episodeNumber": 3,
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
        "description": "Drilling miles beneath tectonic plates to generate infinite baseload clean electricity."
      }
    ]
  }
];

export const defaultAudiobooks: Audiobook[] = [
  {
    "id": "ab-1",
    "title": "Echoes of the Starlight Sea",
    "author": "Genevieve Holt",
    "narrator": "Benedict Cumberbatch",
    "description": "An epic space odyssey exploring a dying empire, deep-space cartographers, and a mysterious acoustic signal resonating across galaxies.",
    "coverImage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    "duration": "11 hrs 42 mins",
    "category": "Science Fiction",
    "chapters": [
      {
        "number": 1,
        "title": "Prologue: The Forgotten Frequency",
        "duration": "45 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      },
      {
        "number": 2,
        "title": "Chapter 1: The Observatory on Triton",
        "duration": "52 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      },
      {
        "number": 3,
        "title": "Chapter 2: The Starlight Beacon",
        "duration": "48 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
      },
      {
        "number": 4,
        "title": "Chapter 3: Crossing the Helix Void",
        "duration": "56 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
      }
    ]
  },
  {
    "id": "ab-2",
    "title": "The Architecture of Focus",
    "author": "Marcus Vance",
    "narrator": "Marcus Vance",
    "description": "Mastering deep work, deliberate attention, digital minimalism, and cognitive stamina in a distraction-flooded age.",
    "coverImage": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80",
    "duration": "7 hrs 15 mins",
    "category": "Self-Improvement",
    "chapters": [
      {
        "number": 1,
        "title": "Chapter 1: The Attention Economy Trap",
        "duration": "38 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
      },
      {
        "number": 2,
        "title": "Chapter 2: The 90-Minute Focus Rhythm",
        "duration": "42 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
      },
      {
        "number": 3,
        "title": "Chapter 3: Engineering a Sanctuary of Calm",
        "duration": "45 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
      }
    ]
  },
  {
    "id": "ab-3",
    "title": "Whispers in the Obsidian Tower",
    "author": "Rowan Blackwood",
    "narrator": "Imogen Church",
    "description": "A Gothic fantasy mystery of forgotten runes, alchemical courts, and a detective gifted with hearing the echoes of old stones.",
    "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    "duration": "14 hrs 05 mins",
    "category": "Fantasy & Mystery",
    "chapters": [
      {
        "number": 1,
        "title": "Chapter 1: The Midnight Bell",
        "duration": "48 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
      },
      {
        "number": 2,
        "title": "Chapter 2: The Alchemist’s Testament",
        "duration": "51 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
      },
      {
        "number": 3,
        "title": "Chapter 3: Echoes Under the Pavement",
        "duration": "49 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
      }
    ]
  },
  {
    "id": "ab-4",
    "title": "The Stoic Mindset for Modern Life",
    "author": "Dr. Christopher Hayes",
    "narrator": "Simon Vance",
    "description": "Ancient wisdom from Marcus Aurelius, Seneca, and Epictetus applied to modern career stress, uncertainty, and resilience.",
    "coverImage": "https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80",
    "duration": "8 hrs 30 mins",
    "category": "Philosophy",
    "chapters": [
      {
        "number": 1,
        "title": "Chapter 1: What is in Your Control",
        "duration": "40 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
      },
      {
        "number": 2,
        "title": "Chapter 2: The Obstacle is the Way",
        "duration": "44 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
      }
    ]
  },
  {
    "id": "ab-5",
    "title": "Neon Nights of Neo-Tokyo",
    "author": "Kenji Sato",
    "narrator": "Hiroshi Tanaka",
    "description": "A gripping cyber-noir thriller following an underground cybernetic surgeon caught between corporate espionage and street factions.",
    "coverImage": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    "duration": "9 hrs 50 mins",
    "category": "Cyberpunk & Thriller",
    "chapters": [
      {
        "number": 1,
        "title": "Chapter 1: The Rain in Shinjuku",
        "duration": "46 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3"
      },
      {
        "number": 2,
        "title": "Chapter 2: The Encrypted Chip",
        "duration": "50 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3"
      }
    ]
  },
  {
    "id": "ab-6",
    "title": "The Biology of Human Longevity",
    "author": "Dr. Hannah Sterling",
    "narrator": "Claire Danes",
    "description": "Cellular rejuvenation, telomere repair, mitochondrial resilience, and nutrition strategies for a vibrant lifespan.",
    "coverImage": "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80",
    "duration": "10 hrs 20 mins",
    "category": "Science & Health",
    "chapters": [
      {
        "number": 1,
        "title": "Chapter 1: The Hallmarks of Aging",
        "duration": "52 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
      },
      {
        "number": 2,
        "title": "Chapter 2: Caloric Restriction Mimetics",
        "duration": "48 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"
      }
    ]
  },
  {
    "id": "ab-7",
    "title": "The Song of the Northern Pines",
    "author": "Astrid Lindholm",
    "narrator": "Fiona Shaw",
    "description": "A haunting Scandinavian family saga spanning three generations across frozen archipelagos, folklore, and resilience.",
    "coverImage": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    "duration": "12 hrs 10 mins",
    "category": "Historical Fiction",
    "chapters": [
      {
        "number": 1,
        "title": "Chapter 1: Winter on the Archipelago",
        "duration": "50 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      },
      {
        "number": 2,
        "title": "Chapter 2: The Ice Road",
        "duration": "55 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      }
    ]
  },
  {
    "id": "ab-8",
    "title": "Zero to Unicorn: Building the Future",
    "author": "Reid Hoffman & Peter Chen",
    "narrator": "Reid Hoffman",
    "description": "The real playbook for modern venture-backed startups, product-market fit, lightning scaling, and durable moats.",
    "coverImage": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80",
    "duration": "8 hrs 45 mins",
    "category": "Business",
    "chapters": [
      {
        "number": 1,
        "title": "Chapter 1: The Non-Obvious Insight",
        "duration": "42 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
      },
      {
        "number": 2,
        "title": "Chapter 2: The Distribution Flywheel",
        "duration": "46 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
      }
    ]
  },
  {
    "id": "ab-9",
    "title": "The Jazz Age: New York in the 1920s",
    "author": "Franklin D. Ross",
    "narrator": "Stanley Tucci",
    "description": "Speakeasies, Harlem Renaissance jam sessions, flappers, skyscrapers, and the birth of American modernism.",
    "coverImage": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80",
    "duration": "9 hrs 15 mins",
    "category": "History & Arts",
    "chapters": [
      {
        "number": 1,
        "title": "Chapter 1: Midnight on 52nd Street",
        "duration": "44 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
      },
      {
        "number": 2,
        "title": "Chapter 2: The Cotton Club Sessions",
        "duration": "48 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
      }
    ]
  },
  {
    "id": "ab-10",
    "title": "Acoustics & Sacred Spaces",
    "author": "Elena K. Morales",
    "narrator": "Juliet Stevenson",
    "description": "How ancient temples, cathedral domes, and subterranean resonance chambers shaped religious experience and human emotion.",
    "coverImage": "https://images.unsplash.com/photo-1520523839898-507127027582?w=600&auto=format&fit=crop&q=80",
    "duration": "11 hrs 00 mins",
    "category": "Art & Architecture",
    "chapters": [
      {
        "number": 1,
        "title": "Chapter 1: The Resonance of Carnac",
        "duration": "50 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
      },
      {
        "number": 2,
        "title": "Chapter 2: Gothic Vaults & Organ Reverbs",
        "duration": "54 mins",
        "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
      }
    ]
  }
];

export const defaultUsers: User[] = [
  {
    id: "usr-admin",
    name: "Alex Vance",
    username: "alexvance",
    email: "alex@soundwave.io",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    isPremium: true,
    plan: "Master Admin",
    subscriptionStatus: "ACTIVE"
  },
  {
    id: "usr-admin2",
    name: "SoundWave System Admin",
    username: "sysadmin",
    email: "admin@soundwave.io",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    isPremium: true,
    plan: "Enterprise Admin",
    subscriptionStatus: "ACTIVE"
  },
  {
    id: "usr-sarah",
    name: "Sarah Connor",
    username: "sarahc",
    email: "sarah.c@cyberdyne.io",
    role: "PREMIUM_USER",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    isPremium: true,
    plan: "Family Premium",
    subscriptionStatus: "ACTIVE"
  },
  {
    id: "usr-priya",
    name: "Priya Sharma",
    username: "priyasharma",
    email: "priya.sharma@mumbai.in",
    role: "PREMIUM_USER",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    isPremium: true,
    plan: "Individual Premium",
    subscriptionStatus: "ACTIVE"
  },
  {
    id: "usr-david",
    name: "David Chen",
    username: "dchen",
    email: "dchen@stanford.edu",
    role: "PREMIUM_USER",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    isPremium: true,
    plan: "Student Premium",
    subscriptionStatus: "ACTIVE"
  },
  {
    id: "usr-marcus",
    name: "Marcus Aurelius",
    username: "stoicmarcus",
    email: "marcus@rome.org",
    role: "USER",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    isPremium: false,
    plan: "Free Ad-Supported",
    subscriptionStatus: "FREE"
  },
  {
    id: "usr-elena",
    name: "Elena Rostova",
    username: "elena_r",
    email: "elena.rostova@berlin.de",
    role: "USER",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    isPremium: false,
    plan: "Free Ad-Supported",
    subscriptionStatus: "FREE"
  },
  {
    id: "usr-kenji",
    name: "Kenji Sato",
    username: "kenji_synth",
    email: "kenji.sato@tokyo.jp",
    role: "USER",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    isPremium: false,
    plan: "Free Ad-Supported",
    subscriptionStatus: "FREE"
  },
  {
    id: "usr-maya",
    name: "Maya Patel",
    username: "mayapatel",
    email: "maya.patel@london.co.uk",
    role: "PREMIUM_USER",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80",
    isPremium: true,
    plan: "Individual Premium",
    subscriptionStatus: "ACTIVE"
  },
  {
    id: "usr-liam",
    name: "Liam O'Connor",
    username: "liamoc",
    email: "liam.oc@dublin.ie",
    role: "USER",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    isPremium: false,
    plan: "Free Ad-Supported",
    subscriptionStatus: "FREE"
  },
  {
    id: "usr-sophia",
    name: "Sophia Martinez",
    username: "sophiam",
    email: "sophia.m@barcelona.es",
    role: "PREMIUM_USER",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&auto=format&fit=crop&q=80",
    isPremium: true,
    plan: "Family Premium",
    subscriptionStatus: "ACTIVE"
  },
  {
    id: "usr-jordan",
    name: "Jordan Lee",
    username: "jordanlee",
    email: "jlee99@seoul.kr",
    role: "USER",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80",
    isPremium: false,
    plan: "Free Ad-Supported",
    subscriptionStatus: "FREE"
  },
  {
    id: "usr-chloe",
    name: "Chloe Dupont",
    username: "chloedupont",
    email: "cdupont@paris.fr",
    role: "PREMIUM_USER",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    isPremium: true,
    plan: "Student Premium",
    subscriptionStatus: "ACTIVE"
  },
  {
    id: "usr-mateo",
    name: "Mateo Fernandez",
    username: "mateof",
    email: "mateo.f@buenosaires.ar",
    role: "USER",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    isPremium: false,
    plan: "Free Ad-Supported",
    subscriptionStatus: "FREE"
  },
  {
    id: "usr-aisha",
    name: "Aisha Al-Mansoor",
    username: "aisha_am",
    email: "aisha@dubai.ae",
    role: "PREMIUM_USER",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    isPremium: true,
    plan: "Individual Premium",
    subscriptionStatus: "ACTIVE"
  }
];

