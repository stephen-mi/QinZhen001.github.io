---
layout:     post
title:      "Vue中的key"
date:       2017-08-31 18:20:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文
[网页链接](https://cn.vuejs.org/v2/api/#key)

## 正文
预期：number | string
key 的特殊属性主要用在 Vue的虚拟DOM算法，在新旧nodes对比时辨识VNodes。如果不使用key，Vue会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用key，它会基于key的变化重新排列元素顺序，并且会移除key不存在的元素。

有相同父元素的子元素必须有独特的key。重复的key会造成渲染错误。

最常见的用例是结合 v-for:
```
<ul>
  <li v-for="item in items" :key="item.id">...</li>
</ul>
```


它也可以用于强制替换元素/组件而不是重复使用它。当你遇到如下场景时它可能会很有用:

* 完整地触发组件的生命周期钩子
* 触发过渡

例如:
```
<transition>
  <span :key="text">{{ text }}</span>
</transition>
```


当 text 发生改变时，`<span>` 会随时被更新，因此会触发过渡。

## 后记


### v-for必须加上key，并避免同时使用v-if

一般我们在两种常见的情况下会倾向于这样做:


为了过滤一个列表中的项目 比如 v-for="user in users" v-if="user.isActive"。在这种情形下，请将 users替换为一个计算属性 (比如activeUsers)，让其返回过滤后的列表


为了避免渲染本应该被隐藏的列表 比如 v-for="user in users" v-if="shouldShowUsers"。这种情形下，请将 v-if 移动至容器元素上 (比如 ul, ol)