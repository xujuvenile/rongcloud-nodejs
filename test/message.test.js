const RongCloud = require('../index')
const config = require('../config')
const assert = require('assert')

const rongCloud = new RongCloud({
  appKey: config.appKey,
  appSecret: config.appSecret
})

describe('Message', () => {
  describe('publishPrivate', () => {
    it('should success', async () => {
      let toUserIds = ['userId2', 'userId3', 'userId4']
      let objectName = 'RC:TxtMsg'
      let content = 'hello'
      let data = await rongCloud.message.publishPrivate('userId1', toUserIds, objectName, content)
      assert.equal(data.code, 200)
    })
  })

  describe('publishTemplate', () => {
    it('should success', async () => {
      let data = await rongCloud.message.publishTemplate(config.user._id, ['2'], 'RC:TxtMsg', '{"content":"{c}"}', [ { '{c}': 'test' } ], [ '您有一条新消息' ], ['test'])
      assert.equal(data.code, 200)
    })
  })
})
