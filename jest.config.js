module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-size-matters|react-native-wheel-pick|react-native-calendars|react-native-swipe-gestures|@react-native-community|react-native-reanimated|react-native-webview)|react-native-masked-view/masked-view/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./__mocks__/setup-file.ts', './__mocks__/react-native-size-matters.ts'],
  moduleNameMapper: {
    '^react-native-device-info$': './__mocks__/react-native-device-info.ts',
    '^react-native-config$': './__mocks__/react-native-config.ts',
  },
};
