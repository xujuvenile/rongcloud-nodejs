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

  describe('addGagUser', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.addGagUser('1', '1', 1)
      assert.equal(data.code, 200)
    })
  })

  describe('rollbackGagUser', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.rollbackGagUser('1', '1')
      assert.equal(data.code, 200)
    })
  })

  describe('getGagUserList', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.getGagUserList('1')
      assert.equal(data.code, 200)
    })
  })

  describe('addBlockUser', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.addBlockUser('1', '1', 1)
      assert.equal(data.code, 200)
    })
  })

  describe('rollbackBlockUser', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.rollbackBlockUser('1', '1')
      assert.equal(data.code, 200)
    })
  })

  describe('getListBlockUser', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.getListBlockUser('1')
      assert.equal(data.code, 200)
    })
  })

  describe('stopDistributionMessage', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.stopDistributionMessage('1')
      assert.equal(data.code, 200)
    })
  })

  describe('resumeDistributionMessage', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.resumeDistributionMessage('1')
      assert.equal(data.code, 200)
    })
  })

  describe('addPriority', () => {
    it('should success', async () => {
      let chatroomAddPriorityObjectName = ['RC:VcMsg', 'RC:ImgTextMsg', 'RC:ImgMsg']
      let data = await rongCloud.chatroom.addPriority(chatroomAddPriorityObjectName)
      assert.equal(data.code, 200)
    })
  })

  describe('queryPriority', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.queryPriority()
      assert.equal(data.code, 200)
    })
  })

  describe('removePriority', () => {
    it('should success', async () => {
      let chatroomAddPriorityObjectName = ['RC:VcMsg', 'RC:ImgTextMsg', 'RC:ImgMsg']
      let data = await rongCloud.chatroom.removePriority(chatroomAddPriorityObjectName)
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

  describe('addWhiteListUser', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.addWhiteListUser('1', ['1', '2'])
      assert.equal(data.code, 200)
    })
  })

  describe('queryWhiteListUser', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.queryWhiteListUser('1')
      assert.equal(data.code, 200)
    })
  })

  describe('removeWhiteListUser', () => {
    it('should success', async () => {
      let data = await rongCloud.chatroom.removeWhiteListUser('1', '1')
      assert.equal(data.code, 200)
    })
  })
})
