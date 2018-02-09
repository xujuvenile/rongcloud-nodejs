const assert = require('assert')
const utils = require('./utils')

class User {
  constructor (opts) {
    this.opts = opts
  }

  /**
   * 获取 Token 方法
   * @param userId:用户 Id，最大长度 64 字节.是用户在 App 中的唯一标识码，必须保证在同一个 App 内不重复，重复的用户 Id 将被当作是同一用户。（必传）
   * @param name:用户名称，最大长度 128 字节.用来在 Push 推送时显示用户的名称.用户名称，最大长度 128 字节.用来在 Push 推送时显示用户的名称。（必传）
   * @param portraitUri:用户头像 URI，最大长度 1024 字节.用来在 Push 推送时显示用户的头像。（必传）
   */
  getToken (userId, name, portraitUri) {
    assert(userId, `Paramer 'userId' is required`)
    assert(name, `Paramer 'name' is required`)
    assert(portraitUri, `Paramer 'portraitUri' is required`)
    return this.post('getToken', {userId, name, portraitUri})
  }

  /**
   * 刷新用户信息方法
   * @param userId:用户 Id，最大长度 64 字节.是用户在 App 中的唯一标识码，必须保证在同一个 App 内不重复，重复的用户 Id 将被当作是同一用户。（必传）
   * @param name:用户名称，最大长度 128 字节。用来在 Push 推送时，显示用户的名称，刷新用户名称后 5 分钟内生效。（可选，提供即刷新，不提供忽略）
   * @param portraitUri:用户头像 URI，最大长度 1024 字节。用来在 Push 推送时显示。（可选，提供即刷新，不提供忽略）
   *
   */
  refresh (userId, name, portraitUri) {
    assert(userId, `Paramer 'userId' is required`)
    return this.post('refresh', {userId, name, portraitUri})
  }

  /**
   * 检查用户在线状态
   * @param userId
   * @return {*}
   */
  checkOnline (userId) {
    assert(userId, `Paramer 'userId' is required`)
    return this.post('checkOnline', {userId})
  }

  /**
   * 封禁用户方法（每秒钟限 100 次）
   * @param userId
   * @param minute
   * @return {*}
   */
  block (userId, minute) {
    assert(userId, `Paramer 'userId' is required`)
    assert(minute, `Paramer 'minute' is required`)
    // return utils.httpPost(this.opts.host, '/user/blocks.json', {userId}, this.genHeader(), this.opts.secure)
    return this.post('blocks', {userId, minute})
  }

  /**
   * 解除用户封禁方法（每秒钟限 100 次）
   * @param userId
   * @return {*}
   */
  unblock (userId) {
    assert(userId, `Paramer 'userId' is required`)
    return this.post('unblock', {userId})
  }

  /**
   * 获取被封禁用户方法（每秒钟限 100 次）
   * @return {*}
   */
  queryBlock () {
    return this.post('block/query')
  }

  /**
   * 添加用户到黑名单方法（每秒钟限 100 次）
   * @param userId:用户 Id。（必传）
   * @param blackUserId:被加到黑名单的用户Id。（必传）
   **/
  addBlacklist (userId, blackUserId) {
    assert(userId, `Paramer 'userId' is required`)
    assert(blackUserId, `Paramer 'blackUserId' is required`)

    return this.post('blacklist/add', {userId, blackUserId})
  }

  /**
   * 获取某用户的黑名单列表方法（每秒钟限 100 次）
   * @param userId
   * @return {*}
   */
  queryBlacklist (userId) {
    assert(userId, `Paramer 'userId' is required`)

    return this.post('blacklist/query', {userId})
  }

  /**
   * 从黑名单中移除用户方法（每秒钟限 100 次）
   * @param userId
   * @param blackUserId
   * @return {*}
   */
  removeBlacklist (userId, blackUserId) {
    assert(userId, `Paramer 'userId' is required`)
    assert(blackUserId, `Paramer 'blackUserId' is required`)

    return this.post('blacklist/remove', {userId})
  }

  post (method, body) {
    let methodArray = [
      'getToken',
      'refresh',
      'checkOnline',
      'blocks',
      'unblock',
      'block/query',
      'blacklist/add',
      'blacklist/query',
      'blacklist/remove'
    ]
    assert(methodArray.includes(method), new TypeError('Method invaid'))
    return utils.httpPost(this.opts.host, `/user/${method}.json`, body, this.genHeader(), this.opts.secure)
  }

  genHeader () {
    return utils.genRyHeader(this.opts.appKey, this.opts.appSecret)
  }
}

module.exports = User
