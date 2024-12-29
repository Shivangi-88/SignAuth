const { getDefaultConfig } = require('metro-config');

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-typescript-transformer'),
  },
  resolver: {
    sourceExts: ['tsx', 'ts', 'js', 'jsx', 'json'], // Add all extensions you're using
  },
};


