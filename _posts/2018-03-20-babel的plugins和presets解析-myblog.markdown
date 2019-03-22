---
layout:     post
title:      "babel的plugins和presets解析"
date:       2018-03-20 18:36:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Webpack
---

> “Yeah It's on. ”


## 正文
[网页链接](https://segmentfault.com/p/1210000008466178)



babel可以将当前运行平台(浏览器、node服务器)尚不支持的下一代或几代js语法编译为当前支持的js语法版本，比如可以把es6 es7和es8的js代码编译为es5的代码。



* **plugin: babel的插件，在6.x版本之后babel必需要配合插件来进行工作**
* **preset: babel插件集合的预设，包含某一部分的插件plugin**



```json
{
  "plugins": ["transform-es2015-arrow-functions"]，
  "presets": ["es2015"]
}
```











### babel-preset-env


babel-preset-env 是一个新的 preset，可以根据配置的目标运行环境（environment）自动启用需要的 babel 插件。

目前我们写 javascript 代码时，需要使用 N 个 preset，比如：babel-preset-es2015、babel-preset-es2016。es2015 可以把 ES6 代码编译为 ES5，es2016 可以把 ES2016 代码编译为 ES6。babel-preset-latest 可以编译 stage 4 进度的 ECMAScript 代码。

问题是我们几乎每个项目中都使用了非常多的 preset，包括不必要的。例如很多浏览器支持 ES6 的 generator，如果我们使用 babel-preset-es2015 的话，generator 函数就会被编译成 ES5 代码。

babel-preset-env 的工作方式类似 babel-preset-latest，唯一不同的就是 babel-preset-env 会根据配置的 env 只编译那些还不支持的特性。

使用这个插件，你讲再也不需要使用 es20xx presets 了。

配置语法和 Autoprefixer 一样......


```
"babel": {
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["last 2 versions", "ie >= 7"]
        }
      }
    ]
  ]
},
```



### babel-plugin-transform-runtime

外部引用辅助函数和内置函数，自动填充代码而不会污染全局变量。（建议在库/工具中使用此插件）

## 补充

