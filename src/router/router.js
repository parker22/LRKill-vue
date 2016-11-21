import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../app';
import Index from '../page/index';
import SecondPage from '../page/secondpage';
import Room from '../page/room';
import JoinRoom from '../page/joinroom';
import Identify from '../page/identify';
import RoomInfoPanel from '../page/roominfopanel';
import KillProcess from '../page/killprocess';


Vue.use(VueRouter);

const routes = [
    {
      path: '/', component: App,
        children: [

            { path: '/index', name:'index', component: Index },

            { path: '/secondpage', name:'secondpage', component: SecondPage },

            { path: '/room', name:'room', component: Room},

            { path: '/joinroom', name:'joinroom', component: JoinRoom },

            { path:'/identify', name:'identify', component : Identify},

            { path:'/roominfopanel', name:'roominfopanel', component : RoomInfoPanel},

            { path:'/killprocess', name:'killprocess', component : KillProcess}
        ]
    }
];





const router = new VueRouter({
    // mode:'history', //这样url就没有/#/XXX,而是常见的url形式
    routes:routes, // short for routes: routes
    linkActiveClass:'active',     //router-link的选中状态的class，也有一个默认的值
    history:true
});


export  default router
