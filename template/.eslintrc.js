module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-native', '@typescript-eslint'],
  env: {
    'react-native/react-native': true,
    jest: true,
  },
  extends: [
    'plugin:react-native/all',
    'plugin:react/recommended',
    'eslint:recommended',
    '@react-native-community',
  ],
  rules: {
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 1,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': [1, { skip: ['PrimaryLabel', 'ErrorLabel'] }],
    'react-hooks/exhaustive-deps': 0,
  },
};
