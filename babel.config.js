const { replace } = require('core-js/fn/symbol')

module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not dead',
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false,
      },
    ],
    ['@babel/preset-react'],
  ]

  const plugins = [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {},
      },
    ],
  ]

  return {
    presets,
    plugins,
  }
}
