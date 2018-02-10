const RongCloud = require('../index')
const config = require('../config')
const assert = require('assert')

const rongCloud = new RongCloud({
  appKey: config.appKey,
  appSecret: config.appSecret
})

const values = [{'{c}': '1', '{d}': '2', '{e}': '3'}]
const content = JSON.stringify({content: '{c}{d}{e}'})
const objectName = 'RC:TxtMsg'
const fromUserId = config.user._id
const toUserId = ['2']
const pushContent = ['TEST']

describe('Message', () => {
  describe('publishPrivate', () => {
    it('text msg should success', async () => {
      let data = await rongCloud.message.publishPrivate(fromUserId, toUserId, objectName, content)
      assert.equal(data.code, 200)
    })

    it('text msg should success', async () => {
      let data = await rongCloud.message.publishPrivate(fromUserId, toUserId, objectName, content)
      assert.equal(data.code, 200)
    })
  })

  describe('publishTemplate', () => {
    it('should success', async () => {
      let data = await rongCloud.message.publishTemplate(fromUserId, toUserId, objectName, content, values, pushContent)
      assert.equal(data.code, 200)
    })
  })

  describe('publishSystem', () => {
    it('should success', async () => {
      let data = await rongCloud.message.publishSystem(fromUserId, toUserId, objectName, content)
      assert.equal(data.code, 200)
    })
  })

  describe('publishDiscussion', () => {
    it('should success', async () => {
      let data = await rongCloud.message.publishDiscussion(fromUserId, toUserId, objectName, content)
      assert.equal(data.code, 200)
    })
  })

  describe('publishChatroom', () => {
    it('should success', async () => {
      let data = await rongCloud.message.publishChatroom(fromUserId, toUserId, objectName, content)
      assert.equal(data.code, 200)
    })
  })

  describe('broadcast', () => {
    it('should success', async () => {
      let data = await rongCloud.message.broadcast(fromUserId, objectName, content)
      assert.equal(data.code, 200)
    })
  })

  describe('getHistory', () => {
    it('should success', async () => {
      let data = await rongCloud.message.getHistory('2018010110')
      assert.equal(data.code, 200)
    })
  })

  describe('deleteMessage', () => {
    it('should success', async () => {
      let data = await rongCloud.message.deleteMessage('2018010110')
      assert([200, 1015].includes(data.code))
    })
  })
})
