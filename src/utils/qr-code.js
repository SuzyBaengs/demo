
import QRCode from 'qrcode'

export const urlToQRCode = async (url) => {
  const imgQrBase64 = await QRCode.toDataURL(url, {
    margin: 0,
    scale: 1,
    width: 247 * Math.ceil(window.devicePixelRatio)
  })
  return imgQrBase64
}
