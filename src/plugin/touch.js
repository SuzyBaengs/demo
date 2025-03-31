/*
 * @Descripttion:
 * @Author: yatwah.fung
 * @Date: 2021-10-20 16:41:45
 * @LastEditors: yatwah.fung
 * @LastEditTime: 2021-10-20 17:58:35
 */
// type 支持： longtap、tap、swipe、swiperight、swipeleft、swipedown、swipeup
export default class VueTouch {
  constructor (el, binding, type) {
    const _this = this
    this.obj = el
    this.binding = binding
    this.touchType = type
    this.vueTouches = {
      x: 0,
      y: 0
    }
    this.vueMoves = true
    this.vueLeave = true
    this.longTouch = true

    this.vueCallBack = typeof (binding.value) === 'function' ? binding.value : () => {}

    this.obj.addEventListener('touchstart', function (e) {
      _this.start(e)
    }, false)

    this.obj.addEventListener('touchmove', function (e) {
      _this.move(e)
    }, false)

    this.obj.addEventListener('touchend', function (e) {
      _this.end(e)
    }, false)
  };

  start (e) {
    e.preventDefault() // 长按时阻止默认菜单，IOS还需要 -webkit-touch-callout: none; 来禁用默认菜单
    this.vueMoves = true
    this.vueLeave = true
    this.longTouch = true
    this.vueTouches = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    }
    this.time = setTimeout(function () {
      if (this.vueLeave && this.vueMoves) {
        this.touchType === 'longtap' && this.vueCallBack(this.binding.value, e)
        this.longTouch = false
      };
    }.bind(this), 1000)
  };

  end (e) {
    const disX = e.changedTouches[0].pageX - this.vueTouches.x
    const disY = e.changedTouches[0].pageY - this.vueTouches.y
    clearTimeout(this.time)
    if (Math.abs(disX) > 10 || Math.abs(disY) > 100) {
      this.touchType === 'swipe' && this.vueCallBack(this.binding.value, e)
      if (Math.abs(disX) > Math.abs(disY)) {
        if (disX > 10) {
          this.touchType === 'swiperight' && this.vueCallBack(this.binding.value, e)
        };
        if (disX < -10) {
          this.touchType === 'swipeleft' && this.vueCallBack(this.binding.value, e)
        };
      } else {
        if (disY > 10) {
          this.touchType === 'swipedown' && this.vueCallBack(this.binding.value, e)
        };
        if (disY < -10) {
          this.touchType === 'swipeup' && this.vueCallBack(this.binding.value, e)
        };
      };
    } else {
      if (this.longTouch && this.vueMoves) {
        this.touchType === 'tap' && this.vueCallBack(this.binding.value, e)
        this.vueLeave = false
      };
    };
  }

  move (e) {
    this.vueMoves = false
  }
};
