/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
/* jslint browser: true */
/* global XDomainRequest, MutationObserver, window */
import icons from '@/assets/icons/svg/icons.svg'
(function () {
  'use strict'
  if (typeof window !== 'undefined' && window.addEventListener) {
    const cache = Object.create(null) // holds xhr objects to prevent multiple requests
    let checkUseElems = null
    let tid // timeout id
    const debouncedCheck = function () {
      clearTimeout(tid)
      tid = setTimeout(checkUseElems, 100)
    }
    let unobserveChanges = function () {

    }
    const observeChanges = function () {
      let observer
      window.addEventListener('resize', debouncedCheck, false)
      window.addEventListener('orientationchange', debouncedCheck, false)
      if (window.MutationObserver) {
        observer = new MutationObserver(debouncedCheck)
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
          attributes: true
        })
        unobserveChanges = function () {
          try {
            observer.disconnect()
            window.removeEventListener('resize', debouncedCheck, false)
            window.removeEventListener('orientationchange', debouncedCheck, false)
          } catch (ignore) {}
        }
      } else {
        document.documentElement.addEventListener('DOMSubtreeModified', debouncedCheck, false)
        unobserveChanges = function () {
          document.documentElement.removeEventListener('DOMSubtreeModified', debouncedCheck, false)
          window.removeEventListener('resize', debouncedCheck, false)
          window.removeEventListener('orientationchange', debouncedCheck, false)
        }
      }
    }
    const createRequest = function (url) {
      // In IE 9, cross origin requests can only be sent using XDomainRequest.
      // XDomainRequest would fail if CORS headers are not set.
      // Therefore, XDomainRequest should only be used with cross origin requests.
      function getOrigin (loc) {
        let a
        if (loc.protocol !== undefined) {
          a = loc
        } else {
          a = document.createElement('a')
          a.href = loc
        }
        return a.protocol.replace(/:/g, '') + a.host
      }
      let Request
      let origin
      let origin2
      if (window.XMLHttpRequest) {
        Request = new XMLHttpRequest()
        origin = getOrigin(location)
        origin2 = getOrigin(url)
        if (Request.withCredentials === undefined && origin2 !== '' && origin2 !== origin) {
          Request = XDomainRequest || undefined
        } else {
          Request = XMLHttpRequest
        }
      }
      return Request
    }
    const xlinkNS = 'http://www.w3.org/1999/xlink'
    checkUseElems = function () {
      let base
      let bcr
      const fallback = icons // optional fallback URL in case no base path to SVG file was given and no symbol definition was found.
      let hash
      let href
      let i
      let inProgressCount = 0
      let isHidden
      let Request
      let url
      let uses
      let xhr
      function observeIfDone () {
        // If done with making changes, start watching for chagnes in DOM again
        inProgressCount -= 1
        if (inProgressCount === 0) { // if all xhrs were resolved
          unobserveChanges() // make sure to remove old handlers
          observeChanges() // watch for changes to DOM
        }
      }
      function attrUpdateFunc (spec) {
        return function () {
          if (cache[spec.base] !== true) {
            spec.useEl.setAttributeNS(xlinkNS, 'xlink:href', '#' + spec.hash)
            if (spec.useEl.hasAttribute('href')) {
              spec.useEl.setAttribute('href', '#' + spec.hash)
            }
          }
        }
      }
      function onloadFunc (xhr) {
        return function () {
          const body = document.body
          const x = document.createElement('x')
          let svg = null
          xhr.onload = null
          x.innerHTML = xhr.responseText
          svg = x.getElementsByTagName('svg')[0]
          if (svg) {
            svg.setAttribute('aria-hidden', 'true')
            svg.style.position = 'absolute'
            svg.style.width = 0
            svg.style.height = 0
            svg.style.overflow = 'hidden'
            body.insertBefore(svg, body.firstChild)
          }
          observeIfDone()
        }
      }
      function onErrorTimeout (xhr) {
        return function () {
          xhr.onerror = null
          xhr.ontimeout = null
          observeIfDone()
        }
      }
      unobserveChanges() // stop watching for changes to DOM
      // find all use elements
      uses = document.getElementsByTagName('use')
      for (i = 0; i < uses.length; i += 1) {
        try {
          bcr = uses[i].getBoundingClientRect()
        } catch (ignore) {
          // failed to get bounding rectangle of the use element
          bcr = false
        }
        href = uses[i].getAttribute('href') ||
                        uses[i].getAttributeNS(xlinkNS, 'href') ||
                        uses[i].getAttribute('xlink:href')
        if (href && href.split) {
          url = href.split('#')
        } else {
          url = ['', '']
        }
        base = url[0]
        hash = url[1]
        isHidden = bcr && bcr.left === 0 && bcr.right === 0 && bcr.top === 0 && bcr.bottom === 0
        if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
          // the use element is empty
          // if there is a reference to an external SVG, try to fetch it
          // use the optional fallback URL if there is no reference to an external SVG
          if (fallback && !base.length && hash && !document.getElementById(hash)) {
            base = fallback
          }
          if (uses[i].hasAttribute('href')) {
            uses[i].setAttributeNS(xlinkNS, 'xlink:href', href)
          }
          if (base.length) {
            // schedule updating xlink:href
            xhr = cache[base]
            if (xhr !== true) {
              // true signifies that prepending the SVG was not required
              setTimeout(attrUpdateFunc({
                useEl: uses[i],
                base: base,
                hash: hash
              }), 0)
            }
            if (xhr === undefined) {
              Request = createRequest(base)
              if (Request !== undefined) {
                xhr = new Request()
                cache[base] = xhr
                xhr.onload = onloadFunc(xhr)
                xhr.onerror = onErrorTimeout(xhr)
                xhr.ontimeout = onErrorTimeout(xhr)
                xhr.open('GET', base)
                xhr.send()
                inProgressCount += 1
              }
            }
          }
        } else {
          if (!isHidden) {
            if (cache[base] === undefined) {
              // remember this URL if the use element was not empty and no request was sent
              cache[base] = true
            } else if (cache[base].onload) {
              // if it turns out that prepending the SVG is not necessary,
              // abort the in-progress xhr.
              cache[base].abort()
              delete cache[base].onload
              cache[base] = true
            }
          } else if (base.length && cache[base]) {
            setTimeout(attrUpdateFunc({
              useEl: uses[i],
              base: base,
              hash: hash
            }), 0)
          }
        }
      }
      uses = ''
      inProgressCount += 1
      observeIfDone()
    }
    let winLoad = null
    winLoad = function () {
      window.removeEventListener('load', winLoad, false) // to prevent memory leaks
      tid = setTimeout(checkUseElems, 0)
    }
    if (document.readyState !== 'complete') {
      // The load event fires when all resources have finished loading, which allows detecting whether SVG use elements are empty.
      window.addEventListener('load', winLoad, false)
    } else {
      // No need to add a listener if the document is already loaded, initialize immediately.
      winLoad()
    }
  }
}())
