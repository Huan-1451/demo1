/*
 * @Description:
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-01 15:30:25
 * @LastEditTime: 2024-04-01 15:31:50
 */

export const ContentTypeEnum = {
  // form-data qs
  FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data upload
  FORM_DATA: 'multipart/form-data;charset=UTF-8',
  // json
  JSON: 'application/json;charset=UTF-8',
};

/**
 * @description: 与后端协定的状态 code
 */
export const ResultEnum = {
  SUCCESS: 0,
  ERROR: 1,
};
