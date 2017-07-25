---
layout:     post
title:      "input标签的 disabled"
date:       2017-07-24 10:44:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - HTML
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/tags/att_input_disabled.asp)

#### 定义和用法
disabled 属性规定应该禁用 input 元素。
被禁用的 input 元素既不可用，也不可点击。可以设置 disabled 属性，直到满足某些其他的条件为止（比如选择了一个复选框等等）。然后，就需要通过 JavaScript 来删除 disabled 值，将 input 元素的值切换为可用。
注释：disabled 属性无法与 <input type="hidden"> 一起使用。


```
<form action="form_action.asp" method="get">
  <p>First name: <input type="text" name="fname" /></p>
  <p>Last name: <input type="text" name="lname" disabled="disabled" /></p>
  <input type="submit" value="Submit" />
</form>
```
#### 移除属性
removeAttribute('disabled');

readonly="readonly"----是只读，不能使用键盘输入
disabled="disabled"----是禁用，input标签灰暗下去
---

## 后记
