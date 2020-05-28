import Vue from 'vue';
import Router from 'vue-router';
import Docs from './docs';
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
                    path: '',
                    redirect: 'scroll-div'
                },
                ...Docs
            ]
        },
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