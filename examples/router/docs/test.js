// import Test from '@/docs/test.md';

const routes = [
    {
        path: '/test',
        component: r => require.ensure([], () => { r(require('@/docs/test.md')) }, 'docs')
        // component: () => import(/* webpackChunkName: 'docs' */ '@/docs/test.md')
        // component: Test
    }
];

export default routes;