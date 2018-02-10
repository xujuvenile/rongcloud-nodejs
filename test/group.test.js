const RongCloud = require('../index')
const config = require('../config')
const assert = require('assert')

const rongCloud = new RongCloud({
  appKey: config.appKey,
  appSecret: config.appSecret
})

const userId = config.user._id
const groupId = config.group._id
const groupName = config.group.name

describe('Group', () => {
  describe('create', () => {
    it('should success', async () => {
      let data = await rongCloud.group.create(userId, groupId, groupName)
      assert.equal(data.code, 200)
    })
  })

  describe('sync', () => {
    it('should success', async () => {
      let data = await rongCloud.group.sync(userId, [{_id: groupName, name: groupName}])
      assert.equal(data.code, 200)
    })
  })

  describe('refresh', () => {
    it('should success', async () => {
      let data = await rongCloud.group.refresh(groupId, groupName + '|test')
      assert.equal(data.code, 200)
    })
  })

  describe('join', () => {
    it('should success', async () => {
      let data = await rongCloud.group.join(userId, groupId, groupName + '|test')
      assert.equal(data.code, 200)
    })
  })

  describe('queryUser', () => {
    it('should success', async () => {
      let data = await rongCloud.group.queryUser(groupId)
      assert.equal(data.code, 200)
    })
  })

  describe('quit', () => {
    it('should success', async () => {
      let data = await rongCloud.group.quit(userId, groupId)
      assert.equal(data.code, 200)
    })
  })

  describe('quit', () => {
    it('should success', async () => {
      let data = await rongCloud.group.quit(userId, groupId, 1)
      assert.equal(data.code, 200)
    })
  })

  describe('getGagUserList', () => {
    it('should success', async () => {
      let data = await rongCloud.group.getGagUserList(userId, groupId)
      assert.equal(data.code, 200)
    })
  })

  describe('rollBackGagUser', () => {
    it('should success', async () => {
      let data = await rongCloud.group.rollBackGagUser(userId, groupId)
      assert.equal(data.code, 200)
    })
  })

  describe('dismiss', () => {
    it('should success', async () => {
      let data = await rongCloud.group.dismiss(userId, groupId)
      assert.equal(data.code, 200)
    })
  })
})
