import Vue from 'vue';
import Router from 'vue-router';
import Test from './docs/test';
import ScrollDiv from '../demo/ScrollDiv.vue';
import Main from '@/view/main';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/main',
            component: Main,
            children: [
                {
                    path: 'scroll-div',
                    component: ScrollDiv
                }
            ]
        },
        ...Test,
        { // 当任何都不匹配时，返回到首页
            path: '*',
            redirect: '/main'
        }
    ],
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
});

export default router;