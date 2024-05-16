module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  setupFilesAfterEnv: ['./__mocks__/setup-file.ts']
};
