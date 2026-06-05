module.exports = function babelConfig(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: ['@expo/ui/babel-plugin', 'react-native-worklets/plugin'],
  };
};
