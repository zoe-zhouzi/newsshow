import Vue from 'vue'

import VueRouter from 'vue-router';

import UpdatingNews from '@/components/UpdatingNews'
import PassedNews from '@/components/PassedNews'

Vue.use(VueRouter);

// 改写push方法，重复跳转会报错
let orginPush = VueRouter.prototype.push;

VueRouter.prototype.push = function(location, resolve, reject) {
    if(resolve && reject) {
        orginPush.call(this, location, resolve, reject);
    } else {
        orginPush.call(this, location, () => {}, () => {});
    }
}


export default new VueRouter({
    mode: 'history',
    routes: [
        {
            // path: '/realtime/:type?',
            path: '/realtime',
            component: UpdatingNews,
            meta: {isShowLeft: true}
        },
        {
            path: '/passednews/:date',
            name: 'passednews',
            component: PassedNews,
            meta: {isShowLeft: false}
        },
        {
            path: '/*',
            redirect: '/realtime'
        }
    ],
})

