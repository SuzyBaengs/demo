import { ReportV2 } from '@/utils/report/lib/report_v2'
import AppBridge from '@/utils/app-bridge'
// import { errReport } from '@/utils/report/index'
import { Loading } from '@/components'
// 自定义上报类型
const type = 'puhui_error'
// 重点业务
const KEY_BUSI_ROUTE_CODE_LIST = []

// 监控前端异常，输出日志到本地App。默认日志级别为0. 0表示“error”级别，1表示“warning”级别，2表示“info”级别 ，3表示“debug”级别
function errMonitor (content, module, level = 0) {
  try {
    AppBridge.invokeJsBridge('outputLog', {
      level,
      module,
      content
    })
  } catch (e) {}
}

// 压缩堆栈信息
const compressStack = (stack) => {
  return stack
    .replace(/\n/gi, '') // \n变成空字符串
    .split(/\bat\b/) // 按文件切分成数组
    .slice(0, 5) // 取前5个数组
    .join('\n') // 连接成换行字符串
    .substring(0, 200) // 只取前200个字符
}

// 根据重点业务改变上报编码和流程标识
const changeCodeAct = (href, defaultData) => {
  for (let i = 0, len = KEY_BUSI_ROUTE_CODE_LIST.length; i < len; i++) {
    if (Array.isArray(KEY_BUSI_ROUTE_CODE_LIST[i].routes) &&
      KEY_BUSI_ROUTE_CODE_LIST[i].routes.length) {
      const existFlag = KEY_BUSI_ROUTE_CODE_LIST[i].routes.find(item => href.indexOf(item) > -1)
      // href存在于重点业务路由中
      if (existFlag) {
        return {
          code: KEY_BUSI_ROUTE_CODE_LIST[i].code,
          action: KEY_BUSI_ROUTE_CODE_LIST[i].action
        }
      }
    }
  }
  return defaultData
}

export default function errorHandler (w, v, errHandler = ReportV2) {
  // vue异常处理
  v.config.errorHandler = function (err, vm, info) {
    console.log('捕获到vue errorHandler异常：', err)
    const href = location.href
    const newParams = changeCodeAct(href, {
      code: '916120001',
      action: 'vue-error'
    })
    errHandler({
      ...newParams,
      msg: `'${err.message}' CAUGHT IN ${info}`,
      file: (vm && vm.$vnode && vm.$vnode.tag) || '', // 报错组件
      attach2: err && err.stack ? compressStack(err.stack) : ''
    })
    errMonitor(err.message, type)
  }
  // 普通js错误
  w.onerror = function (message, source, lineno, colno, error) {
    console.log('捕获到js onerror异常：', { message, source, lineno, colno, error })
    const href = location.href
    const newParams = changeCodeAct(href, {
      code: '916120002',
      action: 'js-error'
    })
    errHandler({
      ...newParams,
      msg: message,
      line: lineno,
      file: source,
      attach2: error && error.stack ? compressStack(error.stack) : ''
    })
    errMonitor(message, type)
  }
  // 未捕获的promise异常
  w.addEventListener('unhandledrejection', function (e) {
    e.preventDefault()
    Loading(false)
    console.log('捕获到unhandledrejection异常：', e)
    const href = location.href
    const newParams = changeCodeAct(href, {
      code: '916120003',
      action: 'promise-error'
    })
    const _data = {
      ...newParams,
      msg: (e.reason && e.reason.message) || e.reason,
      attach2: ''
    }
    if (e.reason && e.reason.stack) {
      _data.attach2 = compressStack(e.reason.stack)
      errHandler(_data)
      errMonitor(e.reason.stack, type)
    } else {
      errHandler(_data)
      errMonitor(JSON.stringify(e.reason), type)
    }

    return true
  })
  // 资源加载异常
  w.addEventListener('error', (errorEvent) => {
    // 这里只做资源加载异常的捕获，避免和onerror的重复捕获
    if (errorEvent.target && errorEvent.target.currentSrc) {
      console.log('捕获到资源加载异常：', errorEvent)
      const href = location.href
      const newParams = changeCodeAct(href, {
        code: '916120004',
        action: 'source-error'
      })
      errHandler({
        ...newParams,
        msg: `[url exception]-${errorEvent.target.currentSrc}`
      })
      errMonitor(`[url exception]-${errorEvent.target.currentSrc}`, type)
    }
  }, true)
}
