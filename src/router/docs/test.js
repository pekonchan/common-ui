// import Test from '@/docs/test.md';

const routes = [
    {
        path: '/test',
        component: r => require.ensure([], () => { r(require('@/docs/test.md')) }, 'docs')
    }
];

export default routes;