/*
 * @Description:
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-01 15:42:04
 * @LastEditTime: 2024-04-07 17:19:44
 */
import { createPinia } from 'pinia';
import commonStore from './modules/commonStore';
import cartStore from './modules/cartStore';

const store = createPinia();

export function registerStore(app) {
  app.use(store);
}

export { commonStore, cartStore };

export default store;
