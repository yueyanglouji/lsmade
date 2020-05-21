export const LsTitle = {
  install (Vue) {
    let setWechatTitle = function (title, img, stateObj) {
      if (title === undefined || window.document.title === title) {
        return
      }
      document.title = title
      alert(stateObj)
      alert(stateObj.title)
      if(stateObj){
        stateObj.title = title
      }
      let mobile = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(mobile)) {
        let iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        // 替换成站标favicon路径或者任意存在的较小的图片即可
        iframe.setAttribute('src', img || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')
        let iframeCallback = function () {
          setTimeout(function () {
            iframe.removeEventListener('load', iframeCallback)
            document.body.removeChild(iframe)
          }, 0)
        }
        iframe.addEventListener('load', iframeCallback)
        document.body.appendChild(iframe)
      }
    }
    Vue.directive('wechat-title', function (el, binding) {
      setWechatTitle(binding.value, el.getAttribute('img-set') || null, el.getAttribute('save-to-store').value()||null)
    })
  }
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  window.vue.use(LsTitle);
}

export default LsTitle;