const install = (component) => {
    component.install = Vue => {
        Vue.component(component.name, component);
    };
    
    if (window && window.Vue) {
        component.install(window.Vue);
    }
}

export default install