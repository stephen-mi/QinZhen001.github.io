---
layout:     post
title:      "Transitions, Transforms和Animation"
date:       2017-10-12 20:03:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
 
[网页链接](http://www.zhangxinxu.com/wordpress/2010/11/css3-transitions-transforms-animation-introduction/)

transition, transform, animation；我分别理解为过渡，变换，动画

### transition

指过渡，就是从a点都b点，就像过江坐渡轮，是有时间的，是连续的，一般针对常规CSS属性。**平滑的改变CSS的值**

* transition-property :* //指定过渡的性质，比如transition-property:backgrond 就是指backgound参与这个过渡
* transition-duration:*//指定这个过渡的持续时间
* transition-delay:* //延迟过渡时间
* transition-timing-function:*//指定过渡类型，有ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier

### transform

指变换 (拉伸，压缩，旋转，偏移)

transform属性要是加上transition的过渡特性，那可就是如虎添翼

```
.trans_effect {
    -webkit-transition:all 2s ease-in-out;
    -moz-transition:all 2s ease-in-out;
    -o-transition:all 2s ease-in-out;
    -ms-transition:all 2s ease-in-out;    
    transition:all 2s ease-in-out;
}
.trans_effect:hover {
    -webkit-transform:rotate(720deg) scale(2,2);
    -moz-transform:rotate(720deg) scale(2,2);
    -o-transform:rotate(720deg) scale(2,2);
    -ms-transform:rotate(720deg) scale(2,2);
    transform:rotate(720deg) scale(2,2);        
}
```


### animations

```
@-webkit-keyframes resize {
    0% {
        padding: 0;
    }
    50% {
        padding: 0 20px;
        background-color:rgba(190, 206, 235, 0.2);        
    }
    100% {
        padding: 0 100px;
        background-color:rgba(190, 206, 235, 0.9);
    }
}
.anim_box:hover {
    -webkit-animation-name: resize;
    -webkit-animation-duration: 1.5s;
    -webkit-animation-iteration-count: 4;
    -webkit-animation-direction: alternate;
    -webkit-animation-timing-function: ease-in-out;
}
```

nimation-iteration-count:infinite;这个属性之后能够无限循环

[demo链接](http://www.zhangxinxu.com/study/201011/css3-transition-animate-demo-7.html)



