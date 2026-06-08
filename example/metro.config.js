const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);
const existingBlockList = config.resolver.blockList
  ? Array.isArray(config.resolver.blockList)
    ? config.resolver.blockList
    : [config.resolver.blockList]
  : [];
const agentStateDirs = [
  /[/\\]\.omx[/\\].*/,
  /[/\\]\.omc[/\\].*/,
  /[/\\]\.claude[/\\].*/,
];

config.watchFolders = [workspaceRoot];
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'mossy-ui': path.resolve(workspaceRoot, 'src'),
  '@expo/ui': path.resolve(projectRoot, 'node_modules/@expo/ui'),
  expo: path.resolve(projectRoot, 'node_modules/expo'),
  react: path.resolve(projectRoot, 'node_modules/react'),
  'react-dom': path.resolve(projectRoot, 'node_modules/react-dom'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react-native-reanimated': path.resolve(projectRoot, 'node_modules/react-native-reanimated'),
  'react-native-worklets': path.resolve(projectRoot, 'node_modules/react-native-worklets'),
};
config.resolver.disableHierarchicalLookup = true;
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];
// AI tool state dirs are rewritten frequently; excluding them prevents Metro
// file watcher writes from putting the dev client in a repeated refresh loop.
config.resolver.blockList = [...existingBlockList, ...agentStateDirs];

module.exports = config;
