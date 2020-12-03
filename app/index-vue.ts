import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

// setup the routing table
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('./dog-list.vue') // lazy loading
    },
    {
        path: '/dog/:name',
        name: 'details',
        component: () => import('./dog-details.vue'),
        props: true // pass route info to the component
    }
];

// created the Vue router
const router = createRouter({
    history: createWebHashHistory(), // control the browser history
    routes
})

// updated the app to use the router
createApp(App).use(router).mount('#app');
