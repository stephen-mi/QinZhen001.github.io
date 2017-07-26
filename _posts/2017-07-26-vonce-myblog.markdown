---
layout:     post
title:      "v-once"
date:       2017-07-26 17:51:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文
[网页链接](https://cn.vuejs.org/v2/api/#v-once)


不需要表达式

详细：
只渲染元素和组件一次。随后的重新渲染,元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

```
<!-- 单个元素 -->
<span v-once>This will never change: {{msg}}</span>
<!-- 有子元素 -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- 组件 -->
<my-component v-once :comment="msg"></my-component>
<!-- v-for 指令-->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```

## 后记



