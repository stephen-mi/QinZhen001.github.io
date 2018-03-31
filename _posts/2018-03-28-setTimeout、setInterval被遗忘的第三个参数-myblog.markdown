---
layout:     post
title:      "setTimeout、setInterval被遗忘的第三个参数"
date:       2018-03-28 13:03:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.cnblogs.com/leaf930814/p/6828588.html)


Additional parameters which are passed through to the function specified by func once the timer expires.

**定时器启动时候，第三个以后的参数是作为第一个func()的参数传进去。**



```
    function timeout(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms, 'done')
        })
    }

    timeout(1000).then(val => {
        console.log(val);
    })
```