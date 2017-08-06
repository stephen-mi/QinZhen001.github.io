---
layout:     post
title:      "for of和for in的区别"
date:       2017-08-06 17:02:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](https://segmentfault.com/q/1010000006658882)

简单说，for in是遍历<strong>键名</strong>，for of是遍历<strong>键值</strong>。
例如：
```
let arr = ["a","b"];
for (a in arr) {
    console.log(a);//0,1
}

for (a of arr) {
    console.log(a);//a,b
}
```
由于for of的这个特性，他还可以实现对iterator对象的遍历，而for in就是简单的遍历了。

## 后记
for in是ES5标准,for of是ES6标准

 

