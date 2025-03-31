/* eslint-disable */
export default {
  directives: {
    inview: {
      bind: function(el, binding, vnode) {
        el.onfocus = () => {
          setTimeout(() => {
            // el.scrollIntoView(false)
            document.body.scrollTop = document.body.scrollHeight
            // console.log('scrollIntoView')
          }, 500)
        }
      },
      unbind: function(el, binding, vnode) {
        el.onfocus = null
      }
    }
  }
}
