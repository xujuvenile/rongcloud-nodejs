const assert = require('assert')
const utils = require('./utils')

class Group {
  constructor (opts) {
    this.opts = opts
  }

  create (userId, groupId, groupName) {
    assert(userId && groupId && groupName, new Error('Paramer error'))
    return this.post('create', {userId, groupId, groupName})
  }

  sync (userId, groupInfo) {
    assert(userId && groupInfo, new Error('Paramer error'))
    assert(Array.isArray(groupInfo), new TypeError(`Type invaid, should:[{id:$id, name:$name}]`))
    let body = {}
    for (let i = 0; i < groupInfo.length; i++) {
      body[`group[${groupInfo[i].id}]`] = groupInfo[i].name
    }
    return this.post('sync', {userId, groupInfo})
  }

  refresh (groupId, groupName) {
    assert(groupId && groupName, new Error('Paramer error'))
    return this.post('refresh', {groupId, groupName})
  }

  join (userId, groupId, groupName) {
    assert(userId && groupId && groupName, new Error('Paramer error'))
    return this.post('join', {userId, groupId, groupName})
  }

  queryUser (groupId) {
    assert(groupId, new Error('Paramer error'))
    return this.post('user/query', {groupId})
  }

  quit (userId, groupId) {
    assert(userId && groupId, new Error('Paramer error'))
    return this.post('quit', {userId, groupId})
  }

  addGagUser (userId, groupId, minute) {
    assert(userId && groupId && minute, new Error('Paramer error'))
    return this.post('user/gag/add', {userId, groupId, minute})
  }

  getGagUserList (userId, groupId) {
    assert(userId && groupId, new Error('Paramer error'))
    return this.post('user/gag/list', {userId, groupId})
  }

  rollBackGagUser (userId, groupId) {
    assert(userId && groupId, new Error('Paramer error'))
    return this.post('user/gag/rollback', {userId, groupId})
  }

  dismiss (userId, groupId) {
    assert(userId && groupId, new Error('Paramer error'))
    return this.post('dismiss', {userId, groupId})
  }

  post (method, body, {contentType = 'application/x-www-form-urlencoded'} = {}) {
    let methodArray = [
      'create',
      'sync',
      'join',
      'refresh',
      'quit',
      'dismiss',
      'user/query',
      'user/gag/add',
      'user/gag/list',
      'user/gag/rollback'
    ]
    assert(methodArray.includes(method), new TypeError('Method invaid'))
    let header = utils.genRyHeader(this.opts.appKey, this.opts.appSecret, contentType)
    return utils.httpPost(this.opts.host, `/group/${method}.json`, body, header, this.opts.secure)
  }
}

module.exports = Group
