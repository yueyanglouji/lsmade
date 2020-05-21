import Vue, {PluginObject} from 'vue'
import './src/v4.0/styles/dist/theme-pc.min.css'
import './src/v4.0/styles/cssframework/ls/vue/dateFormat'
import './src/v4.0/styles/cssframework/ls/vue/download'
import './src/v4.0/styles/cssframework/ls/vue/extends'
export * from './src/v4.0/styles/cssframework/ls/vue/buttons'

interface Lsmade{
    install(vue: typeof Vue): void
}

export const lsmade : PluginObject<Lsmade>
export default lsmade