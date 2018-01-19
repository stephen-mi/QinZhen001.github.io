---
layout:     post
title:      "touch事件中要阻止浏览器的默认行为"
date:       2018-01-20 22:37:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文

为什么touch事件中要阻止浏览器的默认行为？

既然是用 touch 那肯定是在能支持触屏的设备上运行，比如手机，手机上你滑动的时候他本身就有个默认的滚屏，因此如果你要操作操作你个dom元素，用touchmove事件，这其实也是滑动。原本你的效果是要在dom上滑动然后产生相应的效果，这个时候你肯定不希望手机上的浏览器屏幕滚动，所以你应该把它默认的滚动给禁止了。这样才会有好的用户体验。

```
e.preventDefault();
```

在Vue中:
```
  <div 
       @touchstart.prevent="onTouchStart"
       @touchmove.prevent="onTouchMove"
       @touchend.prevent="onTouchEnd">
  </div>
```  