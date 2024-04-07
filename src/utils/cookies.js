/*
 * @Description:
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-01 15:44:29
 * @LastEditTime: 2024-04-01 15:52:05
 */
import Cookies from 'js-cookie';
const { hostname } = window.location;
const env = import.meta.env;
class CookieProxy {
  constructor() {
    // 不同环境token前缀
    this.prefix = env.VITE_ENV;
    this.baseParams = {
      expires: 7,
      path: '/',
      domain: hostname || undefined,
      // Secure : true,
      // SameSite : 'none',
    };
  }

  getAll() {
    return Cookies.get();
  }

  clearAll() {
    const keys = Object.keys(this.getAll());
    keys.forEach((key) => {
      this.remove(key, false);
    });
  }

  get(key, hasPrefix = true) {
    const keyStr = hasPrefix ? this.prefix + '' + key : key;
    return Cookies.get(keyStr);
  }

  set(key, value, params) {
    const options = params === undefined ? this.baseParams : params;
    const keyStr = this.prefix + '' + key;
    return Cookies.set(keyStr, value, options);
  }

  remove(key, hasPrefix = true) {
    const keyStr = !hasPrefix ? key : this.prefix + '' + key;
    return Cookies.remove(keyStr, {
      path: '/',
      domain: hostname,
    });
  }
}
const cookies = new CookieProxy();

export default cookies;
