const assert = require('assert')
// const debug = require('debug')('message')
const utils = require('./utils')

class Message {
  constructor (opts) {
    this.opts = opts
    // this.defaultSetting = {
    //   pushContent: '',
    //   pushData: '',
    //   count: '',
    //   verifyBlacklist: 0,
    //   isPersisted: 1,
    //   isCounted: 1,
    //   isIncludeSender: 0,
    //   contentAvailable: 0
    // }
  }

  /**
   * 发送单聊消息方法
   * （一个用户向另外一个用户发送消息，单条消息最大 128k。每分钟最多发送 6000 条信息，每次发送用户上限为 1000 人，如：一次发送 1000 人时，示为 1000 条消息。）
   * http://www.rongcloud.cn/docs/server.html#message_private_publish
   * @param fromUserId
   * @param toUserId
   * @param objectName
   * @param content
   * @param opts
   */
  publishPrivate (fromUserId, toUserId, objectName, content, opts = {}) {
    assert(fromUserId && toUserId && objectName && content, new Error('Paramer error'))
    content = typeof content === 'string' ? JSON.stringify({content}) : content
    return this.post('private/publish', Object.assign({fromUserId, toUserId, objectName, content}, opts))
  }

  /**
   * 发送单聊模板消息方法
   * （一个用户向多个用户发送不同消息内容，单条消息最大 128k。每分钟最多发送 6000 条信息，每次发送用户上限为 1000 人。）
   * @param fromUserId
   * @param toUserId
   * @param objectName
   * @param values
   * @param content
   * @param pushContent
   * @param pushData
   * @param opts
   */
  publishTemplate (fromUserId, toUserId, objectName, content, values, pushContent, pushData, opts = {}) {
    assert(fromUserId && toUserId && objectName && values && content, new Error('Paramer error'))
    let body = Object.assign({fromUserId, toUserId, objectName, values, content, pushContent, pushData}, opts)
    return this.post('private/publish_template', body, {contentType: 'application/json'})
  }

  /**
   *
   * @param fromUserId
   * @param toUserId
   * @param objectName
   * @param content
   * @param opts
   */
  publishSystem (fromUserId, toUserId, objectName, content, opts = {}) {
    assert(fromUserId && toUserId && objectName && content, new Error('Paramer error'))
    return this.post('system/publish', Object.assign({fromUserId, toUserId, objectName, content}, opts))
  }

  publishSystemTemplate (fromUserId, toUserId, objectName, values, content, opts = {}) {
    assert(fromUserId && toUserId && objectName && content && values, new Error('Paramer error'))
    return this.post('system/publish_template', Object.assign({fromUserId, toUserId, objectName, values, content}, opts), {contentType: 'application/json'})
  }

  publishGroup (fromUserId, toGroupId, toUserId, objectName, content, opts = {}) {
    assert(fromUserId && toUserId && objectName && content, new Error('Paramer error'))
    return this.post('group/publish', Object.assign({fromUserId, toGroupId, toUserId, objectName, content}, opts))
  }

  publishDiscussion (fromUserId, toDiscussionId, objectName, content, opts = {}) {
    assert(fromUserId && objectName && content, new Error('Paramer error'))
    return this.post('discussion/publish', Object.assign({fromUserId, toDiscussionId, objectName, content}, opts))
  }

  publishChatroom (fromUserId, toChatroomId, objectName, content) {
    assert(fromUserId && toChatroomId && objectName && content, new Error('Paramer error'))
    return this.post('chatroom/publish', {fromUserId, toChatroomId, objectName, content})
  }

  broadcast (fromUserId, objectName, content, opts = {}) {
    assert(fromUserId && objectName && content, new Error('Paramer error'))
    return this.post('broadcast', Object.assign({fromUserId, objectName, content}, opts))
  }

  getHistory (date) {
    assert(date, new Error('Paramer error'))
    return this.post('history', {date})
  }

  deleteMessage (date) {
    assert(date, new Error('Paramer error'))
    return this.post('history/delete', {date})
  }

  post (method, body, {contentType = 'application/x-www-form-urlencoded'} = {}) {
    let methodArray = [
      'private/publish',
      'private/publish_template',
      'system/publish',
      'system/publish_template',
      'group/publish',
      'discussion/publish',
      'chatroom/publish',
      'broadcast',
      'history'
    ]
    assert(methodArray.includes(method), new TypeError('Method invaid'))
    let header = utils.genRyHeader(this.opts.appKey, this.opts.appSecret, contentType)
    return utils.httpPost(this.opts.host, `/message/${method}.json`, body, header, this.opts.secure)
  }
}

module.exports = Message
