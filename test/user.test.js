const RongCloud = require('../index')
const config = require('../config')
const assert = require('assert')

const rongCloud = new RongCloud({
  appKey: config.appKey,
  appSecret: config.appSecret
})

describe('User', () => {
  describe('getToken', () => {
    it('should success', async () => {
      let data = await rongCloud.user.getToken(config.user._id, config.user.name, config.user.portraitUri)
      assert.equal(data.code, 200)
    })
  })

  describe('refresh', () => {
    it('should success', async () => {
      let data = await rongCloud.user.refresh(config.user._id)
      assert.equal(data.code, 200)
    })
  })

  describe('checkOnline', () => {
    it('should success', async () => {
      let data = await rongCloud.user.checkOnline(config.user._id)
      assert.equal(data.code, 200)
    })
  })

  describe('block', () => {
    it('should success', async () => {
      let data = await rongCloud.user.block(config.user._id, 1)
      assert.equal(data.code, 200)
    })
  })

  describe('unblock', () => {
    it('should success', async () => {
      let data = await rongCloud.user.unblock(config.user._id)
      assert.equal(data.code, 200)
    })
  })

  describe('queryBlock', () => {
    it('should success', async () => {
      let data = await rongCloud.user.queryBlock()
      assert.equal(data.code, 200)
    })
  })

  describe('addBlacklist', () => {
    it('should success', async () => {
      let data = await rongCloud.user.addBlacklist(config.user._id, '2')
      assert.equal(data.code, 200)
    })
  })

  describe('queryBlacklist', () => {
    it('should success', async () => {
      let data = await rongCloud.user.queryBlacklist(config.user._id)
      assert.equal(data.code, 200)
    })
  })

  describe('removeBlacklist', () => {
    it('should success', async () => {
      let data = await rongCloud.user.removeBlacklist(config.user._id, '2')
      assert.equal(data.code, 200)
    })
  })
})
