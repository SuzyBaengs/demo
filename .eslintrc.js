/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-01-06 12:11:13
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2021-08-02 16:03:54
 */
// 其他配置参见
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },

  extends: [
    'standard',
    // https://github.com/vuejs/eslint-plugin-vue
    'plugin:vue/recommended'
  ],

  // add your custom rules here
  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/script-setup-uses-vars': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow use v-html
    'vue/no-v-html': 'off'
  }
}
