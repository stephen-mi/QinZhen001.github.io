---
layout:     post
title:      "token详解"
date:       2017-05-23 21:58:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 后端
---

> “Yeah It's on. ”


## 正文
[网页链接](https://blog.csdn.net/xunfeng13/article/details/52371562/)


 在Web领域基于Token的身份验证随处可见。在大多数使用Web API的互联网公司中，tokens 是多用户下处理认证的最佳方式。

以下几点特性会让你在程序中使用基于Token的身份验证
1. 无状态、可扩展
2. 支持移动设备
3. 跨程序调用
4. 安全


### 基于Token的验证原理
 基于Token的身份验证是无状态的，我们不将用户信息存在服务器或Session中。

这种概念解决了在服务端存储信息时的许多问题

　　NoSession意味着你的程序可以根据需要去增减机器，而不用去担心用户是否登录。
　　
　　
基于Token的身份验证的过程如下:　　
1. 用户通过用户名和密码发送请求。
2. 程序验证。
3. 程序返回一个签名的token 给客户端。
4. 客户端储存token,并且每次用于每次发送请求。
5. 服务端验证token并返回数据。　　
　　
每一次请求都需要token。token应该在HTTP的头部发送从而保证了Http请求无状态。　　
　　
　　
### Tokens的优势　　
无状态、可扩展　　
　　
　　
　　
　　
　　
　　
　　
　　
　　
　　