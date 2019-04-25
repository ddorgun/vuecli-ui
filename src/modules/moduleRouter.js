/* eslint-disable no-console */
// import store from '@/store';

const requireModules = require.context('@/modules', true, /\.vue*$/);

const routerModules = [];


requireModules.keys().forEach((e) => {
  // "./" 삭제
  const path = e.replace(/(\.\/)/, '');

  // 최초 폴더 이름이 라우터 경로이자 라우터 이름
  const [name] = path.split('/');

  // lazyloading 및 webpackChunk 설정
  routerModules.push({
    path: `/${name}`,
    name,
    component: () => import(/* webpackChunkName: "view-[name]" */ `./${path}`),
  });
});
console.log(routerModules);

export default routerModules;
