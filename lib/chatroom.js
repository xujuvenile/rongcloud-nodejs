const assert = require('assert')
const utils = require('./utils')

class Chatroom {
  constructor (opts) {
    this.opts = opts
  }

  /**
   * 创建聊天室方法
   * @param chatRoomInfo array[{id:$id, name:$name}]
   */
  create (chatRoomInfo) {
    assert(chatRoomInfo, `Paramer 'chatRoomInfo' is required`)
    assert(Array.isArray(chatRoomInfo), new TypeError(`Type invaid, should:[{id:$id, name:$name}]`))
    let body = {}
    for (let i = 0; i < chatRoomInfo.length; i++) {
      body[`chatroom[${chatRoomInfo[i].id}]`] = chatRoomInfo[i].name
    }
    return this.post('create', body)
  }

  /**
   * 加入聊天室方法
   * @param userId 要加入聊天室的用户 Id，可提交多个，最多不超过 50 个。（必传）
   * @param chatroomId 要加入的聊天室 Id。（必传）
   * @returns {*}
   */
  join (userId, chatroomId) {
    assert(userId && chatroomId, `Paramer 'userId' and 'chatroomId' is required`)
    return this.post('join', {userId, chatroomId})
  }

  /**
   * 查询聊天室信息方法
   * @param chatroomId
   * @returns {*}
   */
  query (chatroomId) {
    assert(chatroomId, `Paramer 'chatroomId' is required`)
    return this.post('query', {chatroomId})
  }

  /**
   * 查询聊天室内用户方法
   * @param chatroomId
   * @param count 要获取的聊天室成员数，上限为 500 ，超过 500 时最多返回 500 个成员。（必传）
   * @param order 加入聊天室的先后顺序， 1 为加入时间正序， 2 为加入时间倒序。（必传）
   * @returns {*}
   */
  queryUser (chatroomId, count, order) {
    assert(chatroomId && count && order, `Paramer 'chatroomId'/'count'/'order' is required`)
    return this.post('user/query', {chatroomId, count, order})
  }

  /**
   * 添加禁言聊天室成员方法（在 App 中如果不想让某一用户在聊天室中发言时，可将此用户在聊天室中禁言，被禁言用户可以接收查看聊天室中用户聊天信息，但不能发送消息.）
   * @param userId
   * @param chatroomId
   * @param minute 禁言时长，以分钟为单位，最大值为43200分钟。（必传）
   * @returns {*}
   */
  addGagUser (userId, chatroomId, minute) {
    assert(userId && chatroomId && minute, `Paramer 'userId'/'chatroomId'/'minute' is required`)
    return this.post('user/gag/add', {userId, chatroomId, minute})
  }

  /**
   * 移除禁言聊天室成员方法
   * @param userId
   * @param chatroomId
   * @returns {*}
   */
  rollbackGagUser (userId, chatroomId) {
    assert(userId && chatroomId, `Paramer 'userId'/'chatroomId' is required`)
    return this.post('user/gag/rollback', {userId, chatroomId})
  }

  /**
   * 查询被禁言聊天室成员方法
   * @param chatroomId
   * @returns {*}
   */
  getGagUserList (chatroomId) {
    assert(chatroomId, `Paramer 'chatroomId' is required`)
    return this.post('user/gag/list', {chatroomId})
  }

  /**
   * 在 App 中如果想将某一用户踢出聊天室并在一段时间内不允许再进入聊天室时，可实现将用户对指定的聊天室做封禁处理，被封禁用户将被踢出聊天室，并在设定的时间内不能再进入聊天室中。
   * 添加封禁聊天室成员方法
   * @param userId
   * @param chatroomId
   * @param minute 禁言时长，以分钟为单位，最大值为43200分钟。（必传）
   * @returns {*}
   */
  addBlockUser (userId, chatroomId, minute) {
    assert(userId && chatroomId && minute, `Paramer 'userId'/'chatroomId'/'minute' is required`)
    return this.post('user/block/add', {userId, chatroomId, minute})
  }

  /**
   * 查询被封禁聊天室成员方法
   * @param chatroomId
   * @returns {*}
   */
  getListBlockUser (chatroomId) {
    assert(chatroomId, `Paramer 'chatroomId' is required`)
    return this.post('user/block/list', {chatroomId})
  }

  rollbackBlockUser (userId, chatroomId) {
    assert(userId && chatroomId, `Paramer 'userId'/'chatroomId' is required`)
    return this.post('user/block/rollback', {userId, chatroomId})
  }

  /**
   * 聊天室消息停止分发方法（可实现控制对聊天室中消息是否进行分发，停止分发后聊天室中用户发送的消息，融云服务端不会再将消息发送给聊天室中其他用户。）
   * @param chatroomId
   * @returns {*}
   */
  stopDistributionMessage (chatroomId) {
    assert(chatroomId, `Paramer 'chatroomId' is required`)
    return this.post('message/stopDistribution', {chatroomId})
  }

  /**
   * 聊天室消息恢复分发方法
   * @param chatroomId
   * @returns {*}
   */
  resumeDistributionMessage (chatroomId) {
    assert(chatroomId, `Paramer 'chatroomId' is required`)
    return this.post('message/resumeDistribution', {chatroomId})
  }

  /**
   * 添加聊天室消息优先级方法
   * @param objectName 低优先级的消息类型，每次最多提交 5 个，设置的消息类型最多不超过 20 个。（必传）
   * @returns {*}
   */
  addPriority (objectName) {
    assert(objectName, `Paramer 'objectName' is required`)
    return this.post('message/priority/add', {objectName})
  }

  /**
   * 添加聊天室消息优先级方法
   * @param objectName 低优先级的消息类型，每次最多提交 5 个，设置的消息类型最多不超过 20 个。（必传）
   * @returns {*}
   */
  removePriority (objectName) {
    assert(objectName, `Paramer 'objectName' is required`)
    return this.post('message/priority/remove', {objectName})
  }

  queryPriority () {
    return this.post('message/priority/query')
  }

  destroy (chatroomId) {
    assert(chatroomId, `Paramer 'chatroomId' is required`)
    return this.post('destroy', {chatroomId})
  }

  addWhiteListUser (chatroomId, userId) {
    assert(chatroomId && userId, `Paramer 'chatroomId'/'userId' is required`)
    return this.post('user/whitelist/add', {chatroomId, userId})
  }

  post (method, body) {
    let methodArray = [
      'create',
      'join',
      'query',
      'user/query',
      'user/gag/add',
      'user/gag/rollback',
      'user/gag/list',
      'user/block/add',
      'user/block/rollback',
      'user/block/list',
      'message/stopDistribution',
      'message/resumeDistribution',
      'message/priority/add',
      'message/priority/remove',
      'message/priority/query',
      'destroy',
      'user/whitelist/add'
    ]
    assert(methodArray.includes(method), new TypeError('Method invaid'))
    let header = utils.genRyHeader(this.opts.appKey, this.opts.appSecret)
    return utils.httpPost(this.opts.host, `/chatroom/${method}.json`, body, header, this.opts.secure)
  }
}

module.exports = Chatroom
