class Url {
  /**
   * [将URL中的参数解析为对象]
   * @method parse
   * @param  {[String]} url 解析的URL字符串[可选]
   * @return {[Object]}
   */
  static parse (urlStr) {
    const re = /[?&]([^?&=]+)=([^&]+)/g
    let matcher = null
    const items = {}
    urlStr = urlStr || window.location.search
    while ((matcher = re.exec(urlStr)) !== null) {
      items[matcher[1]] = decodeURIComponent(matcher[2])
    }

    return items
  }

  /**
   * [获取URL中指定参数值]
   * @method get
   * @param  {string} name 指定参数名[必选]
   * @param  {[String]} url  指定URL，可靠默认为当前URL[可选]
   * @return {[String]} 返回指定参数名值
   */
  static get (name, url = location.href) {
    const o = this.parse(url)
    return (o[name]) ? o[name] : ''
  }

  /**
   * [生成拼接的URL链接]
   * @method get
   * @param  {[String]} href 指定链接[必选]
   * @param  {[Obj]} params  指定URL后面参数，可靠默认为当前URL[可选]
   * @return {[String]} 返回拼接完成的url
   * Url.concat('www.fenqile.com', {'a': 'b', 'c': 'd'})
   * return www.fenqile.com?a=b&c=d
   */
  static concat (href, params) {
    let url = ''
    if (href.indexOf('?') < 0) {
      url = url.concat(href, '?')
    } else {
      url = url.concat(href, '&')
    }
    for (const key in params) {
      url = url.concat(key, '=', encodeURIComponent(params[key]), '&')
    }
    url = url.substr(0, url.length - 1)
    return url
  }
}
export default Url
