import { throttle } from '@/utils/tools'
export default function () {
  return {
    directives: {
      drag: {
        bind: function (el, binding, vnode) {
          el.ontouchstart = e => {
            e.stopPropagation()
            vnode.context.disablePull = true
            el.ontouchmove = throttle(e => {
              if (e.cancelable) e.preventDefault()
              // e.preventDefault()
              const maxY = document.body.clientHeight - 82
              let disY = e.changedTouches[0].clientY
              disY = disY > maxY ? maxY : (disY < 300) ? 300 : disY
              el.style.top = disY + 'px'
            }, 25)
            el.ontouchend = e => {
              el.ontouchmove = null
              el.ontouchend = null
              vnode.context.disablePull = false
            }
          }
        }
      }
    }
  }
}
