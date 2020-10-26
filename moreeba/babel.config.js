module.exports = (babelConfig) => {
  const plugins = [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '&app': './app',
          '&store': './app/store',
          '&styled': './app/components/styled',
          '&config': './app/config',
          '&containers': './app/containers',
          '&components': './app/components',
          '&assets': './app/assets',
          '&utils': './app/utils',
          '&api': './app/api',
          '&hooks': './app/hooks',
          '&realm': './app/realm/realmDao.ts',
          '&features': './app/features',
          '&locales': './app/locales',
        },
      },
    ],
  ];

  if (babelConfig.env() !== 'development') {
    plugins.push(['transform-remove-console']);
  }

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
  };
};
