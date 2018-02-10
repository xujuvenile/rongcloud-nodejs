const RongCloud = require('../index')
const config = require('../config')
const assert = require('assert')

const rongCloud = new RongCloud({
  appKey: config.appKey,
  appSecret: config.appSecret,
  secure: false
})

describe('Sensitiveword', () => {
  it('create should ok', async () => {
    let data = await rongCloud.sensitiveword.create('test')
    assert.equal(data.code, 200)
  })

  it('remove should ok', async () => {
    let data = await rongCloud.sensitiveword.remove('test')
    assert.equal(data.code, 200)
  })

  it('batchRemove should ok', async () => {
    let data = await rongCloud.sensitiveword.batchRemove(['test1', 'test', 'test2'])
    assert.equal(data.code, 200)
  })

  it('getList should ok', async () => {
    let data = await rongCloud.sensitiveword.getList()
    assert.equal(data.code, 200)
  })
})
