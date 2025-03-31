/**
 * 轮询工具函数
 * @param {Object} param
 * @param {Number} [param.max = 10] 最大轮询次数
 * @param {Function} param.runCallback 运行时回调
 * @param {Function} [param.timeOutCallback = () => {}] 超时回调
 * @param {Number} [param.speed = 1000] 轮询速度
 */
export async function polling ({ max = 10, runCallback, timeOutCallback = () => {}, speed = 1000 }) {
  let state
  for (let i = 0; i < max; i++) {
    const res = await runCallback()
    switch (res) {
      case false:
        state = 'done' // 完成状态
        break
      case true:
        state = 'goon' // 继续状态
        break
      default:
        state = res // 自定义状态
    }
    if (state !== 'goon') return state
    await new Promise((resolve) => setTimeout(() => { resolve() }, speed))
  }
  await timeOutCallback()
  return 'timeout' // 超时状态
}
