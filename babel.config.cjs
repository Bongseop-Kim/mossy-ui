module.exports = function (api) {
  api.cache(true);

  return {
    plugins: [
      [
        'babel-plugin-react-compiler',
        {
          panicThreshold: 'none',
          target: '19',
        },
      ],
      [
        '@babel/plugin-transform-typescript',
        {
          allExtensions: true,
          isTSX: true,
        },
      ],
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
        },
      ],
    ],
  };
};
