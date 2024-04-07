/*
 * @Description:
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-01 15:42:04
 * @LastEditTime: 2024-04-07 17:21:05
 */
import { defineStore } from 'pinia';
import { getHome } from '@/api/home';

const commonStore = defineStore({
  id: 'commonStore',
  state: () => {
    return {
      goodsType: [],
    };
  },
  actions: {
    getHomeMod(params) {
      return new Promise((resolve) => {
        getHome(params).then((res) => {
          const data = res?.data || [];
          let types = (data || []).filter((i) => i.Name == 'Icons');
          if (types.length > 0) {
            this.goodsType = types[0]?.modList;
            localStorage.setItem('goodsTypes', JSON.stringify(this.goodsType));
          }
          resolve(data);
        });
      }).catch((e) => {
        console.log('error:' + e);
      });
    },
  },
  getters: {},
});

export default commonStore;
