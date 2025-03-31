/**
 * fastdfs改造，获取下载链接
 */

import Axios from 'axios'
import cst from '@/assets/consts'
import { apiBase } from '@/api'

const postFileUrl = async (urlPath, apiPath, domain) => {
  const res = await Axios.create({
    timeout: 15000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }).post(apiPath, {
    protocol: 'https',
    urlPath,
    domain
  })
  if (res.data && res.data.retcode === '0') {
    return res.data.url
  }
  return ''
}

/**
 * 获取资源绝对路径
 * @param {String} url 资源路径
 * @param {String} apiPath 请求接口
 * @returns 资源绝对路径
 */
export const getAbsUrl = async ({ url, domain = cst.UPLOAD_INNER_DOMAIN, isSecret = 1, apiPath = cst.DOWNLOAD_INNER_FILE_URL }) => {
  if (!url) {
    return ''
  }
  if (url.startsWith('http')) {
    return url
  }
  let absUrl
  // secret场景，使用后端提供的接口
  if (isSecret) {
    const res = await apiBase.getAbsUrl({
      domain,
      relativeUrl: url
    })
    absUrl = res?.abs_url
  } else {
    absUrl = await postFileUrl(url, apiPath, domain)
  }

  return absUrl
}

// 获取资源相对路径
export const getRelativeUrl = (url) => {
  if (!url) {
    return ''
  }
  if (!url.startsWith('http')) {
    return url
  }
  return ('/' + url.split('/').slice(3).join('/')).split('?')[0]
}
