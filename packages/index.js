import ScrollNav from './ScrollNav';
import Avatar from './Avatar';
import ScrollDiv from './ScrollDiv';
import Checkbox from './Checkbox';
import Popper from './Popper';

const components = {
    ScrollNav,
    Avatar,
    ScrollDiv,
    Checkbox,
    Popper
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