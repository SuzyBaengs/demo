import axios from 'axios'
import { Toast } from '@/components'
import AppBridge from '@/utils/app-bridge'
import { errReport } from '@/utils/report/index'

// axios默认配置
const AXIOS_DEFAULT_CONFIG = {
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
}

// 自定义上报类型
const type = ['puhui_request_succ', 'puhui_request_fail']

// 自定义参数
// 现有 options.system 系统参数
//     options.silent 是否静默报错
let options = {}

// 监控接口数据，输出日志到本地app，默认上报级别为2!  0表示“error”级别，1表示“warning”级别，2表示“info”级别 ，3表示“debug”级别
function interfaceMonitor (content, module, level = 2) {
  try {
    AppBridge.invokeJsBridge('outputLog', {
      level,
      module,
      content
    })
  } catch (e) {}
}

// 请求成功
function requestSuccess (request) {
  request.data = {
    system: options.system || {},
    data: request.data || {}
  }
  return request
}

// 请求失败
function requestFail (error) {
  Toast(`${error.message}(${error.config.url})`)
  return Promise.reject(error)
}

// 响应成功
function responseSuccess (response) {
  let { data: res } = response
  const system = res.system || {}
  // 响应成功时，记录到日志的参数
  const content = {
    url: response.config.url,
    param: response.config.data,
    retcode: res.result,
    retmsg: res.data || res.res_info,
    trace_id: system.trace_id || ''
  }

  // 未登录或登录已过期则跳到登录页（兼容4.0跳转登录页错误码的情况）
  if (+res.result === 19231000 || +res.data?.result === 19321226) {
    window.location.href = `//sales.tiqianle.com/res/entry/login.html?url=${encodeURIComponent(window.location.href)}`
    // return Promise.reject(res)
  }

  if (res.result === 0 && res.data) {
    res = res.data
    if (res.result === 0 || res.result === '0') {
      // 业务请求成功，输出到日志
      interfaceMonitor(content, type[0])
      return res.result_rows
    } else if (!options.silent) {
      responseError(response, res)
    }
  } else if (!options.silent) {
    responseError(response, res)
  }
  return Promise.reject(res)
}

function responseError (response, res) {
  try {
    const system = response.data.system || {}

    // 响应成功时，记录到日志的参数
    const content = {
      url: response.config.url,
      param: response.config.data,
      retcode: res.result,
      retmsg: res.res_info,
      trace_id: system.trace_id || ''
    }
    errReport(content, { trace_id: system.trace_id || '' })
    // 网关请求失败，输出到日志
    interfaceMonitor(content, type[1], 0)
    Toast(`[${res.result}] ${res.res_info || ''}`)
  } catch (e) {
    console.log(e)
  }
}

// 响应失败
function responseFail (error) {
  const config = error.config
  // 响应失败时，记录到日志的参数
  const content = {
    url: config.url,
    param: config.data
  }
  // 响应失败，输出到日志
  interfaceMonitor(content, type[1], 0)
  if (!options.silent) {
    Toast(`${error.message} in '${error.config.url}'`)
  }
  return Promise.reject(error)
}

// 注入请求和响应拦截
const axiosInstance = axios.create({ ...AXIOS_DEFAULT_CONFIG })
axiosInstance.interceptors.request.use(requestSuccess, requestFail)
axiosInstance.interceptors.response.use(responseSuccess, responseFail)

export default (opt = {}) => {
  options = opt
  return axiosInstance
}
