---
layout:     post
title:      "focus()和focusin()"
date:       2018-04-22 23:07:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Jquery
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/jquery/event_focus.asp)

### focus()方法

```
$("input").focus(function(){
  $("input").css("background-color","#FFFFCC");
});
```

当元素获得焦点时，发生 focus 事件。**(只对当前元素有效)**

当通过鼠标点击选中元素或通过 tab 键定位到元素时，该元素就会获得焦点。

focus() 方法触发 focus 事件，或规定当发生 focus 事件时运行的函数。


### focusin() 方法

当元素（或在其内的任意元素）获得焦点时发生 focusin 事件。

当在元素或在其内的任意元素上发生 focus 事件时，focusin() 方法添加要运行的函数。

**与 focus() 方法不同的是，focusin() 方法在任意子元素获得焦点时也会触发。**




>同理适用于blur()和focusout()





