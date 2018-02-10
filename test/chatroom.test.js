const RongCloud = require('../index')
const config = require('../config')
const assert = require('assert')

const rongCloud = new RongCloud({
  appKey: config.appKey,
  appSecret: config.appSecret
})

describe('Chatroom', () => {
  describe('create', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.create([
        {
          id: config.chatroom[0]._id,
          name: config.chatroom[0].name
        },
        {
          id: config.chatroom[1]._id,
          name: config.chatroom[1].name
        }
      ])
      assert.equal(data.code, 200)
    })
  })

  describe('join', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.join('1', '1')
      assert.equal(data.code, 200)
    })
  })

  describe('query', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.query('1')
      assert.equal(data.code, 200)
    })
  })

  describe('queryUser', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.queryUser('1', 200, 1)
      assert.equal(data.code, 200)
    })
  })

  describe('queryUserExist', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.queryUserExist('1', '1')
      assert.equal(data.code, 200)
    })
  })

  describe('queryUsersExist', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.queryUsersExist('1', ['1', '2'])
      assert.equal(data.code, 200)
    })
  })

  describe('destroy', () => {
    it('destroy string should success', async () => {
      let data = await rongCloud.chatroom.destroy('1')
      assert.equal(data.code, 200)
    })

    it('destroy array should success', async () => {
      let data = await rongCloud.chatroom.destroy(['1', '2'])
      assert.equal(data.code, 200)
    })
  })

  describe('user gag', () => {
    it('add should success', async () => {
      let data = await rongCloud.chatroom.addGagUser('1', '1', 1)
      assert.equal(data.code, 200)
    })

    it('rollback should success', async () => {
      let data = await rongCloud.chatroom.rollbackGagUser('1', '1')
      assert.equal(data.code, 200)
    })

    it('getList should success', async () => {
      let data = await rongCloud.chatroom.getGagUserList('1')
      assert.equal(data.code, 200)
    })
  })

  describe('user ban', () => {
    it('add should success', async () => {
      try {
        let data = await rongCloud.chatroom.addBanUser('1', 1)

        if (data.code) {
          assert.equal(data.code, 200)
        }
      } catch (err) {
        // 1009 '专有云聊天室全局禁言功能未开通。'
        assert.equal(err.error.code, 1009)
      }
    })

    it('query should success', async () => {
      try {
        let data = await rongCloud.chatroom.queryBanUser()

        if (data.code) {
          assert.equal(data.code, 200)
        }
      } catch (err) {
        // 1009 '专有云聊天室全局禁言功能未开通。'
        assert.equal(err.error.code, 1009)
      }
    })

    it('remove should success', async () => {
      try {
        let data = await rongCloud.chatroom.removeBanUser('1')

        if (data.code) {
          assert.equal(data.code, 200)
        }
      } catch (err) {
        // 1009 '专有云聊天室全局禁言功能未开通。'
        assert.equal(err.error.code, 1009)
      }
    })
  })

  describe('user block', () => {
    it('add should success', async () => {
      let data = await rongCloud.chatroom.addBlockUser('1', '1', 1)
      assert.equal(data.code, 200)
    })

    it('rollback should success', async () => {
      let data = await rongCloud.chatroom.rollbackBlockUser('1', '1')
      assert.equal(data.code, 200)
    })

    it('getList should success', async () => {
      let data = await rongCloud.chatroom.getListBlockUser('1')
      assert.equal(data.code, 200)
    })
  })

  describe('message distribution', () => {
    it('stop should success', async () => {
      let data = await rongCloud.chatroom.stopDistributionMessage('1')
      assert.equal(data.code, 200)
    })

    it('resume should success', async () => {
      let data = await rongCloud.chatroom.resumeDistributionMessage('1')
      assert.equal(data.code, 200)
    })
  })

  describe('priority', () => {
    it('add should success', async () => {
      let chatroomAddPriorityObjectName = ['RC:VcMsg', 'RC:ImgTextMsg', 'RC:ImgMsg']
      let data = await rongCloud.chatroom.addPriority(chatroomAddPriorityObjectName)
      assert.equal(data.code, 200)
    })
    it('query should success', async () => {
      let data = await rongCloud.chatroom.queryPriority()
      assert.equal(data.code, 200)
    })

    it('remove should success', async () => {
      let chatroomAddPriorityObjectName = ['RC:VcMsg', 'RC:ImgTextMsg', 'RC:ImgMsg']
      let data = await rongCloud.chatroom.removePriority(chatroomAddPriorityObjectName)
      assert.equal(data.code, 200)
    })
  })

  describe('user whiteList', () => {
    it('add should success', async () => {
      let data = await rongCloud.chatroom.addWhiteListUser('1', ['1', '2'])
      assert.equal(data.code, 200)
    })
    it('query should success', async () => {
      let data = await rongCloud.chatroom.queryWhiteListUser('1')
      assert.equal(data.code, 200)
    })
    it('remove should success', async () => {
      let data = await rongCloud.chatroom.removeWhiteListUser('1', '1')
      assert.equal(data.code, 200)
    })
  })

  describe('whiteList', () => {
    it('add should success', async () => {
      let data = await rongCloud.chatroom.addWhiteList('RC:VcMsg')
      assert.equal(data.code, 200)
    })
    it('query should success', async () => {
      let data = await rongCloud.chatroom.queryWhiteList()
      assert.equal(data.code, 200)
    })
    it('remove should success', async () => {
      let data = await rongCloud.chatroom.removeWhiteList('RC:VcMsg')
      assert.equal(data.code, 200)
    })
  })

  describe('keepalive', () => {
    it('add should success', async () => {
      try {
        let data = await rongCloud.chatroom.addKeepalive('1')

        if (data.code) {
          assert.equal(data.code, 200)
        }
      } catch (err) {
        // 1009 '专有云聊天室全局禁言功能未开通。'
        assert.equal(err.error.code, 1009)
      }
    })

    it('query should success', async () => {
      try {
        let data = await rongCloud.chatroom.queryKeepalive()

        if (data.code) {
          assert.equal(data.code, 200)
        }
      } catch (err) {
        // 1009 '专有云聊天室全局禁言功能未开通。'
        assert.equal(err.error.code, 1009)
      }
    })

    it('remove should success', async () => {
      try {
        let data = await rongCloud.chatroom.removeKeepalive('1')

        if (data.code) {
          assert.equal(data.code, 200)
        }
      } catch (err) {
        // 1009 '专有云聊天室全局禁言功能未开通。'
        assert.equal(err.error.code, 1009)
      }
    })
  })
})
