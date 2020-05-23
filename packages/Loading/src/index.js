require('./index.scss');
const mask = document.createElement('div');
const loading = document.createElement('div');
const changeLoading = (el, binding) => {
    const width = el.clientWidth;
    const height = el.clientHeight;
    if (binding.oldValue === 'undefined' || binding.value !== binding.oldValue) {
        mask.style.cssText += `width: ${width}px; height: ${height}px`;
        mask.style.display = binding.value ? 'block': 'none';
    }
}
export default {
    name: 'loading',
    bind (el) {
        el.style.position = 'relative';
        mask.className = 'com-loading-mask';
        loading.className = 'com-loading';
        loading.innerHTML = '<i class="com-icon-loading"></i>';
        mask.appendChild(loading);
        el.appendChild(mask);
    },
    inserted (el, binding) {
        changeLoading(el, binding)
    },
    componentUpdated (el, binding) {
        changeLoading(el, binding);
    }
};