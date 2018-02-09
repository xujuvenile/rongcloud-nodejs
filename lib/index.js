const assert = require('assert')
const debug = require('debug')('rongcloud:index')

const User = require('./user')
const Chatroom = require('./chatroom')

class RongCloud {
  /**
   * @param opts
   * @param opts.appKey
   * @param opts.appSecret
   * @param opts.host default: api.cn.ronghub.com
   * @param opts.secure bool true:https false:http
   */
  constructor (opts = {}) {
    debug('constructor opts', opts)
    assert(opts.appKey, 'Must have appKey')
    assert(opts.appSecret, 'Must have appSecret')
    opts.host = opts.host || 'api.cn.ronghub.com'
    opts.secure = opts.secure || true

    this.user = new User(opts)
    this.chatroom = new Chatroom(opts)
  }
}

module.exports = RongCloud
