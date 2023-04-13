import { createApp } from 'vue'
import * as VueRouter from 'vue-router';
import VueCryptojs from 'vue-cryptojs'

import App from './App.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import Home from '@/views/HomeView.vue'
import AddFolder from '@/views/AddNewFolderView.vue'


const routes = [{
    path: "/",
    name: "login",
    component: Login,
}, {
    path: "/register",
    name: "register",
    component: Register,
}, {
    path: "/home",
    name: "home",
    component: Home,
}, {
    path: "/addFolder",
    name: "addFolder",
    component: AddFolder,
}];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});


createApp(App).use(router).use(VueCryptojs).mount('#app')