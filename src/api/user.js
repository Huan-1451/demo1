/*
 * @Description:
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-01 19:59:47
 * @LastEditTime: 2024-04-07 16:34:57
 */
import service from '@/request/axios';
import { addressListRes, addAddressRes, editAddressRes, deleteAddressRes, addressDetailRes } from '@/mock/address';
import { userInfo } from '@/mock/user';
export function login(data) {
  return service.request({
    url: '/login',
    method: 'post',
    data,
  });
}

export function logout() {
  return service.request({
    url: '/logout',
    method: 'post',
  });
}

// 获取用户信息
export function getUserInfo(data) {
  // return service.request({
  //   method: 'get',
  //   url: '/getUserInfo',
  //   data,
  // });
  return new Promise((resolve) => {
    resolve(userInfo);
  });
}

// 获取用户地址列表
export function getAddressList() {
  // return service.request({
  //   url: '/addressList',
  //   method: 'get',
  // });
  return new Promise((resolve) => {
    resolve(addressListRes);
  });
}

// 添加地址
export function addAddress() {
  // return service.request({
  //   url: '/addAddress',
  //   method: 'get',
  // });
  return new Promise((resolve) => {
    resolve(addAddressRes);
  });
}

// 编辑地址
export function editAddress() {
  // return service.request({
  //   url: '/editAddress',
  //   method: 'get',
  // });
  return new Promise((resolve) => {
    resolve(editAddressRes);
  });
}

// 删除地址
export function deleteAddress() {
  // return service.request({
  //   url: '/deleteAddress',
  //   method: 'get',
  // });
  return new Promise((resolve) => {
    resolve(deleteAddressRes);
  });
}

// 地址详情
export function getAddressDetail() {
  // return service.request({
  //   url: '/addressDetail',
  //   method: 'get',
  // });
  return new Promise((resolve) => {
    resolve(addressDetailRes);
  });
}
