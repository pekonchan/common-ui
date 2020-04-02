import Section from './src/index3.vue';

Section.install = (Vue) => {
    Vue.component(Section.name, Section);
};

if (window && window.Vue) {
    Section.install(window.Vue);
}

export default Section