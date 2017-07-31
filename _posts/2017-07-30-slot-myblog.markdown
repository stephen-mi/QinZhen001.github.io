---
layout:     post
title:      "slot标签"
date:       2017-07-30 22:19:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文
[网页链接]()

Slot是用于组件中的占位符，组件标签是成对存在的，被组件的标签包裹的，会被填入到slot的位置，替代slot。也就是说，slot是为了让组件里的内容可变做出的一个手段。

主要有以下几种slot用法：
方法1：单slot区
```
// 组件A
<template>
    <div>
        <h2>A</h2>
        <slot></slot>
    </div>
</template>

// 调用组件A的部分
<A>
    <span>这是slot的部分</span>
</A>
这个最后会被解析成：

<div>
    <h2>A</h2>
    <span>这是slot的部分</span>
</div>
```

当然，还有另外一个用法：具名slot，主要是针对有多个区域需要填入不同的内容，为了内容错位，给不同的slot加上名字，在组件调用时，填入slot的时候也写上对应的名字，这样，对应的填充块就被写到组件中相同名字的slot处。
```
// 组件A
<template>
    <div>
        <h1>这是标题</h1>
        <slot name="img"></slot>
        <slot name="para"></slot>
    </div>
</template>

// 调用组件A的地方
<A>
    <p slot="para">这是段落</p>
    <img slot="img" />
</A>
最后会被编译成HTML代码：

<div>
    <h1>这是标题</h1>
    <img slot="img" />
    <p slot="para">这是段落</p>
</div>
```

## 后记


