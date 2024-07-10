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
    'plugin:react-native/all',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier', 'react-native'],
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
    'no-unused-vars': 'error',
    'implicit-arrow-linebreak': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-empty-function': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['function'],
        format: ['camelCase'],
      },
      {
        selector: ['variable'],
        suffix: ['Screen'],
        format: ['PascalCase'],
        filter: {
          regex: '[A-Za-z]+(Screen)',
          match: true,
        },
      },
      {
        selector: ['variable'],
        prefix: ['IPay'],
        format: ['PascalCase'],
        filter: {
          regex: '(IPay)[A-Za-z]+',
          match: true,
        }
      },
      {
        selector: ['variable'],
        format: ['camelCase', 'UPPER_CASE'],
        filter: {
          regex: '(MainNavigation|Tab|TabNavigation)',
          match: false,
        }
      },
      {
        selector: ['objectLiteralProperty'],
        format: ['camelCase', 'snake_case', 'UPPER_CASE'],
      },
      {
        selector: ['objectLiteralMethod'],
        format: ['camelCase', 'snake_case'],
      },
      {
        selector: ['enum'],
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    'react/no-array-index-key': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/no-unused-prop-types': 'error',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 'off',
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'no-nested-ternary': 'error',
    'no-undef': 'error',
    'max-lines-per-function': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'comma-dangle': ['error', 'always-multiline'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.tsx'] }],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
