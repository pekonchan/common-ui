import Section from './src';

Section.install = (Vue) => {
    Vue.component(Section.name, Section);
};

if (window && window.Vue) {
    Section.install(window.Vue);
}

export default Section