---
layout:     post
title:      "记一次webpack打包优化"
date:       2018-02-27 15:41:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Other
---

> “Yeah It's on. ”


## 正文

最近，准备将小程序代码从wepy框架迁移到原生框架，所以要将原来基于wepy框架的小程序sdk用原生框架进行重写。

重写的过程中，使用webpack4.0进行打包，扔上npm私服，期间更改了babel配置，**减少了30多kb体积**。


### 原来配置

```javascript
{
  "presets": [
    "env"
  ],
  "plugins": [
    "transform-runtime"
  ]
}
```


打包后体积84kb


![enter description here][1]







### 第一次修改后的配置


```javascript
{
  "presets": [
    "env"
  ],
  "plugins": [
  ]
}
```


打包后体积54kb


![enter description here][2]



但是，这样纸会存在问题的。


**问题是:不支持es6中的对象解构语法**



```javascript
ERROR in ./src/sdk/utils/myUpload.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:\前端项目\native-sdk\src\sdk\utils\myUpload.js: Unexpected token (28:19)




  26 |         },
  27 |         success(suc) {
> 28 |           success({...suc, data: {url: res.data.data.URL, videoId: res.data.data.VideoId}});
     |                    ^
  29 |         },
  30 |         fail(fai) {
  31 |           fail(fai);
```



![enter description here][3]




### 第二次修改后的配置

>这里的配置参考了wepy框架


[https://github.com/Tencent/wepy/blob/2.0.x/package.json](https://github.com/Tencent/wepy/blob/2.0.x/package.json)



```javascript
{
  "presets": [
    [
      "es2015",
      {
        "loose": true
      }
    ],
    "stage-1"
  ],
  "plugins": [
  ]
}
```



打包后体积54kb


![enter description here][4]



**但还是会有错误：generator找不到**

babel 作用只是把ES6 编译成ES5，但有些语法特性是没法直接编译的，必须在运行时动态解析：比如Array.from、字符串和数组新增的方法等。



### 最终配置

```javascript
{
  "presets": [
    [
      "es2015",
      {
        "loose": true
      }
    ],
    "stage-1"
  ],
  "plugins": [
    [
      "transform-runtime",
      {
        "helpers": false,
        "polyfill": false,
        "regenerator": true
      }
    ]
  ]
}
```



打包体积60kb



![enter description here][5]



经过测试可以正常运行在原生小程序es5环境中




这是经过几次折腾后得到最小体积了。。。Orz



  [1]: https://s2.ax1x.com/2019/05/27/VZMFyT.png
  [2]: https://s2.ax1x.com/2019/05/27/VZMEmF.png
  [3]: https://s2.ax1x.com/2019/05/27/VZQ7Kf.png
  [4]: https://s2.ax1x.com/2019/05/27/VZMmk9.png
  [5]: https://s2.ax1x.com/2019/05/28/VmQ08s.png