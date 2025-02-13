---
layout:     post
title:      "babel基础相关"
date:       2017-07-28 22:54:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Babel
---

> “Yeah It's on. ”


[写一个babel插件](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-plugin-options)


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





### babel-polyfill
全局垫片
**为应用而准备(业务中使用)，不是为框架准备的**
会污染全局变量

Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。


### babel-runtime-transform

[https://babeljs.io/docs/en/next/babel-plugin-transform-runtime](https://babeljs.io/docs/en/next/babel-plugin-transform-runtime)


局部垫片
**为开发框架而准备**
不会污染全局变量


### babel-runtime 使用场景
Babel 转译后的代码要实现源代码同样的功能需要借助一些帮助函数，例如，{ [name]: 'JavaScript' } 转译后的代码如下所示：
```
'use strict';
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var obj = _defineProperty({}, 'name', 'JavaScript');
```

类似上面的帮助函数 _defineProperty 可能会重复出现在一些模块里，导致编译后的代码体积变大。Babel 为了解决这个问题，提供了单独的包 babel-runtime 供编译模块复用工具函数。

启用插件 babel-plugin-transform-runtime 后，Babel 就会使用 babel-runtime 下的工具函数，转译代码如下：
```
'use strict';
// 之前的 _defineProperty 函数已经作为公共模块 `babel-runtime/helpers/defineProperty` 使用
var _defineProperty2 = require('babel-runtime/helpers/defineProperty');
var _defineProperty3 = _interopRequireDefault(_defineProperty2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var obj = (0, _defineProperty3.default)({}, 'name', 'JavaScript');
```

思考：babel-runtime 为什么适合 JavaScript 库和工具包的实现？

1. 避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积；
2. 在没有使用 babel-runtime 之前，库和工具包一般不会直接引入 polyfill。否则像 Promise 这样的全局对象会污染全局命名空间，这就要求库的使用者自己提供 polyfill。这些 polyfill 一般在库和工具的使用说明中会提到，比如很多库都会有要求提供 es5 的 polyfill。在使用 babel-runtime 后，库和工具只要在 package.json 中增加依赖 babel-runtime，交给 babel-runtime 去引入 polyfill 就行了；



### stage

#### stage-0


它包含stage-1, stage-2以及stage-3的所有功能，同时还另外支持如下两个功能插件：

* transform-do-expressions
* transform-function-bind


#### stage-1
stage-1除了包含stage-2和stage-3，还包含了下面4个插件：


* transform-class-constructor-call (Deprecated)
* transform-class-properties
* transform-decorators – disabled pending proposal update
* transform-export-extensions



#### stage-2

stage-2它除了覆盖stage-3的所有功能，还支持如下两个插件：

* syntax-trailing-function-commas
* transform-object-reset-spread


#### stage-3
它支持大名鼎鼎的async和await


总的来说，它包含如下两个插件:

* transform-async-to-generator
* transform-exponentiation-operator



### 插件顺序


[https://www.babeljs.cn/docs/plugins#%E6%8F%92%E4%BB%B6%E9%A1%BA%E5%BA%8F](https://www.babeljs.cn/docs/plugins#%E6%8F%92%E4%BB%B6%E9%A1%BA%E5%BA%8F)


这意味着如果两个转换插件都将处理“程序（Program）”的某个代码片段，则将根据转换插件或 preset 的排列顺序依次执行。


* **插件在 Presets 前运行。**
* **插件顺序从前往后排列。**
* **Preset 顺序是颠倒的（从后往前）。**


例如：

```
{
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```


先执行 transform-decorators-legacy ，在执行 transform-class-properties。


**重要的时，preset 的顺序是 颠倒的。如下设置：**



```
{
  "presets": ["es2015", "react", "stage-2"]
}
```


将按如下顺序执行：stage-2、react 然后是 es2015。



>这主要的是为了确保向后兼容，因为大多数用户将 "es2015" 排在 "stage-0" 之前。






## 总结
* 具体项目还是需要使用 babel-polyfill，只使用 babel-runtime 的话，实例方法不能正常工作（例如 "foobar".includes("foo")）；
* JavaScript 库和工具可以使用 babel-runtime，在实际项目中使用这些库和工具，需要该项目本身提供 polyfill；





## 补充
因为babel编译es6到es5的过程中，babel-plugin-transform-runtime这个插件会自动polyfill es5不支持的特性，这些polyfill包就是在babel-runtime这个包里，**所以babel-runtime需要安装在dependency而不是devDependency**。

babel-plugin-transform-runtime和babel-runtime
字面意思就能看出来，一个是转化的包（插件），一个是充满polyfill的包。


### Generator

[https://www.jianshu.com/p/92639e681e2a](https://www.jianshu.com/p/92639e681e2a)

Generator 的中文名称是生成器，它是ECMAScript6中提供的新特性。在过去，封装一段运算逻辑的单元是函数。函数只存在“没有被调用”或者“被调用”的情况，不存在一个函数被执行之后还能暂停的情况，而Generator的出现让这种情况成为可能。


通过function*来定义的函数称之为“生成器函数”（generator function），它的特点是可以中断函数的执行，每次执行yield语句之后，函数即暂停执行，直到调用返回的生成器对象的next()函数它才会继续执行。


也就是说Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数返回一个遍历器对象（一个指向内部状态的指针对象），调用遍历器对象的next方法，使得指针移向下一个状态。每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。

作者：黎贝卡beka
链接：https://www.jianshu.com/p/92639e681e2a
来源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。






