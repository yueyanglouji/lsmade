import LsButtons from './src/Buttons';

/* istanbul ignore next */
LsButtons.install = function(Vue) {
    Vue.component(LsButtons.name, LsButtons);
};

export default LsButtons;