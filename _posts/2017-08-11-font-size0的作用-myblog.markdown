---
layout:     post
title:      "font-size:0的作用"
date:       2017-08-11 17:24:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - CSS
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.cnblogs.com/guagnxu/p/6382163.html)
```
html：
<div class="box">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
css：
.box{
  width: 90px;
  height: 60px;
  border: 1px solid #ccc;
}
.box div{
  display: inline-block;
  box-sizing: border-box;
  font-size: 14px;
  width: 30px;
  border: 1px solid ;
}
```
理论上box下面的三个div都是30px，刚好在一行显示，但是实际效果是这样：

![enter description here][1]

这就是上文说到的原因，我们在box下添加font-size:0;再看看效果

![enter description here][2]

可以看到这才是我们想要的结果，因此在实际开发中，为了更好的还原设计稿，在父元素很有必要设置font-size:0，避免莫名其妙的间距。
## 后记


  [1]: http://images2015.cnblogs.com/blog/1098079/201702/1098079-20170209145030213-330247522.png
  [2]: http://images2015.cnblogs.com/blog/1098079/201702/1098079-20170209145334791-2090940407.png