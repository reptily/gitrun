import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './app/App.vue';
import Axios from 'axios';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const axiosConfig = {
  baseURL: 'http://127.0.0.1:8898/',
  timeout: 30000,
};

/**
 * Prototype
 */
Vue.prototype.$http = Axios.create(axiosConfig);

/**
 * Use
 */
Vue.use(Antd);
Vue.use(VueRouter);

/**
 * Route
 */
import PageProject from './app/pages/Project.vue';
import BranchProject from './app/pages/Branch.vue';

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '',
      component: PageProject
    },
    {
      path: '/branch/:id',
      name: '',
      component: BranchProject
    },
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
