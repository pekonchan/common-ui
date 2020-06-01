// import Test from '@/docs/test.md';

const routes = [
    {
        path: 'scroll-div',
        name: 'scrollDiv',
        // component: r => require.ensure([], () => { r(require('@/docs/test.md')) }, 'docs')
        component: () => import(/* webpackChunkName: 'docs' */ '@/docs/ScrollDiv.md')
        // component: Test
    },
    {
        path: 'scroll-nav',
        name: 'scrollNav',
        component: () => import(/* webpackChunkName: 'docs' */ '@/docs/ScrollNav.md')
    },
    {
        path: 'avatar',
        name: 'avatar',
        component: () => import(/* webpackChunkName: 'docs' */ '@/docs/Avatar.md')
    },
    {
        path: 'checkbox',
        name: 'checkbox',
        component: () => import(/* webpackChunkName: 'docs' */ '@/docs/Checkbox.md')
    },
    {
        path: 'popper',
        name: 'popper',
        component: () => import(/* webpackChunkName: 'docs' */ '@/docs/Popper.md')
    }
];

export default routes;