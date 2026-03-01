const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const monorepoRoot = path.resolve(__dirname, '..');

// ライブラリソースの変更を検知するために watchFolders に追加
config.watchFolders = [monorepoRoot];

// shamefully-hoist=true により root の node_modules にパッケージが集約されるので
// Metro の解決順を明示する
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;
