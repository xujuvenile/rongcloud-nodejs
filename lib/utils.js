const crypto = require('crypto')
const rp = require('request-promise')
const debug = require('debug')('rongcloud-utils')

class Utils {
  static sha1 (str) {
    return crypto.createHash('sha1').update(str).digest('hex')
  }

  static httpPost (host, url, data, headers, secure = true) {
    let protocol = secure ? `https://` : 'http://'
    let opts = {
      method: 'POST',
      json: true,
      uri: protocol + host + url,
      headers,
      useQuerystring: true
    }
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      opts.form = data
    } else {
      opts.json = data
    }
    debug('httpPost', opts)
    return rp(opts)
  }

  /**
   * RongCloud Api Header required
   * http://www.rongcloud.cn/docs/server.html#signature
   * @param appKey
   * @param appSecret
   * @param contentType 'application/json' / 'application/x-www-form-urlencoded'
   * @return {{}}
   */
  static genRyHeader (appKey, appSecret, contentType = 'application/x-www-form-urlencoded') {
    let HEADERS = {}
    HEADERS['App-Key'] = appKey
    HEADERS['Nonce'] = parseInt(Math.random() * 0xffffff)
    HEADERS['Timestamp'] = Date.parse(new Date()) / 1000
    HEADERS['Signature'] = this.sha1(appSecret + HEADERS['Nonce'] + HEADERS['Timestamp'])
    HEADERS['Content-Type'] = contentType
    return HEADERS
  }
}

module.exports = Utils
