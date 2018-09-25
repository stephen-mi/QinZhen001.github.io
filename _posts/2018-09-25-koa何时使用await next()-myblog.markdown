---
layout:     post
title:      "koa何时使用await next()"
date:       2018-09-23 23:06:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Node
---

> “Yeah It's on. ”


## 正文
[网页链接](https://blog.csdn.net/u014445339/article/details/79372834)

问题场景还原

```
app.use((context, next) => {
    if (context.request.method === 'OPTIONS') {
        context.response.status = 200
        context.response.set('Access-Control-Allow-Origin', context.request.headers.origin)
        context.response.set('Access-Control-Allow-Headers', 'content-type')
    } else {
        next()
    }
})

app.use(async (context, next) => {
    // 异步操作数据库
    let result = await readdb()
    context.response.status = 200
    context.response.set('Access-Control-Allow-Origin', context.request.headers.origin)
    context.response.set('Access-Control-Allow-Headers', 'content-type')
    context.response.message = '读取成功'
}) 
```


在上述代码中，第一个use的回调对options请求做过滤，第二个use的回调等待读取数据库，然后设置response。



### 问题：

所有除options请求外的请求，返回的都是404。在第二个use的回调中打断点，发现确实执行了，但是返回的却不是设置的200，而是404，很是奇怪。


### 原因：


第二个use的回调是异步函数，而第一个use不是，所以执行next()后，不会等待第二个use的异步操作完成，而直接返回response，从而第二个use回调中异步操作之后的代码没有影响到这个返回的response（此时，response没有设置任何返回信息，koa会默认是404），而在第二个use的异步操作完成之后，后面的代码会执行（打断点能有反应的原因），但此时response已经返回，后面代码虽然改变了response，但是已经不会发送给客户端了。


### 正确玩法


在第一个use回调中添加await next()，等待第二个use回调函数完整执行完毕，再发送response。代码如下。
```
app.use(async (context, next) => {
    if (context.request.method === 'OPTIONS') {
        context.response.status = 200
        context.response.set('Access-Control-Allow-Origin', context.request.headers.origin)
        context.response.set('Access-Control-Allow-Headers', 'content-type')
    } else {
        await next()
    }
})

app.use(async (context, next) => {
    // 异步操作数据库
    let result = await readdb()
    context.response.status = 200
    context.response.set('Access-Control-Allow-Origin', context.request.headers.origin)
    context.response.set('Access-Control-Allow-Headers', 'content-type')
    context.response.message = '读取成功'
}) 
```




