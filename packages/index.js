import ScrollNav from './ScrollNav';
import Avatar from './Avatar';
import ScrollDiv from './ScrollDiv';
import Checkbox from './Checkbox';
import Popper from './Popper';
import Loading from './Loading';
import Tooltip from './Tooltip';
import Zoom from './Zoom';

const components = {
    ScrollNav,
    Avatar,
    ScrollDiv,
    Checkbox,
    Popper,
    Loading,
    Tooltip,
    Zoom
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