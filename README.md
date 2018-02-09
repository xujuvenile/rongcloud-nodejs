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
- checkOnline  检查ma用户在线状态
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
``