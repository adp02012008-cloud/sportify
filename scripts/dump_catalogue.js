const fs = require('fs');
const path = require('path');

async function run() {
  process.env.MEMORY_MODE = 'true';
  const { seedDatabase } = require('../server/dist/seed/seedData.js');
  const { MemoryStore } = require('../server/dist/models/store.js');

  await seedDatabase();

  const outDir = path.resolve(__dirname, '../client/src/data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const tsContent = `// SoundWave Pre-bundled Audio & Content Catalogue for Zero-Latency Standalone / Vercel Operation
import { Song, Artist, Album, Playlist, Podcast, Audiobook } from '../types';

export const defaultSongs: Song[] = ${JSON.stringify(MemoryStore.songs, null, 2)};

export const defaultArtists: Artist[] = ${JSON.stringify(MemoryStore.artists, null, 2)};

export const defaultAlbums: Album[] = ${JSON.stringify(MemoryStore.albums, null, 2)};

export const defaultPlaylists: Playlist[] = ${JSON.stringify(MemoryStore.playlists, null, 2)};

export const defaultPodcasts: Podcast[] = ${JSON.stringify(MemoryStore.podcasts, null, 2)};

export const defaultAudiobooks: Audiobook[] = ${JSON.stringify(MemoryStore.audiobooks, null, 2)};
`;

  const targetFile = path.resolve(outDir, 'defaultCatalogue.ts');
  fs.writeFileSync(targetFile, tsContent, 'utf8');

  console.log('✅ Generated client/src/data/defaultCatalogue.ts:');
  console.log(`   - Songs:      ${MemoryStore.songs.length}`);
  console.log(`   - Artists:    ${MemoryStore.artists.length}`);
  console.log(`   - Albums:     ${MemoryStore.albums.length}`);
  console.log(`   - Playlists:  ${MemoryStore.playlists.length}`);
  console.log(`   - Podcasts:   ${MemoryStore.podcasts.length}`);
  console.log(`   - Audiobooks: ${MemoryStore.audiobooks.length}`);
}

run().catch(console.error);
