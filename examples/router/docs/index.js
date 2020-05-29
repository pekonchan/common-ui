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
        path: 'gstest',
        name: 'gstest',
        component: () => import(/* webpackChunkName: 'docs' */ '@/docs/gstest.md')
    }
];

export default routes;