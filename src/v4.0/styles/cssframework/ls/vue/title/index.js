import LsTitle from './src/Title';

/* istanbul ignore next */
LsTitle.install = function(Vue) {
    Vue.component(LsTitle.name, LsTitle);
};

export default LsTitle;