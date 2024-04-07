/*
 * @Description:
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-07 15:52:13
 * @LastEditTime: 2024-04-07 16:50:26
 */
import service from '@/request/axios';
import { cartList, modify } from '@/mock/cart';

// 添加购物车
export function addCart(params) {
  return service.post('/account/addCart', params);
}

// 修改购物车
export function modifyCart(params) {
  // return service.put('/account/modifyCart', params);
  return new Promise((resolve) => {
    resolve(modify);
  });
}

// 获取购物车商品
export function getCartList(params) {
  // return service.get('/account/cartList', { params });
  return new Promise((resolve) => {
    resolve(cartList);
  });
}
// 删除购物车商品
export function deleteCartItem(id) {
  return service.delete(`/account/deleteCart/${id}`);
}
