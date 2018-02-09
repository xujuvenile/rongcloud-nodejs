[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/xujuvenile/rongcloud-nodejs.svg?branch=master)](https://travis-ci.org/xujuvenile/rongcloud-nodejs)

# rongcloud-nodejs

RongCloud Node.js SDK (ES6/ES7)

## Config

### appKey

### appSecret

### host

In China, the default host is  `api.cn.ronghub.com`.

### secure

Boolen.

- true. Request url is `https://$host/user/getToken.json`.
- false. `http://$host/user/getToken.json`

```js
const opts = {
  appKey: $yourAppKey,
  appSecret: $yourAppSecret
}
const RongCloud = require('rongcloud-nodejs')
const rongCloud = new RongCloud(opts)
```

## User

- getToken  获取 Token
- refresh  刷新用户信息
- checkOnline  检查用户在线状态
- block  封禁用户
- unBlock  解除用户封禁
- queryBlock  获取被封禁用户
- addBlacklist  添加用户到黑名单
- queryBlacklist  获取某用户的黑名单列表
- removeBlacklist  从黑名单中移除用户

```js

let data = await rongCloud.user.getToken(config.user._id, config.user.name, config.user.portraitUri)

// or

rongCloud.user.getToken(config.user._id, config.user.name, config.user.portraitUri).then(val=>{
    // ...
})
```

## Chatroom

- create  创建聊天室
- join  加入聊天室
- query  查询聊天室信息
- queryUser  查询聊天室内用户
- stopDistributionMessage  聊天室消息停止分发
- resumeDistributionMessage  聊天室消息恢复分发
- addGagUser  添加禁言聊天室成员
- ListGagUser  查询被禁言聊天室成员
- rollbackGagUser  移除禁言聊天室成员
- addBlockUser  添加封禁聊天室成员
- getListBlockUser  查询被封禁聊天室成员
- rollbackBlockUser  移除封禁聊天室成员
- destroy  销毁聊天室
- addWhiteListUser  添加聊天室白名单成员

### Wordfilter

- add  添加敏感词
- delete  移除敏感词
- getList  查询敏感词列表

### Group

- create  创建群组
- sync  同步用户所属群组
- refresh  刷新群组信息
- join  将用户加入指定群组，用户将可以收到该群的消息，同一用户最多可加入 500 个群，每个群最大至 3000 人
- queryUser  查询群成员
- quit  退出群组
- addGagUser  添加禁言群成员
- lisGagUser  查询被禁言群成员
- rollBackGagUser  移除禁言群成员
- dismiss  解散群组。

### Push
- setUserPushTag  添加 Push 标签
- broadcastPush  广播消息

### SMS
- getImageCode  获取图片验证码
- sendCode  发送短信验证码
- verifyCode  验证码验证