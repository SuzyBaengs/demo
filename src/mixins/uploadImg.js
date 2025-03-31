
import Axios from 'axios'
import qs from 'qs'
import { getCookie } from '@/utils/tools'

export default {
  methods: {
    uploadInnerImgPromise (options, createParams, thenCb) {
      const session = getCookie('session')
      return new Promise((resolve, reject) => {
        const params = qs.stringify(options)
        Axios.create({
          withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Auth-Cookie': `session=${session}`
          },
          ...createParams
        }).post(this.$const.UPLOAD_INNER_FILE_URL, params).then(res => {
          thenCb(res, resolve, reject)
        }, () => {
          // 图片上传失败处理
          reject(new Error())
        })
      })
    },
    uploadInnerImg (options, createParams, thenCb, rejectCb) {
      const params = qs.stringify(options)
      const session = getCookie('session')
      Axios.create({
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Auth-Cookie': `session=${session}`
        },
        ...createParams
      }).post(this.$const.UPLOAD_INNER_FILE_URL, params).then(res => {
        thenCb(res)
      }, () => {
        rejectCb()
      })
    }
  }
}
