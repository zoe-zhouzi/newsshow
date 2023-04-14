import Vue from 'vue'

import VueRouter from 'vue-router';

import UpdatingNews from '@/modules/UpdatingNews'
import PassedNews from '@/modules/PassedNews'
import TenNews from '@/modules/TenNews'
import SohuSearch from '@/modules/SohuSearch'

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
            path: '/tennews',
            component: TenNews,
            meta: {
                isShowLeft: false,
                isShowRight: false,
            }
        },
        {
            // path: '/realtime/:type?',
            path: '/realtime',
            component: UpdatingNews,
            meta: {
                isShowLeft: true,
                isShowRight: true,
            }
        },
        {
            path: '/passednews/:date',
            name: 'passednews',
            component: PassedNews,
            meta: {
                isShowLeft: false,
                isShowRight: true,
            }
        },
        {
            path: '/sohusearch',
            component: SohuSearch,
            meta: {
                isShowLeft: false,
                isShowRight: false,
            }
        },
        {
            path: '/*',
            redirect: '/realtime'
        }
    ],
})

