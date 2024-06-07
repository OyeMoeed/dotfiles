module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
  ],

  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['.eslintrc.{js,cjs}', '**/__tests__/**/*.ts'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'implicit-arrow-linebreak': ['error', 'beside'],
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['function', 'enum'],
        format: ['camelCase'],
      },
    ],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    // Rules extracted from the document
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'no-nested-ternary': 'error',
    'no-undef': 'error',
    'max-lines-per-function': ['error', { max: 120 }],
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    // Ensure ESLint and Prettier play nice together
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'comma-dangle': [2, 'always-multiline'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        // use a glob pattern
        project: './tsconfig.json',
      },
    },
  },
};
