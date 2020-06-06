require('./index.scss');

const changeLoading = (el, binding) => {
    const width = el.clientWidth;
    const height = el.clientHeight;
    const mask = el.querySelector('.com-loading__mask');
    mask.style.cssText += `width: ${width}px; height: ${height}px`;
    mask.style.display = binding.value ? 'block': 'none';
}
export default {
    name: 'loading',
    bind (el) {
        const mask = document.createElement('div');
        const loading = document.createElement('div');
        el.style.position = 'relative';
        mask.className = 'com-loading__mask';
        loading.className = 'com-loading';
        loading.innerHTML = '<i class="com-loading__icon"></i>';
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