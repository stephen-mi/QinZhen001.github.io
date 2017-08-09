---
layout:     post
title:      "import"
date:       2017-08-06 23:43:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - ES6
---

> “Yeah It's on. ”


## 正文
[网页链接](http://es6.ruanyifeng.com/?search=import&x=0&y=0#docs/module#import-)

```
// 第一组
export default function crc32() { // 输出
  // ...
}
import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};
import {crc32} from 'crc32'; // 输入
```
上面代码的两组写法，
* 第一组是使用export default时，对应的import语句不需要使用大括号；
* 第二组是不使用export default时，对应的import语句需要使用大括号。

export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能对应一个方法。

## 后记
