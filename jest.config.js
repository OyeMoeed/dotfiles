module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!(@react-native|react-native|react-native-size-matters)/)'],
  setupFilesAfterEnv: ['./__mocks__/setup-file.ts']
};
