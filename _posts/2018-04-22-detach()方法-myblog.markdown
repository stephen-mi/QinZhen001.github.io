---
layout:     post
title:      "detach()方法"
date:       2018-04-22 22:50:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Jquery
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/jquery/manipulation_detach.asp)

```
$("button").click(function(){
  $("p").detach();
});
```



detach() 方法移除被选元素，包括所有文本和子节点。

这个方法会保留 jQuery 对象中的匹配的元素，因而可以在将来再使用这些匹配的元素。

**detach() 会保留所有绑定的事件、附加的数据，这一点与 remove() 不同。**


```
<html>
<head>
<script type="text/javascript" src="/jquery/jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  var x;
  $("#btn1").click(function(){
    x=$("p").detach();
  });
  $("#btn2").click(function(){
    $("body").prepend(x);
  });
});
</script>
</head>
<body>
<p>这是一个段落。</p>
<button id="btn1">删除 p 元素</button>
<button id="btn2">恢复 p 元素</button>
</body>
</html>
```










