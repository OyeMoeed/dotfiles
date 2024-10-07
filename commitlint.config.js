/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['chore', 'feat', 'fix', 'perf', 'build', 'refactor', 'style', 'merge']],
    'body-max-length': [2, 'always', 100],
    'subject-empty': [2, 'never'],
    'subject-min-length': [2, 'always', 1],
    'subject-max-length': [2, 'always', 100],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-min-length': [2, 'always', 1],
    'type-max-length': [2, 'always', 20],
    'header-min-length': [2, 'always', 1],
    'header-max-length': [2, 'always', 100],
  },
  defaultIgnores: true,
};
