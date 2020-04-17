import ScrollNav from './ScrollNav';
import Avatar from './Avatar';
import ScrollDiv from './ScrollDiv';

const components = {
    ScrollNav,
    Avatar,
    ScrollDiv
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