
import transImg from '@/utils/trans-img'
import compressImgToBase64 from '@/utils/compress-img'
import mixUploadImg from '@/mixins/uploadImg'
export default function () {
  return {
    mixins: [mixUploadImg],
    data () {
      return {
        fileList: [],
        imgUploadTimeout: 60000 // 图片上传超时限制
      }
    },
    created () {
    },
    methods: {
      // 图片上传准备
      beforeImageRead (files) {
        files = Array.isArray(files) ? files : [files]
        return new Promise((resolve, reject) => {
          const promiseFiles = files.map((item) => {
            return this.compressImg(item)
          })
          Promise.all(promiseFiles).then(res => {
            resolve(res)
          }).catch(e => {
            this.$toast('图片获取失败，请重新操作')
          }
          )
        })
      },
      // 图片上传回调-获取图片链接数组赋值表单对象
      async afterImageRead (file, key, cb = null) {
        const fileList = await this.uploadImageList()
        cb && cb(fileList, key)
      },
      // 图片删除回调-获取图片链接数组赋值表单对象
      async deleteImage (file, key, cb = null) {
        const fileList = await this.uploadImageList()
        cb && cb(fileList, key)
      },
      // 清空图片
      clearImgs () {
        this.fileList = []
      },
      // 设置图片上传组件默认值
      setImageUpload (list) {
        list.forEach(async (item, index) => {
          if (this.fileList[index]) {
            this.$set(this.fileList[index], 'url', item)
          } else {
            this.$set(this.fileList, index, { url: item })
          }
        })
      },
      // 图片批量压缩
      compressImg (file) {
        const dpr = 2
        const maxWidth = 375 * dpr
        const maxheight = 667 * dpr
        return new Promise((resolve, reject) => {
          compressImgToBase64(file, maxWidth, maxheight).then(data => {
            const blob = transImg.base64ToBlob(data)
            const transFile = transImg.blobToFile(blob, '')
            resolve(transFile)
          }).catch(e => {
            this.$toast('图片获取失败，请重新操作')
          })
        })
      },
      // 批量上传图片
      async uploadImageList () {
        const loaded = this.fileList.filter(v => v.url)
        const loadedLength = loaded.length
        const unLoaded = this.fileList.filter(v => !v.url)
        const fileList = unLoaded.map((item) => {
          return item.content.replace(/^data:.*base64,/, '')
        })
        const promiseList = fileList.map((item, index) => {
          return this.uploadImage(item, index + loadedLength)
        })
        try {
          // 保证fileList含url
          await Promise.all(promiseList)
        } catch (e) {
          this.fileList = []
          this.$toast(`图片上传失败: ${JSON.stringify(e)}`)
          return false
        }
        return this.fileList.map(item => {
          // 获取图片相对路径传给后端
          return this.$getRelativeUrl(item.url)
        })
      },
      // 上传图片(用于批量上传流程)
      uploadImage (files, index) {
        return this.uploadInnerImgPromise({
          files,
          scenes: this.$const.UPLOAD_SECRET_SCENE
        }, {
          timeout: this.imgUploadTimeout
        }, async (res, resolve, reject) => {
          // 图片上传成功
          const data = res.data
          const url = data.src
          if (url) {
            const absUrl = await this.$getAbsUrl({ url })
            this.$set(this.fileList[index], 'url', absUrl)
            resolve()
          } else {
            reject(new Error())
          }
        })
      }
    }
  }
}
