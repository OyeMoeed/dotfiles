module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    '@react-native-community',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}', '**/__tests__/**/*.ts'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jest'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    // Rules extracted from the document
    'max-len': ['error', { code: 100 }],
    'no-nested-ternary': 'error',
    camelcase: ['error', { properties: 'always' }],
    'no-undef': 'error',
    'max-lines-per-function': ['error', { max: 50 }],
    'sort-imports': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    // Ensure ESLint and Prettier play nice together
    'prettier/prettier': ['error', { endOfLine: 'auto' }]
  }
}
