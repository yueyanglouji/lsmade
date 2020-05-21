import { dateFormat } from './src/v4.0/styles/cssframework/ls/vue/dateFormat'
import { download } from './src/v4.0/styles/cssframework/ls/vue/download'
import { lsExtends } from './src/v4.0/styles/cssframework/ls/vue/extends'
import Buttons from './src/v4.0/styles/cssframework/ls/vue/buttons'
import Title from './src/v4.0/styles/cssframework/ls/vue/title'

import './src/v4.0/styles/dist/theme-pc.min.css'

const lsmade = {
    install : function (Vue) {

        lsExtends();

        Vue.prototype.$dateFormat = function (date, format) {

            return dateFormat(date, format);
        }

        Vue.prototype.$download = function (url, param, filename){
            return download(url, param, filename)
        }

        Buttons.install(Vue)
        Title.install(Vue)

    }
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    window.vue.use(lsmade);
}

export default lsmade;