module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'dot-notation': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
  ignorePatterns: ['**/test/*.ts', '*.js'],
};
