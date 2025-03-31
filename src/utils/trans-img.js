function base64ToBlob (base64) {
  const arr = base64.split(',')
  const type = arr[0].match(/:(.*?);/)[1]
  // atob用于解码base64编码的字符串
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type })
}
function blobToFile (blob, fileName) {
  const file = new File([blob], fileName, { type: blob.type })
  return file
}

export default {
  base64ToBlob,
  blobToFile
}
