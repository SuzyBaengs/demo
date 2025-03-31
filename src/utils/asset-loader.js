/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-11-17 14:28:00
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2021-11-22 10:36:56
 */
// Function which returns a function: https://davidwalsh.name/javascript-functions
function _load (tag) {
  return function (url) {
    // This promise will be used by Promise.all to determine success or failure
    return new Promise(function (resolve, reject) {
      const element = document.createElement(tag)
      let parent = 'body'
      let attr = 'src'

      // Important success and error for the promise
      element.onload = function () {
        resolve(url)
      }
      element.onerror = function () {
        reject(url)
      }

      // Need to set different attributes depending on tag type
      switch (tag) {
        case 'script':
          element.async = true
          break
        case 'link':
          element.type = 'text/css'
          element.rel = 'stylesheet'
          attr = 'href'
          parent = 'head'
      }

      // Inject into document to kick off loading
      element[attr] = url
      document[parent].appendChild(element)
    })
  }
}

export default {
  css: _load('link'),
  js: _load('script')
}
