/*
 * @Description:
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-01 15:42:04
 * @LastEditTime: 2024-04-07 17:31:34
 */
import { defineStore } from 'pinia';
import { getCartList } from '@/api/cart';

const cartStore = defineStore({
  id: 'cartStore',
  state: () => {
    return {
      count: 2, // 购物车总算,
      cartData: [],
    };
  },
  actions: {
    updateCart() {
      getCartList().then((res) => {
        this.count = res?.data?.length || 0;
      });
    },
  },
  getters: {},
});

export default cartStore;
