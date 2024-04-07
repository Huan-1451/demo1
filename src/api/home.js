/*
 * @Description:
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-04 18:22:46
 * @LastEditTime: 2024-04-06 18:49:22
 */
import service from '@/request/axios';
import home from '@/mock/home';

export function getHome() {
  // return service.get('/api/homeModule');

  return new Promise((resolve) => {
    resolve(home);
  });
}
