/*
 * @Description:
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-04 18:22:46
 * @LastEditTime: 2024-04-07 16:35:30
 */
import service from '@/request/axios';
import { goodsDetail, goodsList } from '@/mock/goods';

// 商品详情
export function getGoodsDetail() {
  // return service.request({
  //   url: '/addressList',
  //   method: 'get',
  // });
  return new Promise((resolve) => {
    resolve(goodsDetail);
  });
}

// 商品列表
export function getGoodsList(data) {
  // return service.get('/api/goodsList', { params: data });
  return new Promise((resolve) => {
    resolve(goodsList);
  });
}
