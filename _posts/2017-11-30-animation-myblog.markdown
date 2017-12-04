---
layout:     post
title:      "animation"
date:       2017-11-30 19:49:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文


[网页链接](http://www.w3school.com.cn/cssref/pr_animation.asp)

animation 属性是一个简写属性，用于设置六个动画属性：
    animation-name
    animation-duration
    animation-timing-function
    animation-delay
    animation-iteration-count
    animation-direction



>animation: doUpDown .5s ease-in-out infinite alternate both


### animation-direction 属性
animation-direction 属性定义是否应该轮流反向播放动画。

如果 animation-direction 值是 "alternate"，则动画会在奇数次数（1、3、5 等等）正常播放，而在偶数次数（2、4、6 等等）向后播放。

animation-direction: normal | alternate;
* normal 	默认值。动画应该正常播放。 	测试
* alternate 	动画应该轮流反向播放。

### animation-fill-mode
animation-fill-mode : none | forwards | backwards | both;

* none 	不改变默认行为。
* forwards 	当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。
* backwards 	在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。
* both 	向前和向后填充模式都被应用。



动画按执行时间来划分，它分为三个过程，或者说一次动画过程可以将元素划分为三个状态：动画等待、动画进行和动画结束。默认情况之下，只有在动画进行状态，才会应用@keyframes所声明的动画；而在动画等待和动画结束状态，对元素样式并不会产生任何的影响。

### 解释animation-fill-mode的每个值

取值为none时，使用得动画不会对动画等待和动画完成的元素样式产生改变。












著作权归作者所有。
商业转载请联系作者获得授权,非商业转载请注明出处。
原文: https://www.w3cplus.com/css3/understanding-css-animation-fill-mode-property.html © w3cplus.com
