---
layout:     post
title:      "rc-queue-anim"
date:       2018-03-25 10:41:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - React
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.npmjs.com/package/rc-queue-anim)


Animate React Component in queue, thanks to rc-animate and enter-animation.


Usage
```
import QueueAnim from 'rc-queue-anim';
import React from 'react';
import ReactDom from 'react-dom';
 
ReactDom.render(
  <QueueAnim>
    <div key="1">enter in queue</div>
    <div key="2">enter in queue</div>
    <div key="3">enter in queue</div>
  </QueueAnim>
, mountNode);
```