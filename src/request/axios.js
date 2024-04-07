/*
 * @Description:
 * @Author: Zhao Huanhuan
 * @Date: 2024-03-31 20:36:06
 * @LastEditTime: 2024-04-05 16:31:49
 */
import axios from 'axios';
// import { Toast } from 'vant'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  // 统一超时时间，如有某个接口需要设置不同超时时间，可在调用接口是传入超时时间来覆盖这个超时时间
  timeout: 30 * 1000,
  // 请求是否携带cookie
  withCredentials: false,
});

// 标签是否刷新token
const isRefreshing = false;

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 200状态码
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  (err) => {
    // 处理500等错误
    // if (err.response.status === 500) {
    //   Toast()
    // }

    return Promise.reject(err);
  },
);

export default service;
