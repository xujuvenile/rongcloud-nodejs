const assert = require('assert')
const utils = require('./utils')

/**
 * http://www.rongcloud.cn/docs/server.html#sensitiveword
 */
class Sensitiveword {
  constructor (opts) {
    this.opts = opts
  }

  create (word, replaceWord) {
    assert(word, new Error('Paramer Error'))
    return this.post('add', replaceWord ? {word, replaceWord} : {word})
  }

  remove (word) {
    assert(word, new Error('Paramer Error'))
    return this.post('delete', {word})
  }

  batchRemove (words) {
    assert(words, new Error('Paramer Error'))
    return this.post('batch/delete', {words})
  }

  getList (type = 1) {
    return this.post('list', {type})
  }

  post (method, body) {
    let methodArray = [
      'add',
      'delete',
      'list',
      'batch/delete'
    ]
    assert(methodArray.includes(method), new TypeError('Method invaid'))
    let header = utils.genRyHeader(this.opts.appKey, this.opts.appSecret)
    return utils.httpPost(this.opts.host, `/sensitiveword/${method}.json`, body, header, this.opts.secure)
  }
}

module.exports = Sensitiveword
