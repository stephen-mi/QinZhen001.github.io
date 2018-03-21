---
layout:     post
title:      "babel-polyfill和babel-runtime"
date:       2017-07-28 22:54:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Webpack
---

> “Yeah It's on. ”


## 正文
[网页链接]()


### babel-polyfill
全局垫片
**为应用而准备(业务中使用)，不是为框架准备的**
会污染全局变量

Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。


### babel-runtime-transform
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

## 总结
* 具体项目还是需要使用 babel-polyfill，只使用 babel-runtime 的话，实例方法不能正常工作（例如 "foobar".includes("foo")）；
* JavaScript 库和工具可以使用 babel-runtime，在实际项目中使用这些库和工具，需要该项目本身提供 polyfill；





## 补充
因为babel编译es6到es5的过程中，babel-plugin-transform-runtime这个插件会自动polyfill es5不支持的特性，这些polyfill包就是在babel-runtime这个包里，所以babel-runtime需要安装在dependency而不是devDependency。

babel-plugin-transform-runtime和babel-runtime
字面意思就能看出来，一个是转化的包（插件），一个是充满polyfill的包。







