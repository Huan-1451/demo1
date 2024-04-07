/*
 * @Description: 路由实例
 * @Author: Zhao Huanhuan
 * @Date: 2024-03-19 14:43:31
 * @LastEditTime: 2024-04-07 18:24:28
 */

const routes = [
  {
    path: '/',
    component: () => import('@/views/layouts/common.vue'),
    redirect: { name: 'Home' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: 'goodsNavList',
        name: 'GoodsNavList',
        component: () => import('@/views/goodsNavList'),
        meta: {
          title: '发现',
        },
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/cart'),
        meta: {
          title: '购物车',
        },
      },
      {
        path: 'userIndex',
        name: 'UserIndex',
        component: () => import('@/views/user/index'),
        meta: {
          title: '我的',
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: { name: 'login' },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/login'),
        meta: {
          title: '登录',
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: { name: 'searchPage' },
    children: [
      {
        path: 'searchPage',
        name: 'SearchPage',
        component: () => import('@/views/searchPage'),
        meta: {
          title: '搜索',
        },
      },
    ],
  },
  {
    path: '/user',
    component: () => import('@/views/layouts/index'),
    redirect: { name: 'userIndex' },
    children: [
      {
        path: 'address',
        name: 'Address',
        component: () => import('@/views/user/address'),
        meta: {
          title: '编辑地址',
        },
      },
      {
        path: 'addressEdit',
        name: 'AddressEdit',
        component: () => import('@/views/user/addressEdit'),
        meta: {
          title: '编辑地址',
        },
      },
    ],
  },

  {
    path: '/goods',
    component: () => import('@/views/layouts/index'),
    redirect: { name: 'home' },
    children: [
      {
        path: 'detail',
        name: 'goodsDetail',
        component: () => import('@/views/goods/detail'),
        meta: {
          title: '商品详情',
        },
      },
    ],
  },
  {
    path: '/order',
    component: () => import('@/views/layouts/index'),
    redirect: { name: 'home' },
    children: [
      {
        path: 'orderIndex',
        name: 'OrderIndex',
        component: () => import('@/views/order/index'),
        meta: {
          title: '我的订单',
        },
      },
      {
        path: 'createOrder',
        name: 'CreateOrder',
        component: () => import('@/views/order/createOrder'),
        meta: {
          title: '创建订单',
        },
      },
      {
        path: 'orderDetail',
        name: 'OrderDetail',
        component: () => import('@/views/order/detail'),
        meta: {
          title: '订单详情',
        },
      },
    ],
  },
];

export default routes;
