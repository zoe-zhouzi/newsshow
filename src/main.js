import Vue from 'vue'
import App from './App.vue'

import store from '@/store'
import '@/styles/element-ui-reset.scss'
import router from '@/router'

Vue.config.productionTip = false

// 按需引入element-ui组件
import {Pagination, Calendar, Button } from 'element-ui';

Vue.component(Pagination.name, Pagination);
Vue.component(Calendar.name, Calendar);
Vue.component(Button.name, Button);

// 走马灯插件的引入
// import DynamicMarquee from 'vue-dynamic-marquee';
// Vue.component('dynamic-marquee', DynamicMarquee);


new Vue({
    beforeCreate() {
        // 注册全局数据总线
        Vue.prototype.$bus = this;
    },
    store,
    router,
    render: h => h(App),
}).$mount('#app')
