import Vue from 'vue';


import router from './router/router';
import store from './store/store';
import VueSocketio from 'vue-socket.io'
import VueCookie from 'vue-cookie'


// import mock from './server/mock';
Vue.use(VueSocketio,'http://192.168.31.217:3000')

// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.config.debug = true;

window.log = console.log;


//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
// VueResource官方不再维护，所以使用axios
// Vue.use(VueResource);

import _ from 'lodash'
let data = {
    router,
    store
}

const app = new Vue(data).$mount('#app');


// app.$set(data,'c',123);
// log(data);
