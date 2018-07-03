---
layout:     post
title:      "relative定位"
date:       2017-08-26 21:24:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](http://blog.csdn.net/chen_zw/article/details/8741365)




relative定位，又称为相对定位，从字面上来解析，我们就可以看出该属性的主要特性：相对。但是它相对的又是相对于什么地方而言的呢？这个是个重点



1. 每个元素在页面的普通流中会“占有”一个位置，这个位置可以理解为默认值，而相对定位就是将元素偏离元素的默认位置，但普通流中依然保持着原有的默认位置。**（在父级节点的content-box区定位，父级节点有文字的话，元素的默认位置则是紧随文字）**
2. 不会改变行内元素的display属性。
3. 并没有脱离普通流，只是视觉上发生的偏移。






```
/******初始*********/
<style type="text/css">
    #first { width: 200px; height: 100px; border: 1px solid red; }
    #second{ width: 200px; height: 100px; border: 1px solid blue;}
</style>
<body>
   <div id="first"> first</div>
   <div id="second">second</div>
</body>
```

![enter description here][1]


我们修改first元素的position属性：
```
<style type="text/css">
    #first{ width: 200px; height: 100px; border: 1px solid red; position: relative; top: 20px; left: 20px;} /*add position*/
    #second{width: 200px; height: 100px; border: 1px solid blue;}
</style>
```

![enter description here][2]

**相对定位相对的是它原本在文档流中的位置而进行的偏移**，而我们也知道relative定位也是遵循正常的文档流，它没有脱离文档流，但是它的top/left/right/bottom属性是生效的，可以说它是static到absoult的一个中间过渡属性，最重要的是它还占有文档空间，而且占据的文档空间不会随 top / right /
 left / bottom等属性的偏移而发生变动，也就是说它后面的元素是依据虚线位置( top / left / right / bottom 等属性生效之前)进行的定位


----------









 


  [1]: http://img.my.csdn.net/uploads/201303/30/1364654152_2841.png
  [2]: http://img.my.csdn.net/uploads/201303/30/1364654357_9392.png