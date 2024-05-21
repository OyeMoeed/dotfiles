module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  setupFilesAfterEnv: ['./__mocks__/setup-file.ts', './__mocks__/react-native-size-matters.ts']
  // transformIgnorePatterns: [
  //   'node_modules/(?!(@react-native|react-native|react-native-reanimated|@gorhom/bottom-sheet)/)'
  // ],
  // moduleNameMapper: {
  //   '\\.(css|less)$': 'identity-obj-proxy'
  // }
};
