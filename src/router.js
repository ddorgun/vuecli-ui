/* eslint-disable no-console */
import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import homeChildRouter from './modules/moduleRouter';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: homeChildRouter,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/about',
      name: 'about',
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        console.log(to, from);
        next();
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      component: () => new Promise(resolve => setTimeout(() => resolve(import(/* webpackChunkName: "about" */ './views/About.vue')), 1000)),
    },
    {
      path: '*',
      name: '404Error',
      component: Home,
      beforeEnter: (to, from, next) => {
        console.log('404Error');
        next();
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log('beforeEach');
  store.commit('store/routerLoader', true);
  const loginPath = {
    path: '/login',
    query: { redirect: to.fullPath },
  };
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      console.log('권한 없음!!');
      next(loginPath);
    }
    next();
  }
  next();
});

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve');
  next();
});

router.afterEach(() => {
  console.log('afterEach');
  store.commit('store/routerLoader', false);
});

export default router;
