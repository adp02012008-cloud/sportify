// Root fallback entrypoint for Render when Root Directory is left at repository root
const path = require('path');
const serverDir = path.resolve(__dirname, '../server');
const serverNodeModules = path.resolve(serverDir, 'node_modules');

// Dynamically augment module resolution paths to include server/node_modules
require('module').globalPaths.unshift(serverNodeModules);
if (require.main && require.main.paths) {
  require.main.paths.unshift(serverNodeModules);
}
module.paths.unshift(serverNodeModules);

// Set current working directory to server so relative paths (.env, seed, assets) resolve correctly
try {
  process.chdir(serverDir);
} catch (e) {
  console.warn('Could not chdir to serverDir:', e.message);
}

// Run the compiled server
require(path.resolve(serverDir, 'dist/server.js'));
