---
layout:     post
title:      "ESLint(no-new)"
date:       2017-07-27 23:17:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - ESLint
---

> “Yeah It's on. ”


## 正文
[网页链接](http://eslint.org/docs/rules/no-new)

The goal of using new with a constructor is typically to create an object of a particular type and store that object in a variable, such as:

var person = new Person();

It’s less common to use new and not store the result, such as:

new Person();

In this case, the created object is thrown away because its reference isn’t stored anywhere, and in many cases, this means that the constructor should be replaced with a function that doesn’t require new to be used.
Rule Details

This rule is aimed at maintaining consistency and convention by disallowing constructor calls using the new keyword that do not assign the resulting object to a variable.

Examples of incorrect code for this rule:
```
/*eslint no-new: "error"*/
new Thing();
```
Examples of correct code for this rule:
```
/*eslint no-new: "error"*/
var thing = new Thing();
Thing();
```



## 后记
存在ESLint
.js中new后一定要赋值给某个变量
避免这种情况，单独加一条规则：
/* eslint-disable no-new */

```
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
```

