/**
 * Created by root on 15/05/2017.
 */

class Cookie {
  /**
   * 设置cookie
   * @param name cookie名
   * @param value cookie值
   * @param expires 有效期时间
   */
  static setCookie (name, value, expires) {
    document.cookie = name + '=' + escape(value) + ';expires=' + expires;
  }

  /**
   * 获取cookie值
   * @param name cookie名
   * @returns {null} cookie值
   */
  static getCookie (name) {
    let arr = null;
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  }

  /**
   * 验证cookie是否存在
   * @param name
   * @returns {boolean}
   */
  static existCookie (name) {
    let arr = null;
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    return (arr = document.cookie.match(reg)) !== null;
  }

  /**
   * 删除cookie
   * @param name cookie名称
   */
  static delCookie (name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = Cookie.getCookie(name);
    if (cval !== null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
    }
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Cookie
   *
   * @returns {boolean}
   */
  static isUserAuthenticated () {
    return Cookie.existCookie('access_token');
  }

  /**
   * Deauthenticate a user. Remove a token from Cookie.
   *
   */
  static deauthenticateUser () {
    Cookie.delCookie('access_token');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken () {
    return Cookie.getCookie('access_token');
  }
}

export default Cookie;
