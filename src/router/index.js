import Vue from 'vue';
import Router from 'vue-router';
import Test from './docs/test';
import Index from '../examples/ScrollNav.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/first'
        },
        {
            path: '/first',
            component: Index
        },
        ...Test,
        { // 当任何都不匹配时，返回到首页
            path: '*',
            redirect: '/first'
        }
    ]
});

export default router;