module.exports = {
  plugins: {
    'postcss-preset-env': {},
    cssnano: {},
    'postcss-pxtorem': {
      rootValue: 12,
      unitPrecision: 5,
      propList: ['*'],
      mediaQuery: false,
      selectorBlackList: [/^html$/, /^body$/],
      minPixelValue: 1
    }
  }
}
