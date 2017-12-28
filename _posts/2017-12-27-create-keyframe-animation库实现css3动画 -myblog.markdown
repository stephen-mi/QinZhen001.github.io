---
layout:     post
title:      "create-keyframe-animation库实现css3动画 "
date:       2017-12-27 19:14:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文


[网页链接](http://blog.csdn.net/sunhangye/article/details/78731621)


>使用JavaScript在浏览器中动态生成CSS关键帧动画。

[github地址](https://github.com/HenrikJoreteg/create-keyframe-animation)


在项目中npm下载


```
// 引用
var animations = require('create-keyframe-animation')
```

这里配合vue transition js钩子函数 enter after-enter


```
enter(el, done) {
    // 设置动画帧数
    let animation = {
            0: {
              transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
            },
            60: {
              transform: 'translate3d(0, 0, 0) scale(1.2)'
            },
            100: {
              transform: 'translate3d(0, 0, 0) scale(1)'
            }
          }

    // 注册动画
    animations.registerAnimation({
      name: 'move',
      // 插入自定义的动画
      animation,
      // 参数配置
      presets: {
        duration: 1000, // 持续时间
        easing: 'linear', // 过度效果
        delay: 500 // 延迟时间
        terations: 1, // 实现动画的次数
    　　　delay: 0, // 延迟 
    　　　direction: ‘normal‘, // 方向
    　　　resetWhenDone: false, // if true ：将最后动画状态应用为“变换”属性
    　　　　clearTransformsBeforeStart: false // 是否在动画开始之前清除现有的转换
      }
    })

    animations.runAnimation(el, 'move', function () {
        // callback gets called when its done
    })
},
afterEnter() {
    // 取消动画
   animations.unregisterAnimation('move')
    this.$refs.cdWrapper.style.animation = ''
    }
```