/*
 * @Description:
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-07 17:43:56
 * @LastEditTime: 2024-04-07 18:14:31
 */
export const orderList = {
  status: 200,
  message: 'ok',
  data: {
    totalPage: 1,
    list: [
      {
        createTime: '20240101',
        orderStatusCode: '0',
        orderStatus: '已完成',
        orderNo: '1',
        orderList: [
          {
            orderId: '123',
            quantity: 1,
            sellingPrice: 19.9,
            goodsName: '心相印 茶语丝享系列24包装四层纸手帕（超迷你）24包 C3624',
            goodsSmallImg: 'https://fuli.cn-sh2.ufileos.com/20231227/f59db58b49d6346cd53f874486f9d2be.jpg',
          },
        ],
      },
    ],
  },
};
