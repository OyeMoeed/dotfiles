const path = require('path')
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const { generate } = require('@storybook/react-native/scripts/generate')

generate({
  configPath: path.resolve(__dirname, './.storybook')
})

const defaultConfig = getDefaultConfig(__dirname)
const { resolver: { sourceExts, assetExts } } = defaultConfig

/**
 * Metro configuration
 * https://reactnative.dev/docs/met
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    experimentalImportSupport: true,
    unstable_allowRequireContext: true
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg', 'jsx', 'js', 'ts', 'tsx', 'mjs', 'json']
  },
  watchFolders: [path.resolve(__dirname, '../')]
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
