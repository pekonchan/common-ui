import ScrollNav from './ScrollNav';
import Avatar from './Avatar';

const components = {
    ScrollNav,
    Avatar
}

const install = () => {
    for (const key in components) {
        if (components.hasOwnProporty(key)) {
            components[key].install();
        }
    }
}

export default {
    install,
    ...components
}