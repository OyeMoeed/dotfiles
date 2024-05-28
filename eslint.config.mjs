import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';

import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({ baseDirectory: dirname, recommendedConfig: pluginJs.configs.recommended });

export default [
  { languageOptions: { globals: globals.browser } },
  ...compat.extends('standard-with-typescript'),
  pluginReactConfig,
];
