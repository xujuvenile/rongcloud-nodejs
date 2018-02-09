const assert = require('assert')
const User = require('./user')

class RongCloud {
  /**
   * @param opts
   * @param opts.appKey
   * @param opts.appSecret
   * @param opts.host default: api.cn.ronghub.com
   * @param opts.secure bool true:https false:http
   */
  constructor (opts = {}) {
    assert(opts.appKey || opts.appSecret, 'Must have appKey and appSecret')
    opts.host = opts.host || 'api.cn.ronghub.com'
    opts.secure = opts.secure || true

    this.user = new User(opts)
  }
}

module.exports = RongCloud
