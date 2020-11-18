module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
  settings: {
    jest: {
      version: 26,
    },
    'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
    'import/resolver': {
      typescript: './tsconfig.json',
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
