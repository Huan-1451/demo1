/*
 * @Description: 订单api
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-07 17:37:14
 * @LastEditTime: 2024-04-07 17:51:43
 */
import service from '@/request/axios';
import { orderList } from '@/mock/order';
export function getOrderList(params) {
  // return service.get('/account/orderList',params);
  return new Promise((resolve) => {
    resolve(orderList);
  });
}
