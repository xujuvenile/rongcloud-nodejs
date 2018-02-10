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

### 聊天室服务

- create  创建聊天室
- join  加入聊天室
- query  查询聊天室信息
- destroy  销毁聊天室
- queryUser  查询聊天室内用户
- queryUserExist  查询用户是否在聊天室
- queryUsersExist  批量查询用户是否在聊天室，每次最多不超过 1000 个用户 ID

### 聊天室成员禁言服务

- addGagUser  添加禁言聊天室成员
- rollbackGagUser  移除禁言聊天室成员
- getGagUserList  查询被禁言聊天室成员

### 聊天室全局禁言

- addBanUser 添加聊天室全局禁言方法
- removeBanUser 移除聊天室全局禁言方法
- queryBanUser 查询聊天室全局禁言方法


### 聊天室封禁服务

- addBlockUser  添加封禁聊天室成员
- getListBlockUser  查询被封禁聊天室成员
- rollbackBlockUser  移除封禁聊天室成员


### 聊天室消息分发服务

- stopDistributionMessage  聊天室消息停止分发
- resumeDistributionMessage  聊天室消息恢复分发

### 聊天室消息优先级服务

- addPriority  添加聊天室消息优先级
- removePriority 移除聊天室消息优先级
- queryPriority  查询聊天室消息优先级

### 聊天室消息白名单服务

- addWhiteList  添加聊天室白名单成员
- removeWhiteList  移除聊天室白名单成员
- queryWhiteList  查询聊天室白名单成员


### 聊天室用户白名单服务

- addWhiteListUser  添加聊天室白名单成员
- removeWhiteListUser  移除聊天室白名单成员
- queryWhiteListUser  查询聊天室白名单成员

### 聊天室保活服务

- addKeepalive 添加保活聊天室方法
- removeKeepalive 添加保活聊天室方法
- queryKeepalive 添加保活聊天室方法

```js
rongCloud.chatroom.create([{id:'ChatroomId1', name:'ChatroomName1'},{id:'ChatroomId2', name:'ChatroomName2'}]).then(val=>{
    // ...
})

let data = await rongCloud.chatroom.create([{id:'ChatroomId1', name:'ChatroomName1'},{id:'ChatroomId2', name:'ChatroomName2'}])
```


## Message

- publishPrivate  发送单聊消息
- publishTemplate  发送单聊模板消息
- PublishSystem  发送系统消息
- publishSystemTemplate  发送系统模板消息
- publishGroup  发送群组消息
- publishDiscussion  发送讨论组消息
- publishChatroom  发送聊天室消息
- broadcast  发送广播消息
- getHistory  消息历史记录下载地址获取 消息历史记录下载地址获取。获取 APP 内指定某天某小时内的所有会话消息记录的下载地址
- deleteMessage  消息历史记录删除


## Group

- create  创建群组
- sync  同步用户所属群组
- refresh  刷新群组信息
- join  将用户加入指定群组，用户将可以收到该群的消息，同一用户最多可加入 500 个群，每个群最大至 3000 人
- queryUser  查询群成员
- quit  退出群组
- addGagUser  添加禁言群成员
- getGagUserList  查询被禁言群成员
- rollBackGagUser  移除禁言群成员
- dismiss  解散群组。

## Sensitiveword (old version: Wordfilter)

- add  添加敏感词
- remove  移除敏感词
- batchRemove  批量移除敏感词方法
- getList  查询敏感词列表
