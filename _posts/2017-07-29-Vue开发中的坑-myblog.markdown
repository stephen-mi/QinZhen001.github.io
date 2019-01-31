---
layout:     post
title:      "Vue开发中的坑"
date:       2017-07-29 10:56:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文
[网页链接]()

### Error:Cannot find module 'stylus'
在webpack 里面用了 stylus-loader，但npm instatll 没有正确安装，出现error： Cannot find module ‘stylus’。

解决办法： 
重新npm install stylus 和 stylus-loader

npm install stylus –save-dev 
npm install stylus-loader –save-dev

或:
npm install stylus-loader css-loader style-loader --save-dev


<strong>非要单独再装一次才好！</strong>



### 事件及时销毁

Vue组件销毁时，会自动清理它与其它实例的连接，解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。


也就是说，在js内使用addEventListener等方式是不会自动销毁的，我们需要在组件销毁时手动移除这些事件的监听，以免造成内存泄露，如：

```javascript
created() {
  addEventListener('touchmove', this.touchmove, false)
},
beforeDestroy() {
  removeEventListener('touchmove', this.touchmove, false)
}
```
