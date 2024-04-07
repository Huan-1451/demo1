/*
 * @Description: 路由入口文件
 * @Author: Zhao Huanhuan
 * @Date: 2024-03-19 14:40:06
 * @LastEditTime: 2024-04-01 20:29:48
 */

import { createRouter, createWebHistory } from 'vue-router';
import routes from './main.config';

const router = createRouter({
  history: createWebHistory(), //可传参数，配置base路径，例如'/app'
  routes,
});

export function resetRouter() {
  const WHITE_NAME_LIST = ['Login'];
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
