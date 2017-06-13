import Config from '../config/config.json';

/**
 * 定义远程类
 */
class Origin {
  /**
   * 获取远程主机的路径
   * @returns {null}
   * @constructor
   */
  static get originPath () {
    return !Config.origin ? null : Config.origin;
  }

  /**
   * 获取验证码图片url
   * @returns {null}
   */
  static captchaUrl () {
    if (!this.originPath) {
      return null;
    }
    return this.originPath + '/user/captcha.jpg?' + Math.floor(Math.random() * 100);
  }

  /**
   * 获取登录url
   */
  static loginUrl () {
    if (!this.originPath) {
      return null;
    }
    return this.originPath + '/oauth/token';
  }
}

export default Origin;
