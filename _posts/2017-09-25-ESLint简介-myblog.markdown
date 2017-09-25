---
layout:     post
title:      "ESLint简介"
date:       2017-09-25 11:00:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - ESLint
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.jianshu.com/p/2bcdce1dc8d4)

**ESLint是一个用来识别 ECMAScript 并且按照规则给出报告的代码检测工具，使用它可以避免低级错误和统一代码的风格。**

ESLint被设计为完全可配置的，主要有两种方式来配置ESLint：

* 在注释中配置：使用JavaScript注释直接把配置嵌入到JS文件中。
* 配置文件：使用下面任一的文件来为全部的目录和它的子目录指定配置信息。


1. javascript：使用.eslintrc.js文件并导出一个包含配置的对象。
2. YAML：.eslintrc.yaml或者.eslintrc.yml
3. JSON：.eslintrc.json，并且此文件允许使用JS形式的注释
4. 废弃的用法：.eslintrc，此文件可以是JSON或者YAML
5. package.json：在package.json文件中创建eslintConfig属性，所有的配置包含在此属性中。


这些文件的优先级则是按照以上出现的顺序（.eslintrc.js > .eslintrc.yaml > .eslintrc.yml > .eslintrc.json > .eslintrc > package.json）。


----------

可以被配置的信息主要分为3类：

* Environments：你的javascript脚步将要运行在什么环境（如：nodejs，browser，commonjs等）中。
* Globals：执行代码时脚步需要访问的额外全局变量。
* Rules：开启某些规则，也可以设置规则的等级。

### 指定全局变量
可以在配置文件或注释中指定额外的全局变量，false表明变量只读：
#### 注释
```
/* global var1, var2 */
/* global var1:false, var2:false */
```

#### js 文件
```
// .eslintrc.js
module.exports = {
  globals: {
    var1: true,
    var2: true,
  },
};
```

### 规则

在配置文件中可以设置一些规则。

这些规则的等级有三种：

* "off" 或者 0：关闭规则。
* "warn" 或者 1：打开规则，并且作为一个警告（不影响exit code）。
* "error" 或者 2：打开规则，并且作为一个错误（exit code将会是1）。


作者：给我一炷香的时间
链接：http://www.jianshu.com/p/2bcdce1dc8d4
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
