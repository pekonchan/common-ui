import Vue from 'vue';
import directive from './src';

directive.install = () => {
    Vue.directive(directive.name, directive);
}

if (window && window.Vue) {
    directive.install(window.Vue);
}

export default directive;