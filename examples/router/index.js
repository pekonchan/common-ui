import Vue from 'vue';
import Router from 'vue-router';
import Test from './docs/test';
import ScrollDiv from '../demo/ScrollDiv.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/main',
            component: ScrollDiv
        },
        ...Test,
        { // 当任何都不匹配时，返回到首页
            path: '*',
            redirect: '/first'
        }
    ]
});

export default router;