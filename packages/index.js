import ScrollNav from './ScrollNav';
import Avatar from './Avatar';
import ScrollDiv from './ScrollDiv';

const components = {
    ScrollNav,
    Avatar,
    ScrollDiv
}

const install = (Vue) => {
    for (const key in components) {
        if (Object.prototype.hasOwnProperty.call(components, key)) {
            components[key].install(Vue);
        }
    }
}

export default {
    install,
    ...components
}