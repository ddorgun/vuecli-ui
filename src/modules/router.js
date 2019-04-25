/* eslint-disable no-console */
// import store from '@/store';
import HelloWorld from '@/components/helloWorld/HelloWorld.vue';

const moduleRouters = [
  {
    path: '/',
    name: 'hello',
    component: HelloWorld,
  },
  {
    path: '/content',
    name: 'content',
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      console.log(to, from);
      next();
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "content" */ './content/views/Content.vue'),
  },
];

export default moduleRouters;
