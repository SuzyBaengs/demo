import axios from './axios'

export default class Generator {
  constructor (list) {
    this.api = {}
    this.singleGenerator(list)
    return this.api
  }

  // 遍历单个模块内部的所有接口，定义在模块上，如this.api.auth.isLogin()
  // 使用Object.defineProperty，可以在后期扩展一些功能，如接口访问统计等
  singleGenerator (apiConfig) {
    Object.keys(apiConfig).forEach(apiName => {
      Object.defineProperty(this.api, `${apiName}`, {
        value (data, options = {}) {
          if (Object.keys(options).length === 0) {
            return axios(options).post(apiConfig[apiName], data)
          } else {
            const config = _normoalize(data, options)
            config.url = apiConfig[apiName]
            return axios(options)(config)
          }
        }
      })
    })
  }
}

function _normoalize (data, options) {
  options.method = options.method || 'post'
  const method = options.method.toUpperCase()
  if (method === 'POST') {
    options.data = data
  } else if (method === 'GET') {
    options.params = data
  }
  return options
}
