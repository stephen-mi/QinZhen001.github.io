---
layout:     post
title:      "offsetWidth的一个bug"
date:       2018-05-12 16:40:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.cnblogs.com/huaci/p/3863797.html)


### offsetWidth复制

**offsetWidth实际获取的是盒模型(width+border + padding)**

示例：让div变窄
```  
<style>
    #div1 {
      width: 200px;
      height: 200px;
      background: red;
      border: 1px solid black;
    }
  </style>

<body>
<div id="div1"></div>
</body>

<script>
    setInterval(function () {
        var oDiv = document.getElementById('div1');

        oDiv.style.width = oDiv.offsetWidth - 1 + 'px';
    }, 30);
</script>
```

运行上面示例后，你会发现一个奇怪的现象:

div在变宽

那么这个问题，怎么解决呢？

 

解决方式：

**用oDiv.style.width = parseInt(oDiv.style.width) - 1 + "px";**


知识点：
**IE写法：currentStyle
非IE写法: getComputedStyle**

```
    function getStyle(obj, name) {
        if (obj.currentStyle) {
            return obj.currentStyle[name];
        }
        else {
            return getComputedStyle(obj)[name];
        }
    }

    setInterval(function () {
        var oDiv = document.getElementById('div1');

        oDiv.style.width = parseInt(getStyle(oDiv, 'width')) - 1 + 'px';
    }, 30);
```

### event中的offsetX 会触发到子元素中

应该怎么解决？


#### 解决方案1
在事件捕获阶段处理，阻止冒泡。
e.stopPropagation();
e.preventDefault();



#### 解决方案2
判断元素 e.target === 父元素 时候获取


#### **解决方案3(最好)**
不使用offsetX

用event.pageX - xxx.getBoundingClientRect().left

在jquery中可以用event.pageX - xxx.offset().left









