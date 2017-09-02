---
layout:     post
title:      "一些不常用Html标签"
date:       2017-09-01 22:27:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Html
---

> “Yeah It's on. ”


## 正文
[网页链接]()

### fieldset
`<fieldset>` 标签将<strong>表单内容的一部分</strong>打包，生成一组相关表单的字段。
当一组表单元素放到 `<fieldset>` 标签内时，浏览器会以特殊方式来显示它们，它们可能有特殊的边界、3D 效果，或者甚至可创建一个子表单来处理这些元素。
`<fieldset>` 标签没有必需的或唯一的属性

### legend
legend 元素为 fieldset 元素定义标题（caption）。
```
<form>
  <fieldset>
    <legend>health information</legend>
    height: <input type="text" />
    weight: <input type="text" />
  </fieldset>
</form>
```

### label
`<label>` 标签为 input 元素定义标注（标记）。
label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。如果您在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。
`<label>` 标签的 for 属性应当与相关元素的 id 属性相同。

## 后记


 