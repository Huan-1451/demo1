/*
 * @Description: 接口API
 * @Author: Zhao Huanhuan
 * @Date: 2024-03-19 19:06:35
 * @LastEditTime: 2024-04-07 20:48:19
 */
import service from '@/request/axios';

// 登录
export function loginApi(data) {
  return service.request({
    url: '/api/login',
    method: 'post',
    data,
  });
}

// 注册
export function registerApi(data) {
  return service.request({
    url: '/api/register',
    method: 'post',
    data,
  });
}

// 获取短信验证码
export function sendSms(data) {
  return service.request({
    url: '/api/sendSms',
    method: 'post',
    data,
  });
}
